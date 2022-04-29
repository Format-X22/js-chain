import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoFile, TFileNameResponse } from './file.dto';
import { FileService } from './file.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('File api')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/')
    async create(@Body() body: DtoFile): Promise<TFileNameResponse> {
        return await this.fileService.create(body.siteName, body.data);
    }

    @Get('/:name')
    async read(@Param('name') name: string): Promise<DtoFile> {
        return await this.fileService.read(name);
    }

    @Patch('/:name')
    async update(@Param('name') name: string, @Body() body: DtoFile): Promise<TOkResult> {
        await this.fileService.update(name, body.data);

        return OkResult;
    }

    @Delete('/:name')
    async delete(@Param('name') name: string): Promise<TOkResult> {
        await this.fileService.delete(name);

        return OkResult;
    }
}
