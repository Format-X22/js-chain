import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoScript, TScriptNameResponse } from './script.dto';
import { ScriptService } from './script.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('Script api')
@Controller('/site/:siteName/script')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

    @Post('/')
    async create(@Param('siteName') siteName: string, @Body() body: DtoScript): Promise<TScriptNameResponse> {
        return await this.scriptService.create(body);
    }

    @Get('/:scriptName')
    async read(@Param('siteName') siteName: string, @Param('scriptName') scriptName: string): Promise<DtoScript> {
        return await this.scriptService.read(siteName, scriptName);
    }

    @Patch('/:scriptName')
    async update(
        @Param('siteName') siteName: string,
        @Param('scriptName') scriptName: string,
        @Body() body: DtoScript,
    ): Promise<TOkResult> {
        await this.scriptService.update({ siteName, scriptName, ...body });

        return OkResult;
    }

    @Delete('/:scriptName')
    async delete(@Param('siteName') siteName: string, @Param('scriptName') scriptName: string): Promise<TOkResult> {
        await this.scriptService.delete(siteName, scriptName);

        return OkResult;
    }
}
