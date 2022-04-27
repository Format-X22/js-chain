import { Injectable } from '@nestjs/common';
import { DtoScript, TScriptId, TScriptIdResponse } from './script.dto';
import { TSiteId } from '../site/site.dto';

@Injectable()
export class ScriptService {
    async create(siteId: TSiteId, bundle: DtoScript['bundle']): Promise<TScriptIdResponse> {
        // TODO -

        return { scriptId: null };
    }

    async read(scriptId: TScriptId): Promise<DtoScript> {
        // TODO -

        return;
    }

    async update(scriptId: TScriptId, bundle: DtoScript['bundle']): Promise<void> {
        // TODO -
    }

    async delete(scriptId: TScriptId): Promise<void> {
        // TODO -
    }
}
