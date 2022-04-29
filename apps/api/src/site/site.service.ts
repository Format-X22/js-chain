import { Injectable } from '@nestjs/common';
import { DtoSite, TSiteName, TSiteIdResponse } from './site.dto';

@Injectable()
export class SiteService {
    async create(
        siteId: TSiteName,
        bundle: DtoSite['bundle'],
        isNamespaceOnly: DtoSite['isNamespaceOnly'],
    ): Promise<TSiteIdResponse> {
        // TODO -

        return { siteName: null };
    }

    async read(siteId: TSiteName): Promise<DtoSite> {
        // TODO -

        return;
    }

    async update(
        siteId: TSiteName,
        bundle: DtoSite['bundle'],
        isNamespaceOnly: DtoSite['isNamespaceOnly'],
    ): Promise<void> {
        // TODO -
    }

    async delete(siteId: TSiteName): Promise<void> {
        // TODO -
    }
}
