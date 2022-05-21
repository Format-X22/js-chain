import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TStatus } from './api.type';
import { SiteModel } from '@app/shared/storage/models/site.model';
import { ErrorsInterceptor } from './api.interceptor';
import { FileModel } from '@app/shared/storage/models/file.model';

export const APP_PRODUCTION_VERSION: TStatus['version']['full'] = '0.1.0';

const DEFAULT_PORT = 3000;

async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    const configService = app.get(ConfigService);
    const port = Number(configService.get('JS_APP_PORT', DEFAULT_PORT));

    app.enableCors({
        origin: configService.get('JS_APP_CORS_ORIGIN', '*'),
        allowedHeaders: '*',
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle('JS Chain api')
        .setVersion('0.1')
        .addApiKey(
            {
                type: 'apiKey',
                name: 'x-auth-session',
                in: 'header',
            },
            'x-auth-session',
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, document);

    const syncOptions = { alter: { drop: false } };

    await SiteModel.sync(syncOptions);
    await FileModel.sync(syncOptions);

    await app.listen(port);
}
bootstrap();
