import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { FileModel } from '@app/shared/storage/models/file.model';
import { ScriptModel } from '@app/shared/storage/models/script.model';
import { AccountModel } from '@app/shared/storage/models/account.model';
import { VoteModel } from '@app/shared/storage/models/vote.model';

@Module({
    imports: [SequelizeModule.forFeature([SiteModel, FileModel, ScriptModel, AccountModel, VoteModel])],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
