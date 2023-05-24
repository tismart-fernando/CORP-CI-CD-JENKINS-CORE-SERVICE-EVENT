import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../client/core-service-security/security.service';
import { CryptoService } from '../crypto/crypto.service';
import { KEYS } from 'src/const/keys.const';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
    private readonly cryptoService: CryptoService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[2];
    try {
        const decryptToken = await this.cryptoService.decrypt(token);
        this.jwtService.verifyAsync(decryptToken, { secret: KEYS.jwt_secret });
        const validateToken = await this.securityService.callValidateToken({ decryptToken });
        if(!validateToken) {
          throw new UnauthorizedException();
        }
        request.userSession = {
          email: 'fernando.zavaleta@tismart.com',
          idUser: '643a10961b7ea6c4fcaaeeee'
        }
      return true;
    } catch (error) {
      return false;
    }
  }
}