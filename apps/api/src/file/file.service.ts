import { Injectable } from '@nestjs/common';
import { DtoFile, DtoFileWithMetadata, TFileId, TFileIdResponse } from './file.dto';
import { TSiteId } from '../site/site.dto';

@Injectable()
export class FileService {
    async create(siteId: TSiteId, data: DtoFile['data']): Promise<TFileIdResponse> {
        // TODO -

        return { fileId: null };
    }

    async read(fileId: TFileId): Promise<DtoFileWithMetadata> {
        // TODO -

        return;
    }

    async update(fileId: TFileId, data: DtoFile['data']): Promise<void> {
        // TODO -
    }

    async delete(fileId: TFileId): Promise<void> {
        // TODO -
    }
}
