import { Property } from '../api.decorator';

export type TSiteId = string;
export type TSiteIdResponse = { siteId: TSiteId };

export class DtoSite {
    @Property()
    bundle?: string;

    @Property()
    isNamespaceOnly?: boolean;
}
