import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthChangePasswordDto, AuthRegisterDto, AuthSignInDto, TAuthHeaders } from './auth.dto';
import { CheckAuth } from './auth.guard';

// TODO Optional on/off from .env
// TODO Reset password
@ApiTags('Current node auth api')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body: AuthRegisterDto): Promise<void> {
        await this.authService.register(body);
    }

    @Post('change-password')
    async changePassword(@Body() body: AuthChangePasswordDto): Promise<void> {
        await this.authService.changePassword(body);
    }

    @Post('sign-in')
    async signIn(@Body() body: AuthSignInDto): Promise<void> {
        await this.authService.signIn(body);
    }

    @CheckAuth()
    @Post('sign-out')
    async signOut(@Headers() headers: TAuthHeaders): Promise<void> {
        await this.authService.signOut(headers);
    }
}
