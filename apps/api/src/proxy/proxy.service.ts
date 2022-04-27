import { Injectable } from '@nestjs/common';
import { DtoProxy, TProxyId, TProxyIdResponse } from './proxy.dto';

@Injectable()
export class ProxyService {
    async create(siteId: TProxyId, target: DtoProxy['target']): Promise<TProxyIdResponse> {
        // TODO -

        return { proxyId: null };
    }

    async read(proxyId: TProxyId): Promise<DtoProxy> {
        // TODO -
        return;
    }

    async update(proxyId: TProxyId): Promise<void> {
        // TODO -
    }

    async delete(proxyId: TProxyId): Promise<void> {
        // TODO -
    }
}
