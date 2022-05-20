import { Body, Controller, Delete, Get, Param, Patch, Post, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { OkResult, TOkResult } from '../api.dto';
import { FileCreateDto, FileIdParam, FileModelDto, FileUpdateDto } from './file.dto';
import { SiteIdParam } from '../site/site.dto';
import { Response } from 'express';

@ApiTags('File api')
@Controller('')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get('/file/:siteName/:fileName')
    async getFile(
        @Param() { siteName, fileName }: FileIdParam,
        @Res({ passthrough: true }) res: Response,
    ): Promise<StreamableFile> {
        return await this.fileService.get(siteName, fileName, res);
    }

    @Post('/manage/file/:siteName')
    async create(@Param() { siteName }: SiteIdParam, @Body() body: FileCreateDto): Promise<TOkResult> {
        await this.fileService.create(siteName, body);

        return OkResult;
    }

    @Get('/manage/file/:siteName/:fileName')
    async read(@Param() { siteName, fileName }: FileIdParam): Promise<FileModelDto> {
        return await this.fileService.read(siteName, fileName);
    }

    @Patch('/manage/file/:siteName/:fileName')
    async update(@Param() { siteName, fileName }: FileIdParam, @Body() body: FileUpdateDto): Promise<TOkResult> {
        await this.fileService.update(siteName, fileName, body);

        return OkResult;
    }

    @Delete(' /manage/file/:siteName/:fileName')
    async delete(@Param() { siteName, fileName }: FileIdParam): Promise<TOkResult> {
        await this.fileService.delete(siteName, fileName);

        return OkResult;
    }
}
