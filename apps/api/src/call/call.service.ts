import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { TScriptResult, TBodyParams, TQueryParams } from './call.dto';
import { TSiteName } from '../site/site.dto';
import { TScriptName } from '../script/script.dto';
import { TFileName } from '../file/file.dto';

export type TCallScriptOptions = {
    siteName: TSiteName;
    scriptName: TScriptName;
    method: RequestMethod;
    query: TQueryParams;
    body: TBodyParams;
};

@Injectable()
export class CallService {
    async getSite(siteId: TSiteName): Promise<string> {
        // TODO -
        return;
    }

    async getFile(siteId: TSiteName, fileId: TFileName): Promise<string> {
        // TODO -
        return;
    }

    async getScriptDocs(siteId: TSiteName): Promise<string> {
        // TODO -
        return;
    }

    async callScript(options: TCallScriptOptions): Promise<TScriptResult> {
        // TODO -
    }
}
