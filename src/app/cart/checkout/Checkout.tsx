'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { type CheckoutUserType } from '@/types/user.type';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { useParams, useRouter } from 'next/navigation';
import { cashPaymentAction, creditPaymentAction } from './checkout.action';

const zodSchema = z.object({
    details: z.string().min(1, 'must enter details').max(100, 'maximum characters is 100'),
    phone: z.string().regex(/^(?:\+20|0)?(10|11|12|15)\d{8}$/, 'accept only egypt phone numbers'),
    city: z.string().min(3, 'city is required'),
});

export default function Checkout() {

    const { id } = useParams();

    const router = useRouter();

    const [isCashLoading, setIsCashLoading] = useState(false);
    const [isCreditLoading, setIsCreditLoading] = useState(false);


    const form = useForm({
        defaultValues: {
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(zodSchema),
        mode: 'all',
    });

    async function myHandlePayment(values: CheckoutUserType, paymentType: string) {

        if (paymentType == 'cash') {
            cashPayment(values);
        }
        else {
            console.log('enter credit');
            
            creditPayment(values);
        }
    }

    async function cashPayment(values: CheckoutUserType) {
        setIsCashLoading(true);

        const res = await cashPaymentAction(values, id as string);

        if (res == 'success') {
            Swal.fire({
                title: "Successful Payment",
                text: "Enjoy your time",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsCashLoading(false);
                setTimeout(() => {
                    router.push('/');
                }, 200);
            })
        }
        else {
            Swal.fire({
                title: 'Failed to pay',
                text: "Try agin later",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        setIsCashLoading(false);
    }


    async function creditPayment(values: CheckoutUserType) {
        setIsCreditLoading(true);

        const res = await creditPaymentAction(values, id as string);

        if (res == 'failed') {
            Swal.fire({
                title: 'Failed to pay',
                text: "Try agin later",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        else {
            Swal.fire({
                title: "Payment in progress",
                text: "Redirecting to the payment page",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setIsCreditLoading(false);
                setTimeout(() => {
                    router.push(res);
                }, 200);
            })
        }
        setIsCreditLoading(false);
    }




    return (
        <>

            <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
                <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Checkout</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                        <Form {...form}>
                            <form>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="details"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Details</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter some details' type='text'  {...field} />
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
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter your phone number' type='tel' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>


                                <div className='mt-4'>
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter your city' type='text' {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>

                                <div className='mt-4 flex  gap-8 w-full'>
                                    <Button onClick={() => form.handleSubmit((value) => myHandlePayment(value, 'cash'))()} className="group relative flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type='button'>
                                        {isCashLoading ? <ClipLoader /> : 'Pay in Cash'}
                                    </Button>
                                    <Button onClick={() => form.handleSubmit((value) => myHandlePayment(value, 'credit'))()} className="group relative flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type='button'>
                                        {isCreditLoading ? <ClipLoader /> : 'Pay with Credit'}
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
