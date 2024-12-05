import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigType } from './configs/envConfigType';
import { AuthService } from './modules/auth/services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appEnvConfig = app.get(ConfigService).get<AppConfigType>('app');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // If cookies or auth headers are needed
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CRM, Programming school API')
    .setDescription('OKTEN capstone project')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'headers' },
      'Access-Token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'headers' },
      'Refresh-Token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'headers' },
      'Activate-Token',
    )
    .build();

  // Creation of Swagger document
  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, SwaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      // operationsSorter: 'method',
      // type of lists representation
      docExpansion: 'list',
      // Expansion depth
      defaultModelExpandDepth: 1,
      // authorization credentials (like an access token, JWT, or session token)
      // will be stored and reused across multiple requests or sessions.
      persistAuthorization: true,
    },
  });

  // Pipes
  app.useGlobalPipes(
    // Validation of DTO
    new ValidationPipe({
      // if DTO without decorators whole DTO won't be allowed
      whitelist: true,
      // In DTO only properties with decorators are allowed
      forbidNonWhitelisted: true,
      //   Allow transformation of Validated DTO properties (class transform used!!!!)
      transform: true,
    }),
  );

  await app.listen(appEnvConfig.port, async () => {
    await app.get(AuthService).adminCreate();
    Logger.log(
      `Server started on: http://${appEnvConfig.host}:${appEnvConfig.port}`,
    );
    Logger.log(
      `Swagger is available on: http://${appEnvConfig.host}:${appEnvConfig.port}/api-docs`,
    );
  });
}

void bootstrap();
