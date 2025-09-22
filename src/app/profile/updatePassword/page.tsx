'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { updatePasswordAction } from '../profile.action';
import { signOut } from 'next-auth/react';

const zodSchema = z.object({
    currentPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    rePassword: z.string().min(1, 'rePassword is required'),
}).refine((obj) => obj.password === obj.rePassword, {
    error: 'rePassword must be the same as password',
    path: ["rePassword"],
});

export default function UpdatePassword() {

    const [isLoading, setIsLoading] = useState(false);


    const form = useForm({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(zodSchema),
        mode: 'all',
    });

    async function myHandleUpdatePassword(values: {
        currentPassword: string,
        password: string,
        rePassword: string
    }) {

        setIsLoading(true);

        const res = await updatePasswordAction(values);

        if (res == "Password Updated Successfully") {
            Swal.fire({
                title: "Password Updated Successfully",
                text: "Please Login with the new Password",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsLoading(false);
                setTimeout(() => {
                    signOut({ redirect: true, callbackUrl: '/login' });
                }, 100);
            })
        }
        else {
            Swal.fire({
                title: 'Failed',
                text: "Unable to change password",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        setIsLoading(false);
    }

    return (
        <>

            <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
                <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Update Password</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(myHandleUpdatePassword)}>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter your current password' type='password'  {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>



                                <div className='mt-4'>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter new password' type='password' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>


                                <div className='mt-4'>
                                    <FormField
                                        control={form.control}
                                        name="rePassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Re-Enter new password' type='password' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>




                                <div className='mt-4'>
                                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>
                                        {isLoading ? <ClipLoader /> : 'Update Password'}
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
