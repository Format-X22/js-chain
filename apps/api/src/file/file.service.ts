import { Injectable } from '@nestjs/common';
import { DtoFile, TFileName, TFileNameResponse } from './file.dto';
import { TSiteName } from '../site/site.dto';

@Injectable()
export class FileService {
    async create(siteId: TSiteName, data: DtoFile['data']): Promise<TFileNameResponse> {
        // TODO -

        return { fileName: null };
    }

    async read(fileId: TFileName): Promise<DtoFile> {
        // TODO -

        return;
    }

    async update(fileId: TFileName, data: DtoFile['data']): Promise<void> {
        // TODO -
    }

    async delete(fileId: TFileName): Promise<void> {
        // TODO -
    }
}
