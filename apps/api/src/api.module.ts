import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DescriptionController } from './description/description.controller';
import { DescriptionService } from './description/description.service';
import { ScriptService } from './script/script.service';
import { ScriptController } from './script/script.controller';
import { SiteService } from './site/site.service';
import { SiteController } from './site/site.controller';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [DescriptionController, ScriptController, SiteController, FileController],
    providers: [DescriptionService, ScriptService, SiteService, FileService],
})
export class ApiModule {}
