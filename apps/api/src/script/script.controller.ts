import {
    All,
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotAcceptableException,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Version,
    VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ESupportedMethods, ScriptService, TScriptBody, TScriptQuery, TScriptResult } from './script.service';
import { OkResult, TOkResult } from '../api.dto';
import { ScriptModel } from '@app/shared/storage/models/script.model';
import { Request } from 'express';

@ApiTags('Script api')
@Controller('')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

    @ApiExcludeEndpoint()
    @Version(VERSION_NEUTRAL)
    @All('/script/:siteName/:scriptName')
    async callScript(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TScriptQuery,
        @Body() body: TScriptBody,
        @Req() req: Request,
    ): Promise<TScriptResult> {
        const method = String(req.method).toUpperCase() as ESupportedMethods;

        this.checkCallScriptMethod(method);

        return await this.scriptService.callScript({
            siteName,
            scriptName,
            query,
            body,
            method,
        });
    }

    @Get('/script-data')
    async getScriptData(
        @Query('siteName') siteName: string,
        @Query('scriptName') scriptName: string,
    ): Promise<ScriptModel['plainData']> {
        return await this.scriptService.getPlainData(siteName, scriptName);
    }

    @Post('/manage/script')
    async create(@Body() body: ScriptModel): Promise<TOkResult> {
        this.checkScriptBundle(body);

        await this.scriptService.create(body);

        return OkResult;
    }

    @Get('/manage/script')
    async read(@Query('siteName') siteName: string, @Query('scriptName') scriptName: string): Promise<ScriptModel> {
        return await this.scriptService.read(siteName, scriptName);
    }

    @Patch('/manage/script')
    async update(@Body() body: ScriptModel): Promise<TOkResult> {
        await this.scriptService.update(body);

        return OkResult;
    }

    @Delete('/manage/script')
    async delete(@Query('siteName') siteName: string, @Query('scriptName') scriptName: string): Promise<TOkResult> {
        await this.scriptService.delete(siteName, scriptName);

        return OkResult;
    }

    private checkScriptBundle(body: ScriptModel): void {
        const js = body.simpleJS;
        const ts = body.simpleTS;

        if ((js && ts) || (!js && !ts)) {
            throw new BadRequestException('JS or TS required');
        }
    }

    private checkCallScriptMethod(method: string) {
        if (!(method in ESupportedMethods)) {
            throw new NotAcceptableException('Custom http methods not supported');
        }
    }
}
