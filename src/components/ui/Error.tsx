import Image from 'next/image'
import React from 'react'

const Error = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div>
            <Image
            src={'/error.png'}
            alt='loading'
            width={300}
            height={300}></Image>
            <h1 className='text-xl text-center font-bold'>Oops an error occurred.</h1>
        </div>
    </div>
  )
}

export default Error