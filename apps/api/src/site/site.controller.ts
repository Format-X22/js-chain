import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoNewSite } from './site.dto';

@ApiTags('Site api')
@Controller('site')
export class SiteController {
    @Post('/')
    async postSite(@Body() body: DtoNewSite): Promise<string> {
        // TODO -
        return;
    }

    @Get('/:id')
    async getSite(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Patch('/:id')
    async patchSite(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Delete('/:id')
    async deleteSite(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }
}
