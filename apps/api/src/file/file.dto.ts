import { Property } from '../api.decorator';

export class DtoNewFile {
    @Property({ isRequired: true })
    siteId: string;

    @Property({ isRequired: true })
    data: string;
}
