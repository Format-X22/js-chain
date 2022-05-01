import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OkResult, TOkResult } from '../api.dto';
import { SiteService } from './site.service';
import { SiteModel } from '@app/shared/storage/models/site.model';

@ApiTags('Site api')
@Controller('')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get('/site/:siteName')
    async get(@Param('siteName') siteName: string): Promise<SiteModel['html']> {
        return this.siteService.get(siteName);
    }

    @Post('/manage/site')
    async create(@Body() body: SiteModel): Promise<TOkResult> {
        this.checkSiteData(body);

        await this.siteService.create(body);

        return OkResult;
    }

    @Get('/manage/site')
    async read(@Query('siteName') siteName: string): Promise<SiteModel> {
        return await this.siteService.read(siteName);
    }

    @Patch('/manage/site')
    async update(@Body() body: SiteModel): Promise<TOkResult> {
        this.checkSiteData(body);
        await this.siteService.update(body);

        return OkResult;
    }

    @Delete('/manage/site')
    async delete(@Query('siteName') siteName: string): Promise<TOkResult> {
        await this.siteService.delete(siteName);

        return OkResult;
    }

    private checkSiteData(body: SiteModel): void {
        const bundle = body.html;
        const isNamespaceOnly = body.isNamespaceOnly;

        if ((!bundle && !isNamespaceOnly) || (bundle && isNamespaceOnly)) {
            throw new BadRequestException('Html or isNamespaceOnly required');
        }
    }
}
