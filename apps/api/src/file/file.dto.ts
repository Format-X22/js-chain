import { Property } from '../api.decorator';
import { TSiteName } from '../site/site.dto';

export type TFileName = string;
export type TFileNameResponse = { fileName: TFileName };

export class DtoFile {
    @Property({ isRequired: true, type: String })
    siteName: TSiteName;

    @Property({ isRequired: true, type: String })
    fileName: TFileName;

    @Property({ isRequired: true })
    data: string;
}
