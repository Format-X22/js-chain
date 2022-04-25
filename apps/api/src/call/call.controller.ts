import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Call api')
@Controller('call')
export class CallController {
    @Get('/:siteId')
    async getSite(@Param('siteId') siteId: string): Promise<void> {
        // TODO -
    }

    @Get('/:siteId/file/:fileId')
    async getFile(@Param('siteId') siteId: string, @Param('fileId') fileId: string): Promise<void> {
        // TODO -
    }

    @Get('/:siteId/api-docs')
    async getApiDocs(@Param('siteId') siteId: string): Promise<void> {
        // TODO -
    }

    @Get('/:siteId/api/:scriptId')
    async callApiWithGet(@Param('siteId') siteId: string, @Param('scriptId') scriptId: string): Promise<void> {
        // TODO -
    }

    @Post('/:siteId/api/:scriptId')
    async callApiWithPost(@Param('siteId') siteId: string, @Param('scriptId') scriptId: string): Promise<void> {
        // TODO -
    }

    @Put('/:siteId/api/:scriptId')
    async callApiWithPut(@Param('siteId') siteId: string, @Param('scriptId') scriptId: string): Promise<void> {
        // TODO -
    }

    @Patch('/:siteId/api/:scriptId')
    async callApiWithPatch(@Param('siteId') siteId: string, @Param('scriptId') scriptId: string): Promise<void> {
        // TODO -
    }

    @Delete('/:siteId/api/:scriptId')
    async callApiWithDelete(@Param('siteId') siteId: string, @Param('scriptId') scriptId: string): Promise<void> {
        // TODO -
    }
}
