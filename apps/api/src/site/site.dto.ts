import { Property } from '../api.decorator';

export type TSiteName = string;
export type TSiteIdResponse = { siteName: TSiteName };

export class DtoSite {
    @Property()
    siteName: TSiteName;

    @Property()
    bundle?: string;

    @Property()
    isNamespaceOnly?: boolean;
}
