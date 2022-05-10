import { Column, DataType, Model, PrimaryKey, Table, Default } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export enum EScriptMethods {
    GET = 'GET',
    POST = 'POST',
    PATH = 'PATH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

class SwaggerQuery {
    @ApiProperty()
    @IsString()
    @MaxLength(64)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(1024)
    description: string;

    @ApiPropertyOptional({ default: false })
    @IsBoolean()
    required: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ each: true })
    enum: Array<string>;
}

@Table({ paranoid: true })
export class ScriptModel extends Model {
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
    scriptName: string;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    @Default(false)
    @Column(DataType.BOOLEAN)
    isUpdatable: boolean;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeletable: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(1024 * 1024)
    @Column(DataType.TEXT)
    simpleJS: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(1024 * 1024)
    @Column(DataType.TEXT)
    simpleTS: string;

    @Column(DataType.TEXT)
    compiledSimpleTS: string;

    @Column(DataType.JSONB)
    plainData: Record<string, any>;

    @ApiProperty()
    @IsEnum(EScriptMethods)
    @Column(DataType.STRING(8))
    httpMethod: EScriptMethods;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(256)
    swaggerSummary: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(2048)
    swaggerDescription: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(128)
    swaggerTag: string;

    @ApiProperty({ type: [SwaggerQuery] })
    swaggerQueryFields: Array<SwaggerQuery>;
}
