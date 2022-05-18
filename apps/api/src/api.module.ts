import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DescriptionController } from './description/description.controller';
import { DescriptionService } from './description/description.service';
import { SiteService } from './site/site.service';
import { SiteController } from './site/site.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { StorageModule } from '@app/shared/storage/storage.module';
import { AccountModel } from '@app/shared/storage/models/account.model';
import { VoteModel } from '@app/shared/storage/models/vote.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DemocracyController } from './democracy/democracy.controller';
import { DemocracyService } from './democracy/democracy.service';

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
                    models: [AccountModel, VoteModel, SiteModel],
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
    controllers: [DescriptionController, SiteController, AuthController, DemocracyController],
    providers: [DescriptionService, SiteService, AuthService, DemocracyService],
})
export class ApiModule {}
