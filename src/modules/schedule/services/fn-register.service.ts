import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dashboard, EventScheduling } from 'src/schemas';
import { RequestRegisterDto } from '../dto/request-register.dto';
import { ResponseGenericDto } from 'src/dto';
import { UserDecoratorInterface } from 'src/interfaces';

@Injectable()
export class FnRegisterService {
  private logger = new Logger(`::${FnRegisterService.name}::`);
  constructor(
    @InjectModel(EventScheduling.name)
    private readonly eventSchedulingModel: Model<EventScheduling>,
    @InjectModel(Dashboard.name)
    private readonly dashboardModel: Model<Dashboard>,
  ) {}

  async execute(
    requestRegisterDto: RequestRegisterDto,
    userPayload: UserDecoratorInterface,
  ): Promise<ResponseGenericDto> {
    const { idUser } = requestRegisterDto;

    this.logger.log(
      `::execute::parameters::${JSON.stringify(requestRegisterDto)} - ${JSON.stringify(userPayload)}`,
    );

    this.validateAuthorization(idUser, userPayload.idUser, userPayload.email);

    const registerEventScheduling = await this.registerEventScheduling(
      requestRegisterDto,
    );
    await this.registerDashboard(registerEventScheduling, {});
    this.logger.log(
      `::registerDashboard::${JSON.stringify(registerEventScheduling)}`,
    );
    return <ResponseGenericDto>{
      message: 'Proceso exitoso',
      operation: `::${FnRegisterService.name}::execute`,
      data: {},
    };
  }

  private validateAuthorization(
    registerUserId: string,
    payloadUserId: string,
    payloadUserEmail: string,
  ) {
    if (registerUserId != payloadUserId) {
      this.logger.warn(
        `El token del usuario ${payloadUserEmail} no pertenece a este usuario con identificador:${registerUserId}`,
      );
      throw new HttpException(
        'Accesos denegados para esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * 
   * @param requestRegisterDto 
   * @returns eventSchedulingModel
   * @throws HttpStatus.INTERNAL_SERVER_ERROR - [ER-RESC]
   */
  private async registerEventScheduling(
    requestRegisterDto: RequestRegisterDto,
  ) {
    try {
      return await this.eventSchedulingModel.create({
        ...requestRegisterDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Ocurrio un error interno, vuelva a intentar el proceso [ER-RESC]',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async registerDashboard(
    registerEventScheduling: any,
    userInDashboard: any,
  ) {
    const eventSchedulingInDashboard = {
      idScheduled: registerEventScheduling._id,
      name: registerEventScheduling.name,
      place: registerEventScheduling.description,
    };

    try {
      const countDocumentDashboard = await this.dashboardModel.countDocuments();

      if (!!countDocumentDashboard) {
        await this.createDashboard(eventSchedulingInDashboard, userInDashboard);
      } else {
        await this.updateDashboard(eventSchedulingInDashboard, userInDashboard);
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Ocurrio un error interno, vuelva a intentar el proceso [ER-RESCCU]',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async createDashboard(
    eventSchedulingInDashboard: any,
    userInDashboard: any,
  ) {
    try {
      await this.dashboardModel.create({
        challenged: [],
        scheduled: [eventSchedulingInDashboard],
        users: [userInDashboard],
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Ocurrio un error interno, vuelva a intentar el proceso [ER-CRDH]',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async updateDashboard(
    eventSchedulingInDashboard: any,
    userInDashboard: any,
  ) {
    try {
      await this.dashboardModel.updateOne(
        {},
        {
          $addToSet: {
            scheduled: [eventSchedulingInDashboard],
            users: [userInDashboard],
          },
        },
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Ocurrio un error interno, vuelva a intentar el proceso [ER-UPDH]',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
