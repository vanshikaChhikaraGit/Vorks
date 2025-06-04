import HeroSection from '@/components/herosection/hero'
import Navbar from '@/components/navbar/navbar'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='bg-[#EBEDE8] min-h-screen'>
      {/* navbar */}
      <section id='navbar' className='p-4'>
      <Navbar></Navbar>
      </section>
      {/* hero section */}
      <section id='hero' className='h-[500px] bg-white flex items-center justify-center'>
        <HeroSection></HeroSection>
        </section>
      {/* our offerings */}
      {/* carousel */}
      {/* reviews */}
      {/* contact us */}
      <section id='contact'>
contact
      </section>
    </div>
  )
}

export default LandingPage