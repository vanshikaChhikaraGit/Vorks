'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import GetLocation from '../location/page'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { api } from '@/trpc/react'
import type { Service } from '@prisma/client'
import Link from 'next/link'
import Error from '../ui/Error'

const HomePageHeroSection = () => {
 
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Service[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Get tRPC context utilities
  const utils = api.useContext()

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch()
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      // Use the tRPC client to manually call the endpoint
      const results = await utils.service.searchServices.fetch({ query: searchQuery })
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }
  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden bg-cover bg-center h-[500px] p-4 mt-0" 
           style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-none flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">Our Services</h1>
          <p className="font-normal text-sm">Trusted Experts for Home Services — Anytime, Anywhere</p>
          <div className="mt-4 flex gap-1 text-xl">❤️ 👍 🔥 💙 ⭐</div>
          <p className="text-gray-500 text-sm">Loved from 500k+ users</p>
          
          <div className='flex items-center border border-none rounded-lg bg-white border-[#004838] m-4 p-4 justify-between w-full max-w-2xl'>
            <div>
              <GetLocation />
            </div>
            <div className='flex-1 mx-4'>
              <Input 
                type='text' 
                placeholder='Search for services...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <button 
                className='bg-black p-2 rounded-full border hover:cursor-pointer'
                onClick={handleSearch}
              >
                <Search size={15} className='text-white font-bold' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((service) => (
              <Link 
                key={service.id} 
                href={`/service/${service.id}`}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 w-full mb-2">
                  <Image
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${service.image}`}
                    alt={service.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">₹{service.price}</span>
                  <span className="flex items-center">
                    ★ {service.reviewStarRating || '0.0'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="mt-4 p-6 text-center">
          <span id="loader"></span>
        </div>
      )}

      {!isSearching && searchQuery && searchResults.length === 0 && (
        <div className="mt-4 p-6 text-center">
          <div className='min-h-screen flex items-center justify-center'>
                     <Image
                     src={'/notfound.png'}
                     alt='loading'
                     width={300}
                     height={300}></Image>
                     <h1 className='text-xl text-center font-bold'>No related services found.</h1>
                 </div>
        </div>
      )}
    </div>
  )
}

export default HomePageHeroSection