'use client'
import Image from 'next/image'
import React from 'react'
import GetLocation from '../location/page'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const HomePageHeroSection = () => {
    const [service, setService] = React.useState<string>('')
  return (
    <div>
        <div className="relative rounded-3xl overflow-hidden bg-cover bg-center h-[500px] p-4 mt-0" style={{ backgroundImage: "url('/background.jpg')" }}>
  <div className="absolute inset-0 bg-white/50 backdrop-blur-none flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">Our Services</h1>
    <p className="font-normal text-sm">Trusted Experts for Home Services — Anytime, Anywhere</p>
    <div className="mt-4 flex gap-1 text-xl">❤️ 👍 🔥 💙 ⭐</div>
    <p className="text-gray-500 text-sm">Loved from 500k+ users</p>
  
    <div className='flex items-center border border-none rounded-lg bg-white border-[#004838] m-4 p-4 justify-between'>
    <div>
       <GetLocation></GetLocation>
    </div>
    <div>
        <Input type='text' placeholder='Search for services...' className='m-2' value={service} onChange={(e)=>setService(e.target.value)}></Input>
    </div>
    <div className='ml-4'>
        <button className='bg-black p-2 rounded-full border hover:cursor-pointer '>
            <Search size={15} className='text-white font-bold' />
        </button>
    </div>
  </div>
  </div>

  
</div>

    </div>
  )
}

export default HomePageHeroSection