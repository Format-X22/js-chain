import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ScriptModel } from '@app/shared/storage/models/script.model';
import { StorageService } from '@app/shared/storage/storage.service';
import * as ts from 'typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { OperationObject, PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type TScriptResult = any;
export type TScriptQuery = Record<string, string>;
export type TScriptBody = Record<string, any>;

export enum ESupportedMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type TCallScriptOptions = {
    siteName: ScriptModel['siteName'];
    scriptName: ScriptModel['scriptName'];
    method: ESupportedMethods;
    query: TScriptQuery;
    body: TScriptBody;
};

@Injectable()
export class ScriptService {
    private ScriptModel: typeof ScriptModel;
    private SiteModel: typeof SiteModel;

    constructor(storageService: StorageService) {
        this.ScriptModel = storageService.Script;
        this.SiteModel = storageService.Site;
    }

    async create({
        siteName,
        scriptName,
        simpleJS,
        simpleTS,
        isUpdatable,
        isDeletable,
        httpMethod,
        swaggerSummary,
        swaggerDescription,
        swaggerTag,
    }: ScriptModel): Promise<void> {
        // TODO Add swagger params options

        const site = await this.SiteModel.findOne({ where: { siteName } });

        if (!site) {
            throw new NotFoundException('Site not found');
        }

        const values = { siteName, scriptName, isUpdatable, isDeletable, httpMethod };

        if (simpleJS) {
            await this.ScriptModel.create({ ...values, simpleJS });
        } else {
            const compiledSimpleTS = ts.transpileModule(simpleTS, {}).outputText;

            await this.ScriptModel.create({ ...values, simpleTS, compiledSimpleTS });
        }

        const scriptPath = `/script/${siteName}/${scriptName}`;
        const scriptMethod = httpMethod.toLowerCase();
        const paths: PathsObject = site.swaggerConfig.paths;

        paths[scriptPath] = { [scriptMethod]: {} };

        const operation: OperationObject = paths[scriptPath][scriptMethod];

        if (swaggerSummary) {
            operation.summary = swaggerSummary;
        }

        if (swaggerDescription) {
            operation.description = swaggerDescription;
        }

        if (swaggerTag) {
            operation.tags = [swaggerTag];
        }

        operation.responses = { '200': { description: '' } };

        site.changed('swaggerConfig', true);

        await site.save();
    }

    async read(siteName: ScriptModel['siteName'], scriptName: ScriptModel['scriptName']): Promise<ScriptModel> {
        return await this.ScriptModel.findOne({
            where: { siteName, scriptName },
            attributes: [
                'siteName',
                'fileName',
                'simpleJS',
                'simpleTS',
                'isUpdatable',
                'isDeletable',
                'httpMethod',
                'swaggerConfig',
            ],
        });
    }

    async update({ siteName, scriptName, simpleJS, simpleTS, isUpdatable, isDeletable }: ScriptModel): Promise<void> {
        const script = await this.ScriptModel.findOne({ where: { siteName, scriptName } });

        if (!script) {
            throw new NotFoundException();
        }

        if (!script.isUpdatable) {
            throw new ForbiddenException('Script is not updatable');
        }

        if (isUpdatable === false) {
            script.isUpdatable = isUpdatable;
        }

        if (typeof isDeletable === 'boolean') {
            if (!script.isDeletable && isDeletable) {
                throw new ForbiddenException('Is not deletable cant be switched to deletable');
            }

            if (script.isDeletable && !isDeletable) {
                script.isDeletable = isDeletable;
            }
        }

        if (simpleJS) {
            script.simpleJS = simpleJS;
            script.simpleTS = null;
            script.compiledSimpleTS = null;
        } else {
            script.simpleTS = simpleTS;
            script.compiledSimpleTS = ts.transpileModule(simpleTS, {}).outputText;
            script.simpleJS = null;
        }

        await script.save();
    }

    async delete(siteName: ScriptModel['siteName'], scriptName: ScriptModel['scriptName']): Promise<void> {
        const script = await this.ScriptModel.findOne({ where: { siteName, scriptName } });

        if (!script) {
            throw new NotFoundException();
        }

        if (!script.isDeletable) {
            throw new ForbiddenException('Is not deletable');
        }

        await script.destroy();
    }

    async getPlainData(
        siteName: ScriptModel['siteName'],
        scriptName: ScriptModel['scriptName'],
    ): Promise<ScriptModel['plainData']> {
        const site = await this.ScriptModel.findOne({
            where: { siteName, scriptName },
            attributes: ['plainData'],
        });

        return site?.plainData;
    }

    async callScript(options: TCallScriptOptions): Promise<TScriptResult> {
        // TODO -

        return options;
    }
}
