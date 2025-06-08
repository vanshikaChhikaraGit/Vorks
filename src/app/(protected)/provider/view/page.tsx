'use client'

import { Button } from '@/components/ui/button';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/loading';
import { api } from '@/trpc/react'
import { MapPin, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const ViewServices = () => {
  const [loading,setLoading] = useState(false)
  const { data: servicesFromProvider, isLoading, error } = api.service.view.useQuery();

  if (isLoading) return <div>
    <Loading></Loading>
  </div>;
  if (error) return <div>
    <Error></Error>
  </div>;

  return (
   <div className="dark:bg-black grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {servicesFromProvider?.map((service) => (
        <div key={service.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          {/* Service Image */}
          <div className="relative h-48 w-full">
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${service.image}`}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Service Details */}
          <div className="p-4">
            <h1 className="text-xl font-bold">{service.name}</h1>
            <p className="text-gray-600 mt-2">{service.description}</p>
            
            {/* Price & Rating */}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-lg font-semibold">₹{service.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{service.reviewStarRating ?? '0'} </span>
              </div>
            </div>

            {/* Duration & CTA Button */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold flex items-center"><Timer />{service.duration} Minutes</span>
              <span className="text-sm text-gray-700 font-semibold flex items-center "> <MapPin />{service.location}</span>
            </div>
          </div>
          <Link href={`/service/${service.id}`} className='p-2'>
            <Button disabled={loading} onClick={()=>{
              setLoading(true)
            }} className='w-full '>
              View Details
            </Button>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default ViewServices