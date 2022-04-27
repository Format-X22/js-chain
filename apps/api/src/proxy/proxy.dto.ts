import { Property } from '../api.decorator';
import { IsUrl } from 'class-validator';
import { TSiteId } from '../site/site.dto';

export type TProxyId = string;
export type TProxyIdResponse = { proxyId: TProxyId };

export class DtoProxy {
    @Property({ isRequired: true })
    @IsUrl()
    target: string;

    @Property({ isRequired: true, type: String })
    siteId: TSiteId;
}
