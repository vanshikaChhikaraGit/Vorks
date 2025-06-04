import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'

const Category = () => {
  return (
    <div className='p-4 pt-8 '>
        <div className='md:flex md:flex-row md:items-center md:justify-between flex-col mb-4'>
            <h1 className='font-bold text-xl md:text-2xl lg:text-4xl text-[#004838] '>
            Select Category
        </h1>
        <h2 className='text-sm md:text-base lg:text-lg text-gray-500'>
            Uncover the perfect match in every category ✨
        </h2>
        </div>
  <div className="relative w-full max-w-7xl mx-auto">
  <Carousel
    opts={{ align: "start" }}
    className="w-full"
  >
    <CarouselContent>
      {Array.from({ length: 12 }).map((_, index) => (
        <CarouselItem
          key={index}
          className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
        >
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Make arrows absolutely positioned and visible */}
    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#004838] hover:cursor-pointer text-white" />
    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#004838] hover:cursor-pointer text-white" />
  </Carousel>
</div>

    </div>
  )
}

export default Category