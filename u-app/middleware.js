import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('razvanricu'); // Use TextEncoder to convert the secret into a buffer

const protectedRoutes = [];
const publicRoutes = ['/register', '/', '/home', '/adminDashboard'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  let token;
  let session = null;
  let payloadUser = null;


  try {
    // Fetch cookies using await since it's a Promise
    const cookieStore = await cookies();
    token = cookieStore.get('token')?.value;
    // console.log('Token found:', token);
  } catch (error) {
    console.error('Error accessing cookies:', error.message);
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Redirect to login if token is missing on a protected route
  if (!token && isProtectedRoute) {
    console.warn('No token found for protected route, redirecting...');
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (token) {
    try {
      // Verify JWT with jose library
      const payload  = await jwtVerify(token, SECRET_KEY);
      session = payload; // Assign payload to session
      payloadUser =  session.payload
      //console.log('Token verified:', session);
    } catch (error) {
      console.error('Error verifying JWT:', error.message);
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }
  // console.log(session)

  try {
    if(req.nextUrl.pathname.startsWith('/logout') && payloadUser?.user.role){
        const response = NextResponse.redirect(new URL('/', req.nextUrl))
        response.cookies.set("token", "",
          {
            expires: new Date(0),
            path:'/',
            sameSite:'lax'
          }
        )
        console.log("Response cookies:", response.cookies.getAll());
        return response;
    }

    if (isProtectedRoute && !payloadUser?.user) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Redirect users based on their role
    if (isPublicRoute && payloadUser?.user.role === "Student" && !req.nextUrl.pathname.startsWith('/home')) {
      return NextResponse.redirect(new URL('/home', req.nextUrl));
    }

    if (isPublicRoute && payloadUser?.user.role === "Admin" && !req.nextUrl.pathname.startsWith('/adminDashboard')) {
      return NextResponse.redirect(new URL('/adminDashboard', req.nextUrl));
    }

    if (req.nextUrl.pathname.startsWith('/adminDashboard') && payloadUser?.user.role === "Student") {
      return NextResponse.redirect(new URL('/home', req.nextUrl));
    }

    if (req.nextUrl.pathname.startsWith('/home') && payloadUser?.user.role === "Admin") {
      return NextResponse.redirect(new URL('/adminDashboard', req.nextUrl));
    }

    if ((req.nextUrl.pathname.startsWith('/adminDashboard') && payloadUser?.user.role === "Admin")
       || (req.nextUrl.pathname.startsWith('/home') && payloadUser?.user.role === "Student")) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error('Error during route handling:', error.message);
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // Exclude API and static assets
};
