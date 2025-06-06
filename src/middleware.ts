// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   console.log('Middleware running on:', request.nextUrl.pathname);
//   console.log('Token exists?', !!token); // Check if token exists

//   if (!token) {
//     console.log('No token found, redirecting to /login');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
//     console.log('Decoded JWT:', decoded);

//     const response = NextResponse.next();
//     response.cookies.set('userId', decoded.userId);
//     return response;
//   } catch (err) {
//     console.error('JWT Error:', err);
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/home/:path*', '/provider/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Replaces jsonwebtoken

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log('Middleware running on:', request.nextUrl.pathname);
  console.log('Token exists?', !!token);

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Encode the JWT secret to Uint8Array (required by jose)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    // Verify the JWT using jose
    const { payload } = await jwtVerify(token, secret);
    console.log('Decoded JWT:', payload);

    // Add userId to cookies (if needed)
    const response = NextResponse.next();
    if (payload.userId) {
      response.cookies.set('userId', payload.userId as string);
    }
    return response;
  } catch (err) {
    console.error('JWT Error:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/home/:path*', '/provider/:path*'],
};