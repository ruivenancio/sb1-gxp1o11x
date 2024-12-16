import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/accounts/:path*',
    '/investments/:path*',
    '/cards/:path*',
    '/transfers/:path*',
    '/reports/:path*',
    '/api/accounts/:path*',
    '/api/investments/:path*',
    '/api/transactions/:path*',
    '/api/stock-holdings/:path*',
    '/api/stock-trades/:path*',
  ],
};