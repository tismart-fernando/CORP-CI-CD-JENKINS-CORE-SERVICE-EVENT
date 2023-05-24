import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const aplicationNestName = `::core-service-events::`;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get(ConfigService);
  const logger = app.get(Logger);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(logger);

  const swaggerBasePath = config.get('swagger.basePath', '/api');
  const httpBasePath = config.get('http.basePath', '/api');

  app.setGlobalPrefix(httpBasePath);

  const documentBuilder = new DocumentBuilder()
    .setTitle(aplicationNestName)
    .setVersion('1.0')
    .addBearerAuth();

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup(swaggerBasePath, app, document);

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(config.get('http.port'), config.get('http.host'));

  logger.log(
    `HTTP server listening at http://${config.get('http.host')}:${config.get(
      'http.port',
    )}`,
  );
  logger.log(
    `Swagger documentation at http://${config.get('http.host')}:${config.get(
      'http.port',
    )}${swaggerBasePath}`,
  );
}

void bootstrap();
