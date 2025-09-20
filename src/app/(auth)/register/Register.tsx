'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { type RegisterUserType } from '@/types/user.type';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { handleRegisterAction } from './register.action';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';


const zodSchema = z.object({
    name: z.string().min(3, 'Minimum number of characters is 3').max(30, 'Maximum number of characters is 30'),
    email: z.string().email('Must be a valid mail'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    rePassword: z.string().min(1, 'rePassword is required'),
    phone: z.string().regex(/^(?:\+20|0)?(10|11|12|15)\d{8}$/, 'accept only egypt phone numbers'),
}).refine((obj) => obj.password === obj.rePassword, {
    error: 'rePassword must be the same as password',
    path: ["rePassword"],
});

export default function Register() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(zodSchema),
        mode: 'all',
    });

    async function myHandleSubmit(values: RegisterUserType) {
        setIsLoading(true);

        const res = await handleRegisterAction(values);

        if (res === 'success') {
            Swal.fire({
                title: "Congratulations",
                text: "Account Created",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsLoading(false);
                setTimeout(() => {
                    router.push('/login');
                }, 500);
            })
        }
        else {
            Swal.fire({
                title: 'Failed',
                text: "Couldn't Create Account, Try another Email",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        setIsLoading(false);
    }

    return (
        <>

            <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
                <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Register</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(myHandleSubmit)}>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Username' type='text'  {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>

                                <div className='mt-4'>
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
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Phone Number' type='tel' {...field} />
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
                                    <FormField
                                        control={form.control}
                                        name="rePassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Confirm Password' type='password' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>



                                <div className='mt-4'>
                                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>
                                        {isLoading ? <ClipLoader /> : 'Sign up'}
                                    </Button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className='text-sm font-medium text-gray-700'>Have account already ? <Link href='/login' className='text-blue-600 underline hover:no-underline'>Sign in</Link></p>
                                </div>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>








        </>
    )
}
