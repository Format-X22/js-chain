import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DtoNewScript } from './script.dto';

@ApiTags('Script api')
@Controller('script')
export class ScriptController {
    @Post('/')
    async postScript(@Body() body: DtoNewScript): Promise<string> {
        // TODO -
        return;
    }

    @Get('/:id')
    async getScript(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Patch('/:id')
    async patchScript(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }

    @Delete('/:id')
    async deleteScript(@Param('id') id: string): Promise<string> {
        // TODO -
        return;
    }
}
