import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatorRequest } from './types';

// User Geter Decorator
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenticatorRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);
