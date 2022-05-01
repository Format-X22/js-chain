import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { OkResult, TOkResult } from '../api.dto';
import { FileModel } from '@app/shared/storage/models/file.model';

@ApiTags('File api')
@Controller('')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get('/file')
    async getBase64(@Query('siteName') siteName: string, @Query('fileName') fileName: string): Promise<string> {
        return await this.fileService.get(siteName, fileName);
    }

    @Post('/manage/file')
    async create(@Query('siteName') siteName: string, @Body() body: FileModel): Promise<TOkResult> {
        await this.fileService.create(body);

        return OkResult;
    }

    @Get('/manage/file')
    async read(@Query('siteName') siteName: string, @Query('fileName') fileName: string): Promise<FileModel> {
        return await this.fileService.read(siteName, fileName);
    }

    @Patch('/manage/file')
    async update(@Body() body: FileModel): Promise<TOkResult> {
        await this.fileService.update(body);

        return OkResult;
    }

    @Delete(' /manage/file')
    async delete(@Query('siteName') siteName: string, @Query('fileName') fileName: string): Promise<TOkResult> {
        await this.fileService.delete(siteName, fileName);

        return OkResult;
    }
}
