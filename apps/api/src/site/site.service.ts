import { Injectable } from '@nestjs/common';
import { DtoSite, TSiteName, TSiteIdResponse } from './site.dto';

@Injectable()
export class SiteService {
    async create({ siteName, bundle, isNamespaceOnly }: DtoSite): Promise<TSiteIdResponse> {
        // TODO -

        return { siteName: null };
    }

    async read(siteName: TSiteName): Promise<DtoSite> {
        // TODO -

        return;
    }

    async update({ siteName, bundle, isNamespaceOnly }: DtoSite): Promise<void> {
        // TODO -
    }

    async delete(siteId: TSiteName): Promise<void> {
        // TODO -
    }
}
