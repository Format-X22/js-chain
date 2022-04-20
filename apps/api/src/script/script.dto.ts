import { Property } from '../api.decorator';

export class DtoNewScript {
    @Property({ isRequired: true })
    siteId: string;

    @Property({ isRequired: true })
    bundle: string;
}
