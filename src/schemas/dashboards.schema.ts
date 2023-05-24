import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type DashboardDocument = Dashboard & mongoose.Document;

@Schema({ collection: SCHEMAS.DASHBOARDS, autoIndex: true })
export class Dashboard extends AuditPropertiesSchema {
  @Prop(
    raw({
      type: [
        {
          idChallenged: mongoose.Schema.Types.ObjectId,
          name: String,
          place: String,
          created: String,
          countParticipant: Number,
          statusDescription: String,
        },
      ],
    }),
  )
  challenged: {
    idChallenged: mongoose.Schema.Types.ObjectId;
    name: string;
    place: string;
    created: string;
    countParticipant: number;
    statusDescription: string;
  }[];

  @Prop(
    raw({
      type: [
        {
          idScheduled: mongoose.Schema.Types.ObjectId,
          name: String,
          place: String,
          created: String,
          countParticipant: Number,
          statusDescription: String,
        },
      ],
    }),
  )
  scheduled: {
    idScheduled: mongoose.Schema.Types.ObjectId;
    name: string;
    place: string;
    created: string;
    countParticipant: number;
    statusDescription: string;
  }[];

  @Prop(
    raw({
      type: [
        {
          idUser: mongoose.Schema.Types.ObjectId,
          firstName: String,
          lastName: String,
        },
      ],
    }),
  )
  users: {
    idUser: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
  }[];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
