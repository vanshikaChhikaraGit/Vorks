'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const DeleteServices = () => {
    const router = useRouter()
    const utils = api.useUtils();

    const { data: servicesFromProvider, isLoading, error } = api.service.view.useQuery();
    const deleteServiceServerCall = api.service.delete.useMutation({
            onSuccess:()=>{
               toast.success("Deleted Successfully 🎉")
            router.refresh()  
            void utils.service.view.invalidate();
            },
            onError:()=>{
 toast.error("Couldn't delete service 😔")
            }
        }
        )
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
  const handleDelete = async({serviceId}:{serviceId:string})=>{
    try {
        console.log('delete triggered')
        await deleteServiceServerCall.mutateAsync({
            serviceId:serviceId
        })

    } catch (error) {
        console.log(error)
    }
  }
            return (<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
                          <span className="text-sm text-gray-500">・{service.duration} Minutes</span>
                          <Button variant={'destructive'} onClick={()=>handleDelete({serviceId:service.id})}  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>)
       
  
}

export default DeleteServices