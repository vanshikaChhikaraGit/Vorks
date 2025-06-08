"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import Error from "@/components/ui/Error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { api } from "@/trpc/react";
import { Cross, MapPin, Search, SlidersHorizontal, Timer, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { number } from "zod";

type filters = {
  priceRange: [number, number];
  duration: string | null;
  minRating: number | null;
};

type servicesType = {
  name: string;
  id: string;
  createdAt: Date;
  description: string | null;
  price: string;
  category: string;
  location: string;
  image: string | null;
  reviewStarRating: string | null;
  duration: string;
  providerId: string;
};

const ServicesByCategory = () => {
  const [searchService, setSearchService] = useState("");
  const [services, setServices] = useState<servicesType[]>([]);
  const [filteredServices, setFilteredServices] = useState<servicesType[]>([]);
  const [filters, setFilters] = useState<filters>({
    priceRange: [0, 10000],
    duration: null,
    minRating: null,
  });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("price");

  const params = useParams<{ categoryname: string }>();
  if (!params) {
    return;
  }

  const serviceCategory = params.categoryname
    .charAt(0)
    .toUpperCase()
    .concat(params.categoryname.slice(1));

  const {
    data: servicesByCategory,
    isLoading,
    error,
  } = api.service.getServiceByCategory.useQuery({
    category: serviceCategory,
  });

  useEffect(() => {
    if (servicesByCategory) {
      setServices(servicesByCategory);
      setFilteredServices(servicesByCategory);
    }
  }, [servicesByCategory]);

  const handleServiceSearch = (searchQuery: string) => {
    const results = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredServices(results);
  };

  // Clear all filters
  const clearSearchFilter = () => {
    setSearchService("");
    setFilteredServices(services);
  };

  //filter button 
  const applyFilters = () => {
  const filtered = services.filter(service => {
    // Price filter
    const price = parseFloat(service.price);
    const pricePass = price >= filters.priceRange[0] && 
                      price <= filters.priceRange[1];
    
    // Duration filter
    const durationPass = !filters.duration || 
                        parseInt(service.duration) <= parseInt(filters.duration);
    
    // Rating filter
    const ratingPass = !filters.minRating || 
                      parseFloat(service.reviewStarRating || "0") >= filters.minRating;
    
    return pricePass && durationPass && ratingPass;
  });
  
  setFilteredServices(filtered);
};

  if (isLoading) return <div><Loading></Loading></div>;

  if (error) return <div><Error></Error></div>;

  return (
    <div className="p-2">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="p-2 md:ml-6">
 <h1 className="mb-2 lg:text-3xl md:text-xl text-lg font-bold">{serviceCategory}</h1>
        </div>
       
{/* //search bar  */}
        <div className="w-full md:w-2/4 relative max-w-md">
          <Input
            value={searchService}
            onChange={(e) => {
              setSearchService(e.target.value);
              handleServiceSearch(e.target.value);
            }}
            placeholder={`Search ${serviceCategory} Services`}
            className="pr-10"
          />
          {/* Search icons */}
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 space-x-1">
            {searchService && (
              <Button
                variant="default"
                size="icon"
                onClick={clearSearchFilter}
                className="h-5 w-5 border rounded-full"
              >
                <X size={15}></X>
              </Button>
            )}
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* dialog filter  */}
        <div className="p-2 md:mr-6">
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'}>
              Filter <SlidersHorizontal></SlidersHorizontal>
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl h-[80vh] flex">
    {/* Left Side - Filter Categories */}
    <div className="w-1/4 border-r p-4 space-y-2">
      <Button 
        variant={activeFilterTab === 'price' ? 'secondary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveFilterTab('price')}
      >
        Price
      </Button>
      <Button 
        variant={activeFilterTab === 'duration' ? 'secondary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveFilterTab('duration')}
      >
        Duration
      </Button>
      <Button 
        variant={activeFilterTab === 'rating' ? 'secondary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveFilterTab('rating')}
      >
        Ratings
      </Button>
    </div>

    {/* Right Side - Active Filter Content */}
    <div className="w-3/4 p-4">
      {activeFilterTab === 'price' && (
        <div>
          <h3 className="text-lg font-medium">Price Range</h3>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={filters.priceRange}
            onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
          />
          <div className="flex justify-between mt-2">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      )}

      {activeFilterTab === 'duration' && (
        <div>
          <h3 className="text-lg font-medium">Duration</h3>
          <RadioGroup
            value={filters.duration || ''}
            onValueChange={(value) => setFilters({...filters, duration: value})}
          >
            <div className="flex items-center gap-3">
<RadioGroupItem value="30" id="thirty" ></RadioGroupItem>
<Label htmlFor="thirty" >  {`< 30 Minutes`} </Label>
            </div>
            
            <div className="flex items-center gap-3">
<RadioGroupItem value="60" id="sixty" ></RadioGroupItem>
<Label htmlFor="sixty" >  {`30 - 60 Minutes`} </Label>
            </div>
            
            <div className="flex items-center gap-3">
<RadioGroupItem value="120" id="onetwenty" ></RadioGroupItem>
<Label htmlFor="onetwenty" >  {`1 - 2 hrs`} </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {activeFilterTab === 'rating' && (
        <div>
          <h3 className="text-lg font-medium">Minimum Rating</h3>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={filters.minRating === star ? 'default' : 'outline'}
                onClick={() => setFilters({
                  ...filters,
                  minRating: filters.minRating === star ? null : star
                })}
              >
                {star} ★
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
{/* Footer with Action Buttons */}
    <DialogFooter className="absolute bottom-0 right-0 p-4">
      <Button 
        variant="ghost" 
        onClick={() => {
          setFilters({
            priceRange: [0, 10000],
            duration: null,
            minRating: null
          });
          setFilteredServices(services)
          setIsFilterDialogOpen(false);
        }}
      >
        Remove All
      </Button>
      <Button 
        onClick={() => {
          applyFilters();
          setIsFilterDialogOpen(false);
        }}
      >
        Apply Filters
      </Button>
    </DialogFooter>
    </DialogContent>

        </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices?.map((service) => (
          <div
            key={service.id}
            className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg"
          >
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

              {/* Price & Rating */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold">₹{service.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">
                    {service.reviewStarRating ?? "0"}{" "}
                  </span>
                </div>
              </div>

              {/* Duration & CTA Button */}
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center text-sm font-semibold dark:text-white/80 text-gray-700">
                  <Timer />
                  {service.duration} Minutes
                </span>
                <span className="dark:text-white/80 flex items-center text-sm font-semibold text-gray-700">
                  {" "}
                  <MapPin />
                  {service.location}
                </span>
              </div>
            </div>
            <div className="p-2">
              <Link href={`/service/${service.id}`}>
                <Button className="w-full cursor-pointer">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesByCategory;
