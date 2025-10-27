import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user?.role === 'USUARIO';
  }
}