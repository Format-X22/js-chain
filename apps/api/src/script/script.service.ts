import { Injectable } from '@nestjs/common';
import { DtoScript, TScriptName, TScriptNameResponse } from './script.dto';
import { TSiteName } from '../site/site.dto';

@Injectable()
export class ScriptService {
    async create({ siteName, scriptName, bundle }: DtoScript): Promise<TScriptNameResponse> {
        // TODO -

        return { scriptName: null };
    }

    async read(siteName: TSiteName, scriptName: TScriptName): Promise<DtoScript> {
        // TODO -

        return;
    }

    async update({ siteName, scriptName, bundle }: DtoScript): Promise<void> {
        // TODO -
    }

    async delete(siteName: TSiteName, scriptName: TScriptName): Promise<void> {
        // TODO -
    }
}
