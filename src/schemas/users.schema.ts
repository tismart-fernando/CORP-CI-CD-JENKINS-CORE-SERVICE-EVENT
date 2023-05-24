import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type UsersDocument = Users & mongoose.Document;

@Schema({ collection: SCHEMAS.USERS, autoIndex: true })
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  haveMostAge: boolean;

  @Prop({ type: AuditPropertiesSchema })
  auditProperties: AuditPropertiesSchema;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
