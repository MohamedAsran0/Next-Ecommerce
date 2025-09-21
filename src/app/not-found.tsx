import errorImage from '@images/error.svg'
import Image from 'next/image';

export default function notFound() {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-6 py-20'>
        <Image src={errorImage} alt='Error Image'/>
        <h1 className='text-4xl font-bold text-green-500 '>Oops!! Error Happened</h1>
    </div>
  )
}
