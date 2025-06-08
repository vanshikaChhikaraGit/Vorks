"use client";

import { api } from "@/trpc/react";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart";
import { Button } from "../ui/button";

type serviceSchema = {
    name: string,
    id: string,
    createdAt: Date,
    description: string | null,
    price: string,
    category: string,
    location: string,
    image: string | null,
    reviewStarRating: string | null,
    reviewCount: string | null,
    duration: string,
    providerId: string,
}

const AllServices = () => {
    const { addToCart } = useCart()
  const { data: services, isLoading, isError } = api.service.getAllServices.useQuery();

  const handleAddToCart = (service:serviceSchema)=>{
    if(!service)return;

    addToCart({
      id:service.id,
      name: service.name,
      price: service.price.toString(),
      quantity: 1,
      duration: service.duration || 'N/A'
    })
  }

  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  const allCategories = [...new Set(services?.map((service) => service.category))];

  return (
    <div className="space-y-12 p-4">
      {/* Popular Services */}
      

      {/* All Categories */}
      {allCategories.map((category) => {
        const categoryServices = services?.filter((s) => s.category === category);
        return (
          categoryServices &&
          categoryServices.length > 0 && (
            <section key={category} className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">{category}</h2>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {categoryServices.map((service) => (
                    <CarouselItem
                      key={service.id}
                      className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="p-2">
                        <Link href={`/service/${service.id}`}>
                        <div className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md transition-all hover:shadow-lg">
                          {/* Image Container */}
                          <div className="relative h-48 w-full">
                            <Image
                              src={service.image ? 
                                `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${service.image}` : 
                                '/placeholder-image.jpg'}
                              alt={service.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          {/* Content Container */}
                          <div className="flex flex-1 flex-col p-4">
                            <h3 className="text-lg font-bold">{service.name}</h3>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="mt-auto pt-4">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">₹{service.price}</span>
                                <div className="flex items-center">
                                  <span className="text-yellow-500">★</span>
                                  <span className="ml-1 text-sm">
                                    {service.reviewStarRating ?? "0"}
                                  </span>
                                </div>
                                <div>
                                    <div className="pt-4">
                                                <Button onClick={()=>handleAddToCart(service)} className=" cursor-pointer w-full py-6 text-lg font-medium">
                                                  Add To Cart
                                                </Button>
                                              </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-[#004838] text-white" />
                <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-[#004838] text-white" />
              </Carousel>
            </section>
          )
        );
      })}
    </div>
  );
};

export default AllServices;