import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoFile, TFileNameResponse } from './file.dto';
import { FileService } from './file.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('File api')
@Controller('/site/:siteName/file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/')
    async create(@Param('siteName') siteName: string, @Body() body: DtoFile): Promise<TFileNameResponse> {
        return await this.fileService.create(body);
    }

    @Get('/:fileName')
    async read(@Param('siteName') siteName: string, @Param('fileName') fileName: string): Promise<DtoFile> {
        return await this.fileService.read(siteName, fileName);
    }

    @Patch('/:fileName')
    async update(
        @Param('siteName') siteName: string,
        @Param('fileName') fileName: string,
        @Body() body: DtoFile,
    ): Promise<TOkResult> {
        await this.fileService.update({ siteName, fileName, ...body });

        return OkResult;
    }

    @Delete('/:fileName')
    async delete(@Param('siteName') siteName: string, @Param('fileName') fileName: string): Promise<TOkResult> {
        await this.fileService.delete(siteName, fileName);

        return OkResult;
    }
}
