import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { FileModel } from '@app/shared/storage/models/file.model';
import { StorageService } from '@app/shared/storage/storage.service';
import { TSiteName } from '../site/site.dto';
import { FileCreateDto, FileModelDto, FileUpdateDto, TFileName } from './file.dto';
import { Response } from 'express';
import { Readable } from 'stream';

@Injectable()
export class FileService {
    private FileModel: typeof FileModel;

    constructor(storageService: StorageService) {
        this.FileModel = storageService.File;
    }

    async get(siteName: TSiteName, fileName: TFileName, res: Response): Promise<StreamableFile> {
        const data = await this.FileModel.findOne({
            where: { siteName, fileName },
            attributes: ['contentType', 'dataString'],
        });

        if (!data) {
            return null;
        }

        res.set({
            'Content-Type': data.contentType,
        });

        return new StreamableFile(Readable.from([data.dataString]));
    }

    async create(siteName: TSiteName, { fileName, contentType, dataString }: FileCreateDto): Promise<void> {
        await this.FileModel.create({ siteName, fileName, contentType, dataString });
    }

    async read(siteName: TSiteName, fileName: TFileName): Promise<FileModelDto> {
        return await this.FileModel.findOne({
            where: { siteName, fileName },
            attributes: ['siteName', 'fileName', 'contentType', 'dataString'],
        });
    }

    async update(siteName: TSiteName, fileName: TFileName, { contentType, dataString }: FileUpdateDto): Promise<void> {
        const values: Partial<FileModel> = { contentType, dataString };
        const result = await this.FileModel.update(values, { where: { siteName, fileName } });

        if (!result[0]) {
            throw new NotFoundException();
        }
    }

    async delete(siteName: TSiteName, fileName: TFileName): Promise<void> {
        const result = await this.FileModel.destroy({ where: { siteName, fileName } });

        if (!result) {
            throw new NotFoundException();
        }
    }
}
