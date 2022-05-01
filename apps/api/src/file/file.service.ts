import { Injectable, NotFoundException } from '@nestjs/common';
import { FileModel } from '@app/shared/storage/models/file.model';
import { StorageService } from '@app/shared/storage/storage.service';

@Injectable()
export class FileService {
    private FileModel: typeof FileModel;

    constructor(storageService: StorageService) {
        this.FileModel = storageService.File;
    }

    async get(siteName: FileModel['siteName'], fileName: FileModel['fileName']): Promise<string> {
        const data = await this.FileModel.findOne({ where: { siteName, fileName } });

        return data?.dataString;
    }

    async create({ siteName, fileName, dataString }: FileModel): Promise<void> {
        await this.FileModel.create({ siteName, fileName, dataString });
    }

    async read(siteName: string, fileName: FileModel['fileName']): Promise<FileModel> {
        return await this.FileModel.findOne({
            where: { siteName, fileName },
            attributes: ['siteName', 'fileName', 'dataString'],
        });
    }

    async update({ siteName, fileName, dataString }: FileModel): Promise<void> {
        const values: Partial<FileModel> = {};

        if (dataString) {
            values.dataString = dataString;
        }

        const result = await this.FileModel.update(values, { where: { siteName, fileName } });

        if (!result[0]) {
            throw new NotFoundException();
        }
    }

    async delete(siteName: string, fileName: FileModel['fileName']): Promise<void> {
        const result = await this.FileModel.destroy({ where: { siteName, fileName } });

        if (!result) {
            throw new NotFoundException();
        }
    }
}
