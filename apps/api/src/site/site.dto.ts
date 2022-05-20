import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { SiteModel } from '@app/shared/storage/models/site.model';

export type TSiteName = SiteModel['siteName'];

export class SiteIdParam {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    siteName: string;
}

export class SiteCreateDto {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    siteName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(2 ** 30)
    html: string;
}

export class SiteUpdateDto {
    @ApiProperty()
    @IsString()
    @MaxLength(2 ** 30)
    html: string;
}

export class SiteModelDto {
    @ApiProperty()
    owner: string;

    @ApiProperty()
    siteName: string;

    @ApiProperty()
    html: string;
}
