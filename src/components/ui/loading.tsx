import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div>
            <Image
            src={'/loading.png'}
            alt='loading'
            width={300}
            height={300}></Image>
            <h1 className='text-xl text-center font-bold'>Just a moment</h1>
        </div>
    </div>
  )
}

export default Loading