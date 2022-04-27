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
import { TBodyParams, TProxyResult, TQueryParams, TScriptResult } from './call.dto';
import { CallService } from './call.service';

@ApiTags('Call api')
@Controller('call')
export class CallController {
    constructor(private callService: CallService) {}

    @Get('/:siteId')
    async getSite(@Param('siteId') siteId: string): Promise<string> {
        return await this.callService.getSite(siteId);
    }

    @Get('/:siteId/file/:fileId')
    async getFile(@Param('siteId') siteId: string, @Param('fileId') fileId: string): Promise<string> {
        return await this.callService.getFile(siteId, fileId);
    }

    @Get('/:siteId/script-docs')
    async getScriptDocs(@Param('siteId') siteId: string): Promise<string> {
        return await this.callService.getScriptDocs(siteId);
    }

    @Get('/:siteId/script/:scriptId')
    async callScriptAsGet(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.GET,
            query,
            body: null,
        });
    }

    @Post('/:siteId/script/:scriptId')
    async callScriptAsPost(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.POST,
            query,
            body,
        });
    }

    @Put('/:siteId/script/:scriptId')
    async callScriptAsPut(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.PUT,
            query,
            body,
        });
    }

    @Patch('/:siteId/script/:scriptId')
    async callScriptAsPatch(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.PATCH,
            query,
            body,
        });
    }

    @Delete('/:siteId/script/:scriptId')
    async callScriptAsDelete(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.DELETE,
            query,
            body: null,
        });
    }

    @Head('/:siteId/script/:scriptId')
    async callScriptAsHead(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }

    @Options('/:siteId/script/:scriptId')
    async callScriptAsOptions(
        @Param('siteId') siteId: string,
        @Param('scriptId') scriptId: string,
        @Query() query: TQueryParams,
    ): Promise<TScriptResult> {
        return await this.callService.callScript({
            siteId,
            scriptId,
            method: RequestMethod.OPTIONS,
            query,
            body: null,
        });
    }

    @Get('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsGet(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }

    @Post('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsPost(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body,
        });
    }

    @Put('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsPut(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body,
        });
    }

    @Patch('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsPatch(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
        @Body() body: TBodyParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body,
        });
    }

    @Delete('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsDelete(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }

    @Head('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsHead(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }

    @Options('/:siteId/proxy/:proxyId/:endpoint')
    async callProxyAsOption(
        @Param('siteId') siteId: string,
        @Param('proxyId') proxyId: string,
        @Param('endpoint') endpoint: string,
        @Query() query: TQueryParams,
    ): Promise<TProxyResult> {
        return await this.callService.callProxy({
            siteId,
            proxyId,
            endpoint,
            method: RequestMethod.HEAD,
            query,
            body: null,
        });
    }
}
