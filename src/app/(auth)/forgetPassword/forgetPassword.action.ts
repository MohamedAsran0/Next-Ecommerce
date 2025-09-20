'use server';

import axios from 'axios';


export async function handleForgetPasswordAction(values: {email: string}) {
    
    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
        return 'Reset code sent to your email';
    } catch (error) {
        return 'There is no user registered with this email address';
    }

}

export async function handleVerifyCodeAction(values: {resetCode: string}) {
    
    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
        return 'Please change your password to a new one';
    } catch (error) {
        return 'Reset code is invalid or has expired';
    }

}

export async function handleResetPasswordAction(values: { email: string, newPassword: string }) {
    
    try {
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
        return 'success';
    } catch (error) {
        return 'Reset code not verified, Please Try Again';
    }

}