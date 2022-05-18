import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { FileModel } from '@app/shared/storage/models/file.model';
import { AccountModel } from '@app/shared/storage/models/account.model';

@Injectable()
export class StorageService {
    constructor(
        @InjectModel(SiteModel) public Site: typeof SiteModel,
        @InjectModel(FileModel) public File: typeof FileModel,
        @InjectModel(AccountModel) public Account: typeof AccountModel,
    ) {}
}
