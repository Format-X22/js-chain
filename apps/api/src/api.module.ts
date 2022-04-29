import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DescriptionController } from './description/description.controller';
import { DescriptionService } from './description/description.service';
import { ScriptService } from './script/script.service';
import { ScriptController } from './script/script.controller';
import { SiteService } from './site/site.service';
import { SiteController } from './site/site.controller';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { CallService } from './call/call.service';
import { CallController } from './call/call.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { FileModel } from '@app/shared/storage/models/file.model';
import { ScriptModel } from '@app/shared/storage/models/script.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => {
                return {
                    dialect: 'postgres',
                    host: cs.get('JS_DB_HOST'),
                    port: Number(cs.get('JS_DB_PORT')),
                    username: cs.get('JS_DB_USERNAME'),
                    password: cs.get('JS_DB_PASSWORD'),
                    database: cs.get('JS_DB_DATABASE_NAME'),
                    models: [SiteModel, FileModel, ScriptModel],
                    autoLoadModels: true,
                    synchronize: true,
                    //logging: false,
                    idleTimeoutMillis: 0,
                    connectionTimeoutMillis: 0,
                };
            },
        }),
    ],
    controllers: [DescriptionController, SiteController, ScriptController, FileController, CallController],
    providers: [DescriptionService, ScriptService, SiteService, FileService, CallService],
})
export class ApiModule {}
