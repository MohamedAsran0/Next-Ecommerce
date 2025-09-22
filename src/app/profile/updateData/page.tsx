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
import { updateDataAction } from '../profile.action';
import { signOut } from 'next-auth/react';

const zodSchema = z.object({
  name: z.string().min(3, 'Minimum number of characters is 3').max(30, 'Maximum number of characters is 30'),
  email: z.string().email('Must be a valid mail'),
  phone: z.string().regex(/^(?:\+20|0)?(10|11|12|15)\d{8}$/, 'accept only egypt phone numbers'),
});

export default function UpdateData() {

  const [isLoading, setIsLoading] = useState(false);


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
    resolver: zodResolver(zodSchema),
    mode: 'all',
  });

  async function myHandleUpdatePassword(values: {
    name: string,
    email: string,
    phone: string
  }) {

    setIsLoading(true);

    const res = await updateDataAction(values);

    if (res == "Data Updated Successfully") {
      Swal.fire({
        title: "Data Updated Successfully",
        text: "Please Login with the new Data",
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
        text: "Unable to modify data. Try to change email",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
    setIsLoading(false);
  }

  return (
    <>

      <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mx-10 ">
        <h2 className='text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Update Data</h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(myHandleUpdatePassword)}>

                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter username' type='text'  {...field} />
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
                          <Input placeholder='Enter email' type='email'  {...field} />
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
                          <Input placeholder='Enter phone Number' type='tel' {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>




                <div className='mt-4'>
                  <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>
                    {isLoading ? <ClipLoader /> : 'Update Data'}
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
