import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleController } from './schedule.controller';
import { FnRegisterService } from './services';
import {
  Dashboard,
  DashboardSchema,
  EventScheduling,
  EventSchedulingSchema,
} from 'src/schemas';
import { KEYS } from 'src/const/keys.const';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventScheduling.name,
        schema: EventSchedulingSchema,
      },
      {
        name: Dashboard.name,
        schema: DashboardSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: KEYS.jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ScheduleController],
  providers: [FnRegisterService],
})
export class ScheduleModule {}
