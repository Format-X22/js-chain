import { Injectable } from '@nestjs/common';
import { DtoSite, TSiteId, TSiteIdResponse } from './site.dto';

@Injectable()
export class SiteService {
    async create(
        siteId: TSiteId,
        bundle: DtoSite['bundle'],
        isNamespaceOnly: DtoSite['isNamespaceOnly'],
    ): Promise<TSiteIdResponse> {
        // TODO -

        return { siteId: null };
    }

    async read(siteId: TSiteId): Promise<DtoSite> {
        // TODO -

        return;
    }

    async update(
        siteId: TSiteId,
        bundle: DtoSite['bundle'],
        isNamespaceOnly: DtoSite['isNamespaceOnly'],
    ): Promise<void> {
        // TODO -
    }

    async delete(siteId: TSiteId): Promise<void> {
        // TODO -
    }
}
