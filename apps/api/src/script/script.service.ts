import { Injectable } from '@nestjs/common';
import { DtoScript, TScriptName, TScriptNameResponse } from './script.dto';
import { TSiteName } from '../site/site.dto';

@Injectable()
export class ScriptService {
    async create(siteId: TSiteName, bundle: DtoScript['bundle']): Promise<TScriptNameResponse> {
        // TODO -

        return { scriptName: null };
    }

    async read(scriptId: TScriptName): Promise<DtoScript> {
        // TODO -

        return;
    }

    async update(scriptId: TScriptName, bundle: DtoScript['bundle']): Promise<void> {
        // TODO -
    }

    async delete(scriptId: TScriptName): Promise<void> {
        // TODO -
    }
}
