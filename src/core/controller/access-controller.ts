import { NextRequest } from 'next/server';

export class AccessController {
  private RESTRICTED_ROUTES = ['/profile', '/auth', '/admin'];

  hasAccess(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    return this.RESTRICTED_ROUTES.some((route) => pathname.includes(route));
  }
}
