import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';

export class RequestRegisterDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  idUser: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
