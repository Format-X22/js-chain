import { Injectable } from '@nestjs/common';
import { DtoFile, TFileName, TFileNameResponse } from './file.dto';
import { TSiteName } from '../site/site.dto';

@Injectable()
export class FileService {
    async create({ siteName, fileName, data }: DtoFile): Promise<TFileNameResponse> {
        // TODO -

        return { fileName: null };
    }

    async read(siteName: TSiteName, fileName: TFileName): Promise<DtoFile> {
        // TODO -

        return;
    }

    async update({ siteName, fileName, data }: DtoFile): Promise<void> {
        // TODO -
    }

    async delete(siteName: TSiteName, fileName: TFileName): Promise<void> {
        // TODO -
    }
}
