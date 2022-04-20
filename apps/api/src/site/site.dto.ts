import { Property } from '../api.decorator';

export class DtoNewSite {
    @Property()
    isNamespaceOnly?: boolean;

    @Property()
    bundle?: string;
}
