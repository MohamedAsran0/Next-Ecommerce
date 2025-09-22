import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    
    console.log('entered middleware');
    // const jwt = await getToken({req});
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET,cookieName: process.env.COOKIE_NAME });

    console.log('got token',jwt);

    if(jwt) {
        console.log('token true entering next page');

        return NextResponse.next();
    }


    console.log('token false redirecting');

    // return NextResponse.redirect(`${process.env.MY_DOMAIN}`)
    return NextResponse.redirect(new URL("/", req.url));

}


export const config = {
    // matcher: ['/cart:path*', '/profile:path*', '/allorders', '/wishlist']
    matcher: ['/cart/:path*', '/profile/:path*', '/allorders', '/wishlist']
};

