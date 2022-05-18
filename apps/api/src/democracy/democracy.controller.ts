import { Body, Controller, Get, Post } from '@nestjs/common';
import { OkResult, TOkResult } from '../api.dto';
import { DemocracyVoteDto } from './democracy.dto';
import { AccountModel } from '@app/shared/storage/models/account.model';

@Controller('democracy')
export class DemocracyController {
    @Get('delegates-list')
    async getDelegatesList(): Promise<{ data: Array<AccountModel> }> {
        // TODO -

        return;
    }

    @Post('vote')
    async vote(@Body() body: DemocracyVoteDto): Promise<TOkResult> {
        // TODO -

        return OkResult;
    }
}
