import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import {
    AuthChangePasswordDto,
    AuthRegisterDto,
    AuthRegisterResponseDto,
    AuthSignInDto,
    AuthSignInResponseDto,
    TAuthHeaders,
} from './auth.dto';
import { StorageService } from '@app/shared/storage/storage.service';
import { AccountModel } from '@app/shared/storage/models/account.model';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import * as bcrypt from 'bcryptjs';
import { createCipheriv, randomFillSync, scryptSync } from 'crypto';
import { ConfigService } from '@nestjs/config';

const ECPair = ECPairFactory(ecc);

@Injectable()
export class AuthService {
    private readonly AccountModel: typeof AccountModel;
    private readonly authSecret: string;

    constructor(private configService: ConfigService, private storageService: StorageService) {
        this.AccountModel = this.storageService.Account;
        this.authSecret = this.configService.get('JS_AUTH_SECRET');
    }

    async register(body: AuthRegisterDto): Promise<AuthRegisterResponseDto> {
        const keyPair = ECPair.makeRandom();
        const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        const address = p2pkh.address;
        const publicKeyHex = keyPair.publicKey.toString('hex');
        const privateKeyHex = keyPair.privateKey.toString('hex');
        const passwordHash = bcrypt.hashSync(body.password, 10);
        const session = this.makeSession();
        const scryptKey = scryptSync(this.authSecret, 'f01677', 24);
        const scryptInitialVector = randomFillSync(new Uint8Array(16));
        const cipher = createCipheriv('aes-192-cbc', scryptKey, scryptInitialVector);
        let protectedPrivateKey = cipher.update(privateKeyHex, 'hex', 'hex');

        protectedPrivateKey += cipher.final('hex');

        await AccountModel.create({
            address,
            balance: 0,
            isPublicDelegate: false,
            delegateBalance: 0,
            email: body.email,
            passwordHash,
            protectedPrivateKey,
            session,
        });

        return {
            session,
            address,
            publicKeyHex,
            privateKeyHex,
        };
    }

    async changePassword(body: AuthChangePasswordDto): Promise<void> {
        const account = await this.getAccountForTrust({ email: body.email });
        const allOk = bcrypt.compareSync(body.oldPassword, account.passwordHash);

        if (!allOk) {
            throw new ForbiddenException('Invalid old password');
        }

        account.passwordHash = bcrypt.hashSync(body.newPassword, 10);

        await account.save();
    }

    async signIn(body: AuthSignInDto): Promise<AuthSignInResponseDto> {
        const account = await this.getAccountForTrust({ email: body.email });
        const allOk = bcrypt.compareSync(body.password, account.passwordHash);

        if (!allOk) {
            throw new ForbiddenException('Invalid password');
        }

        account.session = this.makeSession();

        await account.save();

        return { session: account.session };
    }

    async signOut(headers: TAuthHeaders): Promise<void> {
        const session = String(headers['x-auth-session']);
        const account = await this.getAccountForTrust({ session });

        account.session = '';

        await account.save();
    }

    private async getAccountForTrust(query): Promise<AccountModel> {
        const account = await this.AccountModel.findOne({ where: query });

        if (!account) {
            throw new NotFoundException('Unknown account');
        }

        if (!account.protectedPrivateKey) {
            throw new ForbiddenException('Account not in trust mode');
        }

        return account;
    }

    private makeSession(): string {
        const sessionNums = Array.from(randomFillSync(new Uint8Array(8)));

        return sessionNums.map((v) => v.toString(16)).join('');
    }
}
