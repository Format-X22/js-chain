import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// TODO Optional on/off from .env
@ApiTags('Current node auth api')
@Controller('auth')
export class AuthController {
    @Post('register')
    async register(): Promise<void> {
        // TODO -
    }

    @Post('change-password')
    async changePassword(): Promise<void> {
        // TODO -
    }

    @Post('reset-password')
    async resetPassword(): Promise<void> {
        // TODO -
    }

    @Post('sign-in')
    async signIn(): Promise<void> {
        // TODO -
    }

    @Post('sign-out')
    async signOut(): Promise<void> {
        // TODO -
    }
}
