'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useCart } from '@/context/cart'
import { ModeToggle } from '../ui/mode-toggle'

const DefaultNavbar = () => {
    const {cart} = useCart()
  return (
    <div className='flex justify-between items-center p-4'>
        {/* logo and name  */}
        <div>
            <Image src="/logo_vorks.png" alt="Logo" width={50} height={50} className="inline-block mr-2" />
        <Link href={'/'} className='text-xl font-bold'>Vorks</Link>
        </div>

        <div className='flex items-center gap-4'>
 {/* cart  */}
 <div>
    <ModeToggle></ModeToggle>
 </div>
        <div>
            <Button className=''>
                <Link href="/cart" className='flex items-center gap-2'>
                    <ShoppingCart />
                    <span className='bg-white text-black rounded-full px-2 p-1 text-xs'>
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                </Link>
            </Button>
        </div>
        {/* checout button if cart is not empty  */}
        {cart.length > 0 && (
            <Link href="/checkout">
                <Button className='flex items-center gap-2'>
                    Checkout
                    <span className='bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                </Button>
            </Link>
        )}
        {/* //logout  */}
        <div>
            <Button>
                Logout
            </Button>
        </div>
        </div>
       
    </div>
  )
}

export default DefaultNavbar