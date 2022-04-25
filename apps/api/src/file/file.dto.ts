import { Property } from '../api.decorator';
import { TSiteId } from '../site/site.dto';

export type TFileId = string;
export type TFileIdResponse = { fileId: TFileId };

export class DtoFile {
    @Property({ isRequired: true })
    data: string;
}

export class DtoNewFile extends DtoFile {
    @Property({ isRequired: true, type: String })
    siteId: TSiteId;
}

export class DtoFileWithMetadata extends DtoFile {}
