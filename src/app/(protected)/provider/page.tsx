import Image from 'next/image'
import React from 'react'

const ProviderDashBoard = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div>
 <Image
        src={'/welcome.png'}
        alt='welcome'
        width={300}
        height={300}
        className='border rounded-lg'></Image>
        <h1 className='text-center text-xl font-bold mt-4'>Welcome</h1>
        <h2 className='text-center text-md font-gray-600 mt-2'>Get started by creating a new service!</h2>
      </div>
    </div>
  )
}

export default ProviderDashBoard