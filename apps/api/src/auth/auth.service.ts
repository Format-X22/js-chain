import { Injectable } from '@nestjs/common';
import { AuthChangePasswordDto, AuthRegisterDto, AuthSignInDto, TAuthHeaders } from './auth.dto';

@Injectable()
export class AuthService {
    async register(body: AuthRegisterDto): Promise<void> {
        // TODO -
    }

    async changePassword(body: AuthChangePasswordDto): Promise<void> {
        // TODO -
    }

    async signIn(body: AuthSignInDto): Promise<void> {
        // TODO -
    }

    async signOut(headers: TAuthHeaders): Promise<void> {
        // TODO -
    }
}
