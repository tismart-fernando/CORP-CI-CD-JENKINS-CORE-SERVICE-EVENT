import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type EventSchedulingDocument = EventScheduling & mongoose.Document;

@Schema({ collection: SCHEMAS.EVENT_SCHEDULING, autoIndex: true })
export class EventScheduling extends AuditPropertiesSchema {
  @Prop()
  description: String;

  @Prop()
  name: String;
}

export const EventSchedulingSchema =
  SchemaFactory.createForClass(EventScheduling);
