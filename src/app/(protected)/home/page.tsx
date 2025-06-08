import AllServices from '@/components/allServices/page'
import Category from '@/components/categorySection/page'
import HomePageHeroSection from '@/components/homepage/page'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
    <HomePageHeroSection></HomePageHeroSection>
    <Category></Category>
    <AllServices></AllServices>
     <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Home className="h-8 w-8" />
                    <span className="ml-2 text-xl font-bold">ServiceHub</span>
                  </div>
                  <p className="text-gray-400">Your trusted platform for professional home services.</p>
                </div>
    
                <div>
                  <h4 className="font-semibold mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        AC Cleaning
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Kitchen Cleaning
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Plumbing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Electrical
                      </Link>
                    </li>
                  </ul>
                </div>
    
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Press
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
    
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Safety
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
    
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
              </div>
            </div>
          </footer>
    </div>
  )
}

export default page