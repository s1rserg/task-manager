import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AppRoute } from './libs/common/app/app';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const redirectUrl = new URL(AppRoute.SIGN_IN, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
