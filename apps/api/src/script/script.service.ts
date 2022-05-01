import { Injectable, NotFoundException } from '@nestjs/common';
import { ScriptModel } from '@app/shared/storage/models/script.model';
import { StorageService } from '@app/shared/storage/storage.service';
import * as ts from 'typescript';

@Injectable()
export class ScriptService {
    private ScriptModel: typeof ScriptModel;

    constructor(storageService: StorageService) {
        this.ScriptModel = storageService.Script;
    }

    async create({ siteName, scriptName, simpleJS, simpleTS }: ScriptModel): Promise<void> {
        if (simpleJS) {
            await this.ScriptModel.create({ siteName, scriptName, simpleJS });
            return;
        }

        const compiledSimpleTS = ts.transpileModule(simpleTS, {}).outputText;

        await this.ScriptModel.create({ siteName, scriptName, simpleTS, compiledSimpleTS });
    }

    async read(siteName: ScriptModel['siteName'], scriptName: ScriptModel['scriptName']): Promise<ScriptModel> {
        return await this.ScriptModel.findOne({
            where: { siteName, scriptName },
            attributes: ['siteName', 'fileName', 'simpleJS', 'simpleTS'],
        });
    }

    async update({ siteName, scriptName, simpleJS, simpleTS }: ScriptModel): Promise<void> {
        const values: Partial<ScriptModel> = {};

        if (simpleJS) {
            values.simpleJS = simpleJS;
            values.simpleTS = null;
            values.compiledSimpleTS = null;
        } else {
            values.simpleTS = simpleTS;
            values.compiledSimpleTS = ts.transpileModule(simpleTS, {}).outputText;
            values.simpleJS = null;
        }

        const result = await this.ScriptModel.update(values, { where: { siteName, scriptName } });

        if (!result[0]) {
            throw new NotFoundException();
        }
    }

    async delete(siteName: ScriptModel['siteName'], scriptName: ScriptModel['scriptName']): Promise<void> {
        const result = await this.ScriptModel.destroy({ where: { siteName, scriptName } });

        if (!result) {
            throw new NotFoundException();
        }
    }
}
