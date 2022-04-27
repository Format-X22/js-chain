import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoScript, TScriptIdResponse } from './script.dto';
import { ScriptService } from './script.service';
import { OkResult, TOkResult } from '../api.dto';

@ApiTags('Script api')
@Controller('script')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

    @Post('/')
    async create(@Body() body: DtoScript): Promise<TScriptIdResponse> {
        return await this.scriptService.create(body.siteId, body.bundle);
    }

    @Get('/:id')
    async read(@Param('id') id: string): Promise<DtoScript> {
        return await this.scriptService.read(id);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body: DtoScript): Promise<TOkResult> {
        await this.scriptService.update(id, body.bundle);

        return OkResult;
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<TOkResult> {
        await this.scriptService.delete(id);

        return OkResult;
    }
}
