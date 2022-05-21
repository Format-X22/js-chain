import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TStatus } from '../api.type';
import { APP_PRODUCTION_VERSION } from '../main';

@ApiTags('Info and node status')
@Controller('')
export class StatusController {
    @Get('/status')
    getStatus(): TStatus {
        const appVersion = APP_PRODUCTION_VERSION;
        const appSplit = appVersion.split('.');

        return {
            version: {
                full: appVersion,
                major: Number(appSplit[0]),
                minor: Number(appSplit[1]),
                fix: Number(appSplit[2]),
            },
        };
    }
}
