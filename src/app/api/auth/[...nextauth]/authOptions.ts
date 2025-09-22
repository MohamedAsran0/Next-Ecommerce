import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: '/login',
    },

    providers: [
        Credentials({
            name: 'Fresh Cart',

            async authorize(credentials, req) {
                try {
                    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', credentials);
                    const decoded: { id: string } = jwtDecode(res.data.token);
                    return {
                        id: decoded.id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        tkn: res.data.token
                    };
                } catch (error) {
                    return null;
                }
            },

            credentials: {
                email: {},
                password: {}
            },

        })
    ],

    callbacks: {
        jwt(params) {
            if (params.user) {
                params.token.userId = params.user.id;
                params.token.tkn = params.user.tkn;
            }
            return params.token;
        },

        session(params) {
            params.session.user.id = params.token.userId as string;
            return params.session;
        },
    },

    session: {
        maxAge: 60 * 60 * 24 * 14,
    }


}