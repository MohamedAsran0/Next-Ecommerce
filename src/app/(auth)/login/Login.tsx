'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { type LoginUserType } from '@/types/auth/userType';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { signIn } from 'next-auth/react'

const zodSchema = z.object({
    email: z.string().email('Must be a valid mail'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(zodSchema),
        mode: 'all',
    });

    async function myHandleLogin(values: LoginUserType) {

        setIsLoading(true);

        const res = await signIn('credentials', { ...values, redirect: false });

        if (res?.ok) {
            Swal.fire({
                title: "Welcome Back",
                text: "Enjoy your time",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsLoading(false);
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            })
        }
        else {
            Swal.fire({
                title: 'Failed',
                text: "Email or password is incorrect",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        setIsLoading(false);
    }

    return (
        <>

            <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
                <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Login</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(myHandleLogin)}>

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
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Password' type='password' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>




                                <div className='mt-4'>
                                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>
                                        {isLoading ? <ClipLoader /> : 'Sign In'}
                                    </Button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className='text-sm font-medium text-gray-700'><Link href={'/forgetPassword'} className='text-blue-600 underline hover:no-underline'>Forgotten password?</Link></p>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className='text-sm font-medium text-gray-700'>Do not have an account ? <Link href={'/register'} className='text-blue-600 underline hover:no-underline'>Sign Up</Link></p>
                                </div>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    )
}
