import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScriptService } from './script.service';
import { OkResult, TOkResult } from '../api.dto';
import { ScriptModel } from '@app/shared/storage/models/script.model';

@ApiTags('Script api')
@Controller('')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

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
}
