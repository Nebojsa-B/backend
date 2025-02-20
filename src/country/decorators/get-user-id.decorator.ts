import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const CookieValue = createParamDecorator(
//   (cookieName: string, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const userId = request.cookies[cookieName]; // Adjust this if your cookie has a different name
//     return userId;
//   },
// );