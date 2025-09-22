'use server';

import { getUserToken } from "@/utils/token.utils";
import axios from "axios";

export async function updatePasswordAction(values: {
    currentPassword: string,
    password: string,
    rePassword: string
}) {
    const token = await getUserToken();

    try {
        await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {
            headers: {
                token: token,
            }
        });

        return "Password Updated Successfully"
    } catch (error) {
        return error;
    }


}



export async function updateDataAction(values: {
    name: string,
    email: string,
    phone: string
}) {
    const token = await getUserToken();

    try {
        await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
            headers: {
                token: token,
            }
        });

        return "Data Updated Successfully"
    } catch (error) {
        return error;
    }


}