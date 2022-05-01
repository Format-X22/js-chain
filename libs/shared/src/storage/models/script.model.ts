import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

@Table
export class ScriptModel extends Model {
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
    scriptName: string;

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(1024 * 1024)
    @Column(DataType.TEXT)
    simpleJS: string;

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(1024 * 1024)
    @Column(DataType.TEXT)
    simpleTS: string;

    @Column(DataType.TEXT)
    compiledSimpleTS: string;

    @Column(DataType.JSONB)
    data: Record<string, any>;
}
