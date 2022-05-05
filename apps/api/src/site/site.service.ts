import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { StorageService } from '@app/shared/storage/storage.service';
import { OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class SiteService {
    private SiteModel: typeof SiteModel;

    constructor(storageService: StorageService) {
        this.SiteModel = storageService.Site;
    }

    async get(siteName): Promise<SiteModel['html']> {
        const data = await this.SiteModel.findOne({ where: { siteName } });

        if (!data) {
            return null;
        }

        if (data.isNamespaceOnly) {
            return 'This is namespace, content not included';
        }

        return data.html;
    }

    async create({ siteName, html, isNamespaceOnly }: SiteModel): Promise<void> {
        const swaggerConfig: OpenAPIObject = {
            openapi: '3.0.0',
            info: {
                title: siteName + ' api',
                version: 'default',
            },
            paths: {},
        };

        await this.SiteModel.create({ siteName, html, isNamespaceOnly, swaggerConfig });
    }

    async read(siteName: SiteModel['siteName']): Promise<SiteModel> {
        return await this.SiteModel.findOne({
            where: { siteName },
            attributes: ['siteName', 'owner', 'isNamespaceOnly', 'html'],
        });
    }

    async update({ siteName, html, isNamespaceOnly }: SiteModel): Promise<void> {
        const values: Partial<SiteModel> = {};

        if (isNamespaceOnly) {
            values.isNamespaceOnly = true;
            values.html = null;
        } else {
            values.isNamespaceOnly = false;
            values.html = html;
        }

        const result = await this.SiteModel.update(values, { where: { siteName } });

        if (!result[0]) {
            throw new NotFoundException();
        }
    }

    async delete(siteName: SiteModel['siteName']): Promise<void> {
        const result = await this.SiteModel.destroy({ where: { siteName } });

        if (!result) {
            throw new NotFoundException();
        }
    }

    async getPlainData(siteName: SiteModel['siteName']): Promise<SiteModel['plainData']> {
        const site = await this.SiteModel.findOne({
            where: { siteName },
            attributes: ['plainData'],
        });

        return site?.plainData;
    }

    async getSwaggerJson(siteName: SiteModel['siteName']): Promise<SiteModel['swaggerConfig']> {
        const site = await this.SiteModel.findOne({
            where: { siteName },
            attributes: ['swaggerConfig'],
        });

        return site?.swaggerConfig;
    }
}
