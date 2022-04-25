import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoFile, DtoFileWithMetadata, DtoNewFile, TFileId, TFileIdResponse } from './file.dto';
import { FileService } from './file.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('File api')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/')
    async create(@Body() body: DtoNewFile): Promise<TFileIdResponse> {
        return await this.fileService.create(body.siteId, body.data);
    }

    @Get('/:id')
    async read(@Param('id') id: string): Promise<DtoFileWithMetadata> {
        return await this.fileService.read(id);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body: DtoFile): Promise<TOkResult> {
        await this.fileService.update(id, body.data);

        return OkResult;
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<TOkResult> {
        await this.fileService.delete(id);

        return OkResult;
    }
}
