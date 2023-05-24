import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type EventDocument<T> = Event<T> & mongoose.Document;

@Schema({ collection: SCHEMAS.EVENT, autoIndex: true })
export class Event<T> extends AuditPropertiesSchema {}

export const EventSchema = SchemaFactory.createForClass(Event);
