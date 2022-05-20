import { Body, Controller, Delete, Get, Param, Patch, Post, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OkResult, TOkResult } from '../api.dto';
import { SiteService } from './site.service';
import { SiteUpdateDto, SiteModelDto, SiteCreateDto, SiteIdParam } from './site.dto';

@ApiTags('Net sites api')
@Controller('')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Version(VERSION_NEUTRAL)
    @Get(['/site/:siteName', '/-/:siteName', '/site/:siteName/*', '/-/:siteName/*'])
    async get(@Param() { siteName }: SiteIdParam): Promise<string> {
        return this.siteService.get(siteName);
    }

    @Post('/manage/site')
    async create(@Body() body: SiteCreateDto): Promise<TOkResult> {
        await this.siteService.create(body);

        return OkResult;
    }

    @Get('/manage/site/:siteName')
    async read(@Param() { siteName }: SiteIdParam): Promise<SiteModelDto> {
        return await this.siteService.read(siteName);
    }

    @Patch('/manage/site/:siteName')
    async update(@Param() { siteName }: SiteIdParam, @Body() body: SiteUpdateDto): Promise<TOkResult> {
        await this.siteService.update(siteName, body);

        return OkResult;
    }

    @Delete('/manage/site/:siteName')
    async delete(@Param() { siteName }: SiteIdParam): Promise<TOkResult> {
        await this.siteService.delete(siteName);

        return OkResult;
    }
}
