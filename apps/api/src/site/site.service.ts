import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { StorageService } from '@app/shared/storage/storage.service';

@Injectable()
export class SiteService {
    private SiteModel: typeof SiteModel;

    constructor(storageService: StorageService) {
        this.SiteModel = storageService.Site;
    }

    async get(siteName): Promise<SiteModel['html']> {
        const data = await this.SiteModel.findOne({ where: { siteName } });

        return data?.html;
    }

    async create({ siteName, html, isNamespaceOnly }: SiteModel): Promise<void> {
        await this.SiteModel.create({ siteName, html, isNamespaceOnly });
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
}
