import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

@Table
export class FileModel extends Model {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    @PrimaryKey
    @ForeignKey(() => SiteModel)
    @Column(DataType.STRING(256))
    siteName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    @PrimaryKey
    @Column(DataType.STRING(256))
    fileName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16 * 1024 * 1024)
    @Column(DataType.TEXT)
    dataString: string;
}
