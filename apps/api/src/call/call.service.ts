import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { TScriptResult, TBodyParams, TQueryParams } from './call.dto';
import { TSiteId } from '../site/site.dto';
import { TScriptId } from '../script/script.dto';
import { TFileId } from '../file/file.dto';

export type TCallScriptOptions = {
    siteId: TSiteId;
    scriptId: TScriptId;
    method: RequestMethod;
    query: TQueryParams;
    body: TBodyParams;
};

export type TCallProxyOptions = {
    siteId: TSiteId;
    proxyId: TScriptId;
    endpoint: string;
    method: RequestMethod;
    query: TQueryParams;
    body: TBodyParams;
};

@Injectable()
export class CallService {
    async getSite(siteId: TSiteId): Promise<string> {
        // TODO -
        return;
    }

    async getFile(siteId: TSiteId, fileId: TFileId): Promise<string> {
        // TODO -
        return;
    }

    async getScriptDocs(siteId: TSiteId): Promise<string> {
        // TODO -
        return;
    }

    async callScript(options: TCallScriptOptions): Promise<TScriptResult> {
        // TODO -
    }

    async callProxy(options: TCallProxyOptions): Promise<TScriptResult> {
        // TODO -
    }
}
