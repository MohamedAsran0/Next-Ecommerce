'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { handleForgetPasswordAction } from './forgetPassword.action';
import { useRouter } from 'next/navigation';


const zodSchema = z.object({
    email: z.string().email('Must be a valid mail')
});


export default function ForgetPassword() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(zodSchema),
        mode: 'all',
    });

    async function myHandleForgetPassword(values: { email: string }) {

        setIsLoading(true);

        const res = await handleForgetPasswordAction(values);

        if (res === 'Reset code sent to your email') {
            Swal.fire({
                title: "Successful",
                text: res,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsLoading(false);
                setTimeout(() => {
                    router.push('/forgetPassword/verifyCode');
                }, 300);
            })
        }
        else {
            Swal.fire({
                title: 'Failed',
                text: res,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        setIsLoading(false);
    }

    return (
        <>

            <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
                <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Forget Password</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(myHandleForgetPassword)}>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Email' type='email'  {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>


                                <div className='mt-4'>
                                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>
                                        {isLoading ? <ClipLoader /> : 'Send Verification Code'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    )
}
