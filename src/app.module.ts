import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Request } from 'express';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SecurityModule } from './common/client/core-service-security/security.module';
import { CryptoModule } from './common/crypto/crypto.module';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './common/middleward/correlation-id.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
            singleLine: true
          }
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER]
          }
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          }
        }
      }
    }),
    SecurityModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('client.security'),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('mongodb'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CorrelationIdMiddleware).forRoutes('*')
  }
}