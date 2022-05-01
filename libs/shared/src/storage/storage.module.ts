import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { FileModel } from '@app/shared/storage/models/file.model';
import { ScriptModel } from '@app/shared/storage/models/script.model';

@Module({
    imports: [SequelizeModule.forFeature([SiteModel, FileModel, ScriptModel])],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
