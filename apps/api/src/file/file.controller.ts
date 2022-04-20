import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoNewFile } from './file.dto';

@ApiTags('File api')
@Controller('file')
export class FileController {
    @Post('/')
    async postFile(@Body() body: DtoNewFile): Promise<string> {
        // TODO -
        return;
    }

    @Get('/:id')
    async getFile(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Patch('/:id')
    async patchFile(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Delete('/:id')
    async deleteFile(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }
}
