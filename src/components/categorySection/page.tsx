import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { categories } from '@/constant'
import Link from 'next/link'

const Category = () => {
  return (
    <div className='p-4 pt-8 '>
        <div className='md:flex md:flex-row md:items-center md:justify-between flex-col mb-4'>
            <h1 className='dark:text-white font-bold text-xl md:text-2xl lg:text-4xl text-[#004838] '>
            Select Category
        </h1>
        <h2 className='text-sm md:text-base lg:text-lg text-gray-500'>
            Uncover the perfect match in every category ✨
        </h2>
        </div>
  <div className="relative w-full max-w-7xl mx-auto">
 <Carousel opts={{ align: "start" }} className="w-full">
  <CarouselContent>
    {categories.map((category) => (
      <CarouselItem
        key={category.id}
        className="shrink-0  basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
      >
        <div className="p-1">
          <Link 
            href={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
            passHref
            className="block p-2 cursor-pointer group relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-10 hover:duration-200"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10" />
            
            {/* Content */}
            <div className="relative h-full w-full flex items-end justify-center p-4">
              <span className="text-md md:text-lg lg:text-2xl font-bold text-white text-center transform transition-all duration-300 group-hover:translate-y-0 group-hover:scale-110">
                {category.name}
              </span>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </Link>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#004838] hover:cursor-pointer text-white" />
  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#004838] hover:cursor-pointer text-white" />
</Carousel>
</div>

    </div>
  )
}

export default Category