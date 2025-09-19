import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from './../../../../../node_modules/axios/lib/axios';

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: '/login',
    },

    providers: [
        Credentials({
            name: 'Fresh Cart',

            async authorize(credentials, req) {
                try {
                    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',credentials);
                    return res;                    
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

    // jwt: {
    //     decode(params) {
            
    //     },
    // },


    // session: {
        
    // }


}