import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SiteService } from './site/site.service';
import { SiteController } from './site/site.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { StorageModule } from '@app/shared/storage/storage.module';
import { FileModel } from '@app/shared/storage/models/file.model';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { StatusController } from './status/status.controller';

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
                    models: [SiteModel, FileModel],
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                    idleTimeoutMillis: 0,
                    connectionTimeoutMillis: 0,
                    paranoid: true,
                };
            },
        }),
        StorageModule,
    ],
    controllers: [StatusController, SiteController, FileController],
    providers: [SiteService, FileService],
})
export class ApiModule {}
