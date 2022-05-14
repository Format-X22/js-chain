import {
    applyDecorators,
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UseGuards,
} from '@nestjs/common';
import { TAuthHeaders } from './auth.dto';
import { StorageService } from '@app/shared/storage/storage.service';
import { Request } from 'express';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(StorageService) private storageService: StorageService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const headers = context.switchToHttp().getRequest<Request>().headers as TAuthHeaders;
        const session = headers['x-auth-session'];
        const publicKey = headers['x-auth-public-key'];
        const sign = headers['x-auth-sign'];

        if (!session && !sign) {
            throw new BadRequestException('Session or Sign required');
        }

        if (sign) {
            // TODO Check public key
        } else {
            if (session.length > 128) {
                throw new BadRequestException('Invalid session');
            }

            const account = await this.storageService.Account.count({ where: { session } });

            if (!account) {
                throw new ForbiddenException('Session not found');
            }
        }

        return true;
    }
}

export function CheckAuth() {
    return applyDecorators(
        ApiSecurity('x-auth-session'),
        ApiHeader({
            name: 'x-auth-session',
            description: 'Auth session',
        }),
        UseGuards(AuthGuard),
    );
}
