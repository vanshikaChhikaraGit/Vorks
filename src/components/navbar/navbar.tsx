'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../ui/mode-toggle';
const Navbar = () => {
    const [servicesDropdown, setServicesDropdown] = React.useState(false);
    
    return (
    <div className='p-4 flex items-center justify-between dark:text-white'>
        {/* logo and name  */}
        <div>
            <Image src="/logo_vorks.png" alt="Logo" width={50} height={50} className="inline-block mr-2" />
        <Link href={'/'} className='text-xl font-bold dark:text-white' >Vorks</Link>
        </div>

        {/* services dropdown  */}
        <div className='relative inline-block'>
            <Button variant={'outline'} onClick={() => setServicesDropdown(!servicesDropdown)} className='text-gray-800 bg-[#EBEDE8] dark:text-white hover:text-green-600 cursor-pointer'>
                Services <ChevronDown />
            </Button>
            {servicesDropdown && (
                <div className='absolute z-10 shadow-md'>
                    <ul className='border-2 rounded-md'>
                        <li className='m-1 p-1 text-sm border-b-1 hover:text-green-600'>Repair</li>
                        <li className='m-1 p-1 text-sm border-b-1 hover:text-green-600'>Carpentry</li>
                        <li className='m-1 p-1 text-sm border-b-1 hover:text-green-600'>Laundry</li>
                        <li className='m-1 p-1 text-sm border-b-1 hover:text-green-600'>Gardening</li>
                     <Link href={'/services'}> 
                    <span className='flex items-center justify-center p-1 hover:-translate-y-1 text-sm border-b-1 hover:text-green-600'>More <ArrowRight size={12} /></span></Link>
                    </ul>
                   
                </div>
            )}
        </div>

        <ModeToggle></ModeToggle>

        {/* about us  */}
        <Link href={'/about'} className='text-gray-700 dark:text-white hover:text-green-600 transition ml-4'>
            About Us
        </Link>

        {/* contact us button  */}
        <Link href='#contact' className='dark:text-white text-gray-700 hover:text-green-600 transition ml-4'>
            Contact Us
        </Link>

    </div>
  )
}

export default Navbar