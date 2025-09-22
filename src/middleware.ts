import { getServerSession } from "next-auth";
// import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/authOptions";

export default async function middleware(req: NextRequest) {

    // const jwt = await getToken({req});
    // const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET,cookieName: process.env.COOKIE_NAME });
    console.log('entered middleware');

    const session = await getServerSession(authOptions);
    console.log('got session');

    // if(jwt) {

    //     return NextResponse.next();
    // }

    if (session) {
        console.log('session true entering next page');

        return NextResponse.next();

    }

    console.log('session false redirecting');

    // return NextResponse.redirect(`${process.env.MY_DOMAIN}`)
    return NextResponse.redirect(new URL("/", req.url));

}


export const config = {
    // matcher: ['/cart:path*', '/profile:path*', '/allorders', '/wishlist']
    matcher: ['/cart/:path*', '/profile/:path*', '/allorders', '/wishlist']
};

