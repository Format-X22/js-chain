import { Property } from '../api.decorator';
import { TSiteId } from '../site/site.dto';

export type TScriptId = string;
export type TScriptIdResponse = { scriptId: TScriptId };

export class DtoScript {
    @Property({ isRequired: true })
    bundle: string;
}

export class DtoNewScript extends DtoScript {
    @Property({ isRequired: true, type: String })
    siteId: TSiteId;
}

export class DtoScriptWithMetadata extends DtoScript {}
