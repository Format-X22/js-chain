import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { TScriptResult, TBodyParams, TQueryParams } from './call.dto';

export type TCallScriptOptions = {
    siteName: string;
    scriptName: any;
    method: RequestMethod;
    query: TQueryParams;
    body: TBodyParams;
};

@Injectable()
export class CallService {
    async getSite(siteId: string): Promise<string> {
        // TODO -
        return;
    }

    async getFile(siteId: string, fileId: any): Promise<string> {
        // TODO -
        return;
    }

    async getScriptDocs(siteId: string): Promise<string> {
        // TODO -
        return;
    }

    async callScript(options: TCallScriptOptions): Promise<TScriptResult> {
        // TODO -
    }
}
