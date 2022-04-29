import {
    Body,
    Controller,
    Delete,
    Get,
    Head,
    Options,
    Param,
    Patch,
    Post,
    Put,
    Query,
    RequestMethod,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TBodyParams, TQueryParams, TScriptResult } from './call.dto';
import { CallService } from './call.service';

@ApiTags('Call api')
@Controller('call')
export class CallController {
    constructor(private callService: CallService) {}

    @Get('/:siteName')
    async getSite(@Param('siteName') siteName: string): Promise<string> {
        return await this.callService.getSite(siteName);
    }

    @Get('/:siteName/file/:fileName')
    async getFile(@Param('siteName') siteName: string, @Param('fileName') fileName: string): Promise<string> {
        return await this.callService.getFile(siteName, fileName);
    }

    @Get('/:siteName/script-docs')
    async getScriptDocs(@Param('siteName') siteName: string): Promise<string> {
        return await this.callService.getScriptDocs(siteName);
    }

    @Get('/:siteName/script/:scriptName')
    async callScriptAsGet(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.GET,
            query,
            body: null,
        });
    }

    @Post('/:siteName/script/:scriptName')
    async callScriptAsPost(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.POST,
            query,
            body,
        });
    }

    @Put('/:siteName/script/:scriptName')
    async callScriptAsPut(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.PUT,
            query,
            body,
        });
    }

    @Patch('/:siteName/script/:scriptName')
    async callScriptAsPatch(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.PATCH,
            query,
            body,
        });
    }

    @Delete('/:siteName/script/:scriptName')
    async callScriptAsDelete(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.DELETE,
            query,
            body: null,
        });
    }

    @Head('/:siteName/script/:scriptName')
    async callScriptAsHead(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }

    @Options('/:siteName/script/:scriptName')
    async callScriptAsOptions(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteName,
            scriptName,
            method: RequestMethod.OPTIONS,
            query,
            body: null,
        });
    }
}
