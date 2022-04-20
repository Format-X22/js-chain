import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DescriptionController } from './description/description.controller';
import { DescriptionService } from './description/description.service';
import { ScriptService } from './script/script.service';
import { ScriptController } from './script/script.controller';
import { SiteController } from './site/site.controller';
import { SiteService } from './site/site.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [DescriptionController, ScriptController, SiteController],
    providers: [DescriptionService, ScriptService, SiteService],
})
export class ApiModule {}
