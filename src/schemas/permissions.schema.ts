import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type PermissionsDocument<T> = Permissions<T> & mongoose.Document;

@Schema({ collection: SCHEMAS.PERMISSIONS, autoIndex: true })
export class Permissions<T> extends AuditPropertiesSchema {}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
