"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { CheckCircle, MapPin, Shield, Star, Timer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StarRating from "./starRating";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/Error";

type providerSchema = {
  name: string;
  id: string;
  createdAt: Date;
  userId: string;
  description: string | null;
};

const ServicePage = () => {
  const { cart,addToCart } = useCart()
    const [comment,setComment] = useState('')
    const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const { serviceId } = useParams<{ serviceId: string }>();
  const [provider, setProvider] = useState<providerSchema>();
  const {
    data: { service, comments } = {},
    isLoading,
    isError,
    refetch
  } = api.service.getServiceById.useQuery({
    serviceId: serviceId,
  });

  const providerQuery = api.provider.getProviderById.useQuery(
    {
      providerId: service?.providerId!,
    },
    {
      enabled: !!service?.providerId, // Only fetch if providerId exists
    },
  );

  const feedbackMutation = api.service.addReviewByUser.useMutation({
    onSuccess:()=>{
      toast.success('Feedback Submitted!')
    },
    onError:()=>{
      toast.error('Couldn\'t register feedback.')
    }
  })

  useEffect(() => {
    if (providerQuery.data) {
      setProvider(providerQuery.data);
    }
  }, [providerQuery.data]);

  const handleAddToCart = ()=>{
    if(!service)return;

    addToCart({
      id:service.id,
      name: service.name,
      price: service.price.toString(),
      quantity: 1,
      duration: service.duration || 'N/A'
    })
  }

  const submitFeedback = ()=>{
try {
  feedbackMutation.mutateAsync({
    serviceId,
    comment,
    rating
  })
  setComment('')
  setRating(0)
  refetch()
} catch (error) {
  console.log("error while submitting the comment",error)
}
  }

  if (isLoading)
    return <div ><Loading></Loading></div>;
  if (isError)
    return (
      <div >
        <Error></Error>
      </div>
    );
  if (!service)
    return <div className="flex justify-center py-20">Service not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb/Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{service.name}</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${service.image}`}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            {/* title  */}
            <h2 className="text-3xl font-bold">{service.name}</h2>
            <div className="mt-2 flex-col"> 
                {/* star rating  */}
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < parseInt(service.reviewStarRating ?? "0")
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
             <span className="ml-1">{service.reviewStarRating ?? "0.0"} ratings</span>   
              </div>
{/* review count  */}
              <div className="ml-2 text-sm text-gray-600">
                {service.reviewCount || "0"} reviews
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">₹{service.price}</span>
              {service.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{service.price}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700">
              {service.description || "No description available"}
            </p>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-gray-500" />
            <span>{service.duration} Minutes</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span>{service.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4">
            <Button onClick={handleAddToCart} className="w-full py-6 text-lg font-medium">
              Add To Cart
            </Button>
          </div>

          {/* Highlights/Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Verified Provider</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Secure Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-16 border-t pt-8">
        <h3 className="font-bold text-lg md:text-xl lg:text-2xl">Service Details</h3>
        <p className="mt-4 text-gray-700">
          {service.description || "Detailed service information not available."}
        </p>
      </div>

      {/* Provider Information */}
      {provider && (
        <div className="mt-12 border-t pt-8">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">About the Provider</h3>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 font-bold">
              {provider.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h4 className="font-medium">{provider.name}</h4>
            </div>
          </div>
        </div>
      )}

      {/* review and comment section  */}
      <div className="border-t pt-8 mt-12">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Reviews & Comments</h1>
        {/* add star review  */}
        <div className=" flex flex-col md:flex md:items-center md:justify-between md:flex-row">
          <h2 className="font-semibold text-lg mt-6">Rate this service</h2>
           <div className="flex ">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <span
            className={
              star <= (hover || rating)
                ? 'text-yellow-500'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
    <div>
 <Button variant={'destructive'} className="cursor-pointer" onClick={submitFeedback}>Add Feedback</Button>
    </div>
   
        </div>
        {/* add comment  */}
        <div>
            <h2 className="font-semibold text-lg mt-2">Add a comment</h2>
            <Input
            className="mt-2"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder="Your comment..."></Input>
        </div>

        {/* comments from other users  */}
        <div className="mt-12">
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
                What others say
            </h2>
            <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        {comments?.length ? (
          comments?.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="font-medium">{review.user.name}</div>
                <div className="ml-2 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < parseInt(review.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
              {review.content && (
                <p className="mt-2 text-gray-700">{review.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
            
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
