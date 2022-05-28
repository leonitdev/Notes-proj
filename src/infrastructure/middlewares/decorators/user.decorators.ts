import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Identity = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.identity;
    return data ? user?.data : user;
  },
);
