import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() : Promise<string> {
    const cookie = await cookies();

    const sessionToken = cookie.get('next-auth.session-token')?.value;

    const decodedToken = await decode({ token: sessionToken, secret: process.env.NEXTAUTH_SECRET! });

    return decodedToken?.tkn as string;

}
