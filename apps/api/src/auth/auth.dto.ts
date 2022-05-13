import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export type TSession = string;
export type TSign = string;
export type TPublicKey = string;
export type TAuthHeaders = {
    'x-auth-session'?: TSession;
    'x-auth-public-key'?: TPublicKey;
    'x-auth-sign'?: TSign;
};

export class AuthRegisterDto {
    @ApiProperty({ type: String })
    @IsEmail()
    @MinLength(6)
    @MaxLength(256)
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;
}

export class AuthChangePasswordDto {
    @ApiProperty({ type: String })
    @IsEmail()
    @MinLength(6)
    @MaxLength(256)
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    oldPassword: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    newPassword: string;
}

export class AuthSignInDto {
    @ApiProperty({ type: String })
    @IsEmail()
    @MinLength(6)
    @MaxLength(256)
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;
}
