import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

@Table({ paranoid: true })
export class FileModel extends Model {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    @PrimaryKey
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
