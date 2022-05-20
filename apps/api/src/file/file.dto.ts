import { FileModel } from '@app/shared/storage/models/file.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export type TFileName = FileModel['fileName'];

export class FileIdParam {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    siteName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    fileName: string;
}

export class FileCreateDto {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    fileName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(2 ** 30)
    dataString: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    contentType: string;
}

export class FileUpdateDto {
    @ApiProperty()
    @IsString()
    @MaxLength(2 ** 30)
    dataString: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    contentType: string;
}

export class FileModelDto {
    @ApiProperty()
    @IsString()
    @MaxLength(2 ** 30)
    dataString: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    contentType: string;
}
