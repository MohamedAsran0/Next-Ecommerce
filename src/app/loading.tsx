import React from 'react'
import { HashLoader } from 'react-spinners'

export default function loading() {
  return (
    <>
    <div className='w-full flex justify-center items-center min-h-screen'>
        <HashLoader color="#8f8f8f" size={60} />
    </div>
    </>
  )
}
