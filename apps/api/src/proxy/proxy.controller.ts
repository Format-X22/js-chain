import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProxyService } from './proxy.service';
import { OkResult, TOkResult } from '../api.dto';
import { DtoProxy, TProxyId, TProxyIdResponse } from './proxy.dto';

@ApiTags('Proxy api')
@Controller('proxy')
export class ProxyController {
    constructor(private proxyService: ProxyService) {}

    @Post('/')
    async create(@Body() body: DtoProxy): Promise<TProxyIdResponse> {
        return await this.proxyService.create(body.siteId, body.target);
    }

    @Post('/:id')
    async read(@Param('id') id: TProxyId): Promise<DtoProxy> {
        return await this.proxyService.read(id);
    }

    @Post('/:id')
    async update(@Param('id') id: TProxyId): Promise<TOkResult> {
        await this.proxyService.update(id);

        return OkResult;
    }

    @Post('/:id')
    async delete(@Param('id') id: TProxyId): Promise<TOkResult> {
        await this.proxyService.delete(id);

        return OkResult;
    }
}
