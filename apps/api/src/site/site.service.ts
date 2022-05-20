import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { StorageService } from '@app/shared/storage/storage.service';
import { SiteUpdateDto, SiteModelDto, SiteCreateDto, TSiteName } from './site.dto';

@Injectable()
export class SiteService {
    private SiteModel: typeof SiteModel;

    constructor(storageService: StorageService) {
        this.SiteModel = storageService.Site;
    }

    async get(siteName: TSiteName): Promise<string> {
        const data = await this.SiteModel.findOne({
            where: { siteName },
            attributes: ['html'],
        });

        return data?.html;
    }

    async create({ siteName, html }: SiteCreateDto): Promise<void> {
        await this.SiteModel.create({ siteName, html });
    }

    async read(siteName: TSiteName): Promise<SiteModelDto> {
        return await this.SiteModel.findOne({
            where: { siteName },
            attributes: ['siteName', 'owner', 'html'],
        });
    }

    async update(siteName: TSiteName, { html }: SiteUpdateDto): Promise<void> {
        const values: Partial<SiteModel> = { html };
        const result = await this.SiteModel.update(values, { where: { siteName } });

        if (!result[0]) {
            throw new NotFoundException();
        }
    }

    async delete(siteName: TSiteName): Promise<void> {
        const result = await this.SiteModel.destroy({ where: { siteName } });

        if (!result) {
            throw new NotFoundException();
        }
    }
}
