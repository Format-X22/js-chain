import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoScript, TScriptNameResponse } from './script.dto';
import { ScriptService } from './script.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('Script api')
@Controller('script')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

    @Post('/')
    async create(@Body() body: DtoScript): Promise<TScriptNameResponse> {
        return await this.scriptService.create(body.siteName, body.bundle);
    }

    @Get('/:name')
    async read(@Param('name') name: string): Promise<DtoScript> {
        return await this.scriptService.read(name);
    }

    @Patch('/:name')
    async update(@Param('name') name: string, @Body() body: DtoScript): Promise<TOkResult> {
        await this.scriptService.update(name, body.bundle);

        return OkResult;
    }

    @Delete('/:name')
    async delete(@Param('name') name: string): Promise<TOkResult> {
        await this.scriptService.delete(name);

        return OkResult;
    }
}
