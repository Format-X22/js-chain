import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TStatus } from '../api.type';
import { APP_PRODUCTION_VERSION, TYPESCRIPT_VERSION } from '../main';

@ApiTags('Description')
@Controller('')
export class DescriptionController {
    @Get('/status')
    getStatus(): TStatus {
        const appVersion = APP_PRODUCTION_VERSION;
        const appSplit = appVersion.split('.');
        const tsVersion = TYPESCRIPT_VERSION;
        const tsSplit = tsVersion.split('.');

        return {
            version: {
                full: appVersion,
                major: Number(appSplit[0]),
                minor: Number(appSplit[1]),
                fix: Number(appSplit[2]),
            },
            typescriptCompiler: {
                full: tsVersion,
                major: Number(tsSplit[0]),
                minor: Number(tsSplit[1]),
                fix: Number(tsSplit[2]),
            },
        };
    }
}
