import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { SECURITY_CLIENT } from '../../../const/client.const';

@Injectable()
export class SecurityService {
    private logger = new Logger(`::${SECURITY_CLIENT}::${SecurityService.name}`);
    constructor(
    @Inject(SECURITY_CLIENT) 
    private readonly client: ClientTCP
    ) {}

  callValidateToken<TResult = any, TInput = any>(
    dto: TInput,
  ): Promise<TResult> {
    this.logger.debug(`execute::callValidateToken::params${JSON.stringify(dto)}`);
    const pattern = { subjet: 'client-security', function: 'validate-token' };
    return this.client.send<TResult, TInput>(pattern, dto).toPromise();
  }
}
