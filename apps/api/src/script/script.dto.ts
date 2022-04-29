import { Property } from '../api.decorator';
import { TSiteName } from '../site/site.dto';

export type TScriptName = string;
export type TScriptNameResponse = { scriptName: TScriptName };

export class DtoScript {
    @Property({ isRequired: true, type: String })
    siteName: TSiteName;

    @Property({ isRequired: true })
    bundle: string;
}
