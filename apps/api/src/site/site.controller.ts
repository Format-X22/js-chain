import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoSite, TSiteIdResponse } from './site.dto';
import { OkResult, TOkResult } from '../api.dto';
import { SiteService } from './site.service';

@ApiTags('Site api')
@Controller('site')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Post('/')
    async create(@Body() body: DtoSite): Promise<TSiteIdResponse> {
        this.checkSiteData(body);

        return await this.siteService.create(body.siteId, body.bundle, body.isNamespaceOnly);
    }

    @Get('/:id')
    async read(@Param('id') id: string): Promise<DtoSite> {
        return await this.siteService.read(id);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body: DtoSite): Promise<TOkResult> {
        this.checkSiteData(body);
        await this.siteService.update(id, body.bundle, body.isNamespaceOnly);

        return OkResult;
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<TOkResult> {
        await this.siteService.delete(id);

        return OkResult;
    }

    private checkSiteData(body: DtoSite): void {
        const bundle = body.bundle;
        const isNamespaceOnly = body.isNamespaceOnly;

        if (!bundle && !isNamespaceOnly) {
            throw new BadRequestException('Bundle or isNamespaceOnly required');
        }
    }
}
