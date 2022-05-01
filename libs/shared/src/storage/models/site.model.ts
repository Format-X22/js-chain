import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table
export class SiteModel extends Model {
    @ApiProperty()
    @IsString()
    @MaxLength(256)
    @PrimaryKey
    @Column(DataType.STRING(256))
    siteName: string;

    @Column(DataType.STRING(256))
    owner: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    @Column(DataType.BOOLEAN)
    isNamespaceOnly: boolean;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Column(DataType.TEXT)
    html: string;
}
