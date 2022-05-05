import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Version,
    VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { OkResult, TOkResult } from '../api.dto';
import { SiteService } from './site.service';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { Request } from 'express';

@ApiTags('Site api')
@Controller('')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Version(VERSION_NEUTRAL)
    @Get('/site/:siteName')
    async get(@Param('siteName') siteName: string): Promise<SiteModel['html']> {
        return this.siteService.get(siteName);
    }

    @Get('/site-api')
    async getSiteApiHint(@Query('siteName') siteName: string, @Req() req: Request): Promise<string> {
        const referrer = req.get('referrer');
        const swaggerEndpoint = `/${siteName}/swagger.json`;
        const swaggerConfigPath = referrer.replace('/api-docs/', '') + req.path + swaggerEndpoint;

        return `Open in browser - ${referrer}?url=${swaggerConfigPath}`;
    }

    @ApiExcludeEndpoint()
    @Get('/site-api/:siteName/swagger.json')
    async getSiteApiSwaggerJson(@Param('siteName') siteName: string): Promise<SiteModel['swaggerConfig']> {
        return await this.siteService.getSwaggerJson(siteName);
    }

    @Get('/site-data')
    async getSiteData(@Query('siteName') siteName: string): Promise<SiteModel['plainData']> {
        return await this.siteService.getPlainData(siteName);
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
