'use server';

import { type RegisterUserType } from '@/types/auth/userType';
import axios from './../../../../node_modules/axios/lib/axios';


export async function handleRegisterAction(values: RegisterUserType) {
    
    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        return 'success';
    } catch (error) {
        return error.message;
    }

}
