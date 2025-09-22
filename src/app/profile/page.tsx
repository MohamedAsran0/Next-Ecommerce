import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function profile() {

  const session = await getServerSession(authOptions);

  return (
    <>

      <div className="container mx-auto py-20 px-5">
        <h2 className="mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5">
          Profile
        </h2>

        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 text-center">
          <div className="flex flex-col items-center">
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">
              {session?.user?.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="w-full flex gap-6 justify-center mt-10">
          <Link href={'/profile/updatePassword'}>
            <button
              className="cursor-pointer transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-[4px] 
        hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Update Password
            </button>
          </Link>
          <Link href={'/profile/updateData'}>
            <button
              className="cursor-pointer transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-[4px] 
        hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Update Data
            </button>
          </Link>
        </div>
      </div>



    </>
  )
}
