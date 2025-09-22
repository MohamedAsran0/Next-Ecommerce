import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    
    // const jwt = await getToken({req});
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET,cookieName: process.env.COOKIE_NAME });

    if(jwt) {
        console.log('token true entering next page');

        return NextResponse.next();
    }

    // return NextResponse.redirect(`${process.env.MY_DOMAIN}`)
    return NextResponse.redirect(new URL("/", req.url));

}


export const config = {
    // matcher: ['/cart:path*', '/profile:path*', '/allorders', '/wishlist']
    matcher: ['/cart/:path*', '/profile/:path*', '/allorders', '/wishlist']
};

