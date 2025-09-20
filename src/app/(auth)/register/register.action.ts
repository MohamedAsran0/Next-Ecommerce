'use server';

import { type RegisterUserType } from '@/types/user.type';
import axios from 'axios';


export async function handleRegisterAction(values: RegisterUserType) {

    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        return 'success';
    } catch (error: { message: string }) {
        return error.message;
    }

}
