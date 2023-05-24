import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type ProfilesDocument = Profiles & mongoose.Document;

@Schema({ collection: SCHEMAS.PROFILES, autoIndex: true })
export class Profiles extends AuditPropertiesSchema {
  @Prop({ required: true, unique: true })
  idUser: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop({
    type: String,
    required: false,
    default: '#',
  })
  telephone: string;

  @Prop({ required: false, default: 0 })
  countEvent: Number;

  @Prop({ required: false, default: 0 })
  countEventScheduling: Number;
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);
