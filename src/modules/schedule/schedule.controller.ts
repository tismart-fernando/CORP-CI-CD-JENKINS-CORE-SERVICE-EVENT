import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { FnRegisterService } from './services';
import { ResponseGenericDto } from 'src/dto';
import { RequestRegisterDto } from './dto/request-register.dto';
import { SecurityGuard } from 'src/common/guard/security.guard';
import { UserDecorator } from 'src/common/decorator';
import { UserDecoratorInterface } from 'src/interfaces';

@ApiBearerAuth()
@UseGuards(SecurityGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly fnRegisterService: FnRegisterService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The register has been successfully created event scheduling.',
    type: ResponseGenericDto,
  })
  @ApiConflictResponse({
    description: 'The register has been failed by conflict event scheduling',
  })
  @ApiInternalServerErrorResponse({
    description: 'The register has been failed by created event scheduling.',
  })
  register(
    @Body() requestRegisterDto: RequestRegisterDto,
    @UserDecorator() userDecorator: UserDecoratorInterface
  ): Promise<ResponseGenericDto> {
    return this.fnRegisterService.execute(requestRegisterDto, userDecorator);
  }
}
