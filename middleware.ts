import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BACKEND_API_URI } from './constants';

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("bushidoToken")?.value;

  if (!token) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${BACKEND_API_URI}/auth/profile`, {
    method: 'GET',
    headers: myHeaders
  })

  if (response.status !== 200) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/favorites', '/movies/:id*'],
}
