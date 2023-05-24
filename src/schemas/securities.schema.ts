import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';
import { SCHEMAS } from '../const/schema.name.const';

export type SecuritiesDocument = Securities & mongoose.Document;

@Schema({ collection: SCHEMAS.SECURITIES, autoIndex: true })
export class Securities extends AuditPropertiesSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idUser: mongoose.Schema.Types.ObjectId;

  @Prop(
    raw({
      type: [],
    }),
  )
  tokens: String[];
}

export const SecuritiesSchema = SchemaFactory.createForClass(Securities);
