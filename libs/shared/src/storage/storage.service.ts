import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { FileModel } from '@app/shared/storage/models/file.model';
import { ScriptModel } from '@app/shared/storage/models/script.model';

@Injectable()
export class StorageService {
    constructor(
        @InjectModel(SiteModel) public Site: typeof SiteModel,
        @InjectModel(FileModel) public File: typeof FileModel,
        @InjectModel(ScriptModel) public Script: typeof ScriptModel,
    ) {}
}
