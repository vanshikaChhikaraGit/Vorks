// 'use client'

// import HeroSection from '@/components/herosection/hero'
// import Navbar from '@/components/navbar/navbar'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { CheckCircle, Clock, Home, Mail, MapPin, Phone, Shield, Star, Users } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// const LandingPage = () => {
//   const router = useRouter()
//   return (
//     <div className='bg-[#EBEDE8] min-h-screen'>
//       {/* navbar */}
//       <section id='navbar' className='p-4'>
//       <Navbar></Navbar>
//       </section>
//       {/* hero section */}
//       <section id='hero' className='h-[500px] bg-white flex items-center justify-center'>
//         <HeroSection></HeroSection>
//         </section>
//       {/* our offerings */}
//      <section className="relative py-24 sm:py-32 bg-brand-25">
//   <div>
//     <h2 className="text-center text-base/7 font-semibold text-brand-600">
//       One-Tap Booking
//     </h2>
//     <h1 className="text-center text-3xl font-bold mt-2 text-brand-950">
//       Book Trusted Services Instantly, Anytime
//     </h1>
//   </div>

//   <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 auto-rows-auto lg:grid-cols-3 lg:grid-rows-2 mt-12">
//     {/* Customer booking & notifications */}
//     <div className="relative lg:row-span-2">
//       <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
//       <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
//         <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
//           <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
//             Instant Bookings & Alerts
//           </p>
//           <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//             Book home services like cleaning, repairs, or installations with a single tap. Get real-time updates on service status and provider arrival.
//           </p>
//         </div>
//         <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
//           <div className="absolute bg-gray-900 border-gray-700 inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] shadow-2xl">
//             <Image
//               src={"/app.jpeg"}
//               alt="Booking screen showing upcoming service"
//               className="object-top object-cover size-full"
//               fill
//             />
//           </div>
//         </div>
//       </div>
//       <div className="absolute pointer-events-none shadow ring-1 rounded-lg ring-black/5 lg:rounded-l-[2rem] inset-px" />
//     </div>

//     {/* Service Categories */}
//     <div className="relative max-lg:row-start-1">
//       <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
//       <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
//         <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
//           <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
//             Wide Range of Services
//           </p>
//           <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//             Choose from Cleaning, Laundry, Gardening, Internet Setup, Car Wash and more — all verified and quality assured.
//           </p>
//         </div>
//         <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
//           <Image
//             className="w-full max-lg:max-w-xs"
//             src={"/servicerange.jpeg"}
//             alt="Service category icons"
//             width={500}
//             height={300}
//           />
//         </div>
//       </div>
//       <div className="pointer-events-none shadow ring-1 absolute rounded-lg ring-black/5 lg:rounded-t-[2rem] inset-px" />
//     </div>

//     {/* Payments through App */}
//     <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
//       <div className="absolute inset-px rounded-lg bg-white" />
//       <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
//         <div className="sm:pt-10 sm:px-10 pt-8 px-8">
//           <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
//             Secure In-App Payments
//           </p>
//           <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//             Pay securely from your mobile app. No cash needed — track payments and download invoices anytime.
//           </p>
//         </div>
//         <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
//           <Image
//             src={"/online.jpeg"}
//             alt="Payment feature preview"
//             className="w-full max-lg:max-w-xs"
//             width={500}
//             height={300}
//           />
//         </div>
//       </div>
//       <div className="absolute shadow ring-1 ring-black/5 pointer-events-none rounded-lg inset-px" />
//     </div>

//     {/* Provider dashboard features */}
//     <div className="relative lg:row-span-2">
//   <div className="absolute bg-white rounded-lg inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
//   <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
//     {/* Header Text */}
//     <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
//       <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
//         Provider Dashboard
//       </p>
//       <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//         Service providers can create, update, and delete their offerings, view bookings, and manage availability all from one place.
//       </p>
//     </div>

//     {/* Image container */}
//     <div className="relative flex flex-col items-center justify-center gap-6 px-8 py-8 sm:px-10 lg:pb-10">
//       <Image
//         src="/dashboard.jpeg"
//         alt="Provider dashboard preview"
//         className="w-full max-w-md rounded-lg shadow-md"
//         width={500}
//         height={300}
//       />
//       <Image
//         src="/provider.jpeg"
//         alt="Provider managing services"
//         className="w-full max-w-md rounded-lg shadow-md"
//         width={500}
//         height={300}
//       />
//     </div>
//   </div>
//   <div className="shadow pointer-events-none ring-1 ring-black/5 rounded-lg absolute inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
// </div>

//   </div>
// </section>

//        {/* How It Works */}
//       <section id="how-it-works" className="py-20 bg-[#EBEDE8]">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//             <p className="text-xl text-gray-600">Simple steps to get your service done</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-16">
//             {/* For Customers */}
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Customers</h3>
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
//                     1
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Choose Your Service</h4>
//                     <p className="text-gray-600">Select from our wide range of home services</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
//                     2
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Book Instantly</h4>
//                     <p className="text-gray-600">Schedule at your preferred time and date</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
//                     3
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Get Service Done</h4>
//                     <p className="text-gray-600">Our verified professionals complete the job</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* For Providers */}
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Service Providers</h3>
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
//                     1
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Sign Up & Verify</h4>
//                     <p className="text-gray-600">Create your profile and get verified</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
//                     2
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Receive Bookings</h4>
//                     <p className="text-gray-600">Get notified of nearby service requests</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
//                     3
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg">Earn Money</h4>
//                     <p className="text-gray-600">Complete jobs and get paid instantly</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//        {/* Why Choose Us */}
//       <section className="py-20 dark:bg-gray-800 bg-[#EBEDE8]">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ServiceHub?</h2>
//             <p className="text-xl text-gray-600">We make home services simple, reliable, and affordable</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Shield className="w-8 h-8 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
//               <p className="text-gray-600">All service providers are background-checked and verified</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Clock className="w-8 h-8 text-orange-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
//               <p className="text-gray-600">Get service providers at your doorstep within hours</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
//               <p className="text-gray-600">100% satisfaction guarantee or your money back</p>
//             </div>
//           </div>
//         </div>
//       </section>
//        {/* Customer Testimonials */}
//       <section id="testimonials" className="py-20 bg-[#EBEDE8]">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
//             <p className="text-xl text-gray-600">Real reviews from satisfied customers</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "Excellent AC cleaning service! The technician was professional and thorough. My AC is running like
//                   new again."
//                 </p>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//                     <Users className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Sarah Johnson</p>
//                     <p className="text-sm text-gray-500">Verified Customer</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "Quick and reliable plumbing service. Fixed my kitchen sink in no time. Highly recommend ServiceHub!"
//                 </p>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
//                     <Users className="w-5 h-5 text-orange-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Mike Chen</p>
//                     <p className="text-sm text-gray-500">Verified Customer</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "Amazing kitchen deep cleaning service. They made my kitchen sparkle! Professional and affordable."
//                 </p>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                     <Users className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Emily Rodriguez</p>
//                     <p className="text-sm text-gray-500">Verified Customer</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//        {/* Contact Section */}
//       <section id="contact" className="py-20 bg-[#EBEDE8]">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
//             <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <div>
//               <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 text-purple-600" />
//                   <span>+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-purple-600" />
//                   <span>support@servicehub.com</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <MapPin className="w-5 h-5 text-purple-600" />
//                   <span>123 Service Street, City, State 12345</span>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h4 className="font-semibold mb-4">Business Hours</h4>
//                 <div className="space-y-2 text-gray-600">
//                   <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
//                   <p>Saturday: 9:00 AM - 6:00 PM</p>
//                   <p>Sunday: 10:00 AM - 4:00 PM</p>
//                 </div>
//               </div>
//             </div>

//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
//                 <form className="space-y-4">
//                   <div>
//                     <Input placeholder="Your Name" />
//                   </div>
//                   <div>
//                     <Input type="email" placeholder="Your Email" />
//                   </div>
//                   <div>
//                     <Input placeholder="Subject" />
//                   </div>
//                   <div>
//                     <textarea
//                       className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
//                       placeholder="Your Message"
//                     ></textarea>
//                   </div>
//                   <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//        {/* CTA Section */}
//       <section className="py-20 ">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Join thousands of satisfied customers and service providers on ServiceHub
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="" onClick={()=>{
//               router.push('/sign-up')
//             }}>
//               Book Your First Service
//             </Button>
//             <Button size="lg" variant="outline" className="" onClick={()=>{router.push('/sign-up')}}>
//               Become a Service Provider
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center mb-4">
//                 <Home className="h-8 w-8" />
//                 <span className="ml-2 text-xl font-bold">ServiceHub</span>
//               </div>
//               <p className="text-gray-400">Your trusted platform for professional home services.</p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Services</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     AC Cleaning
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Kitchen Cleaning
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Plumbing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Electrical
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Press
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Blog
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Support</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Safety
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Terms of Service
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white">
//                     Privacy Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default LandingPage

'use client'

import HeroSection from '@/components/herosection/hero'
import Navbar from '@/components/navbar/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, Clock, Home, Mail, MapPin, Phone, Shield, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const LandingPage = () => {
  const router = useRouter()
  return (
    <div className='bg-[#EBEDE8] dark:bg-gray-900 min-h-screen transition-colors duration-300'>
      {/* navbar */}
      <section id='navbar' className='p-4'>
      <Navbar></Navbar>
      </section>
      {/* hero section */}
      <section id='hero' className='h-[500px] bg-white dark:bg-gray-800 flex items-center justify-center transition-colors duration-300'>
        <HeroSection></HeroSection>
        </section>
      {/* our offerings */}
     <section className="relative py-24 sm:py-32 bg-brand-25 dark:bg-gray-800 transition-colors duration-300">
  <div>
    <h2 className="text-center text-base/7 font-semibold text-brand-600 dark:text-purple-400">
      One-Tap Booking
    </h2>
    <h1 className="text-center text-3xl font-bold mt-2 text-brand-950 dark:text-white">
      Book Trusted Services Instantly, Anytime
    </h1>
  </div>

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 auto-rows-auto lg:grid-cols-3 lg:grid-rows-2 mt-12">
    {/* Customer booking & notifications */}
    <div className="relative lg:row-span-2">
      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 lg:rounded-l-[2rem] transition-colors duration-300" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
          <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 dark:text-white max-lg:text-center">
            Instant Bookings & Alerts
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
            Book home services like cleaning, repairs, or installations with a single tap. Get real-time updates on service status and provider arrival.
          </p>
        </div>
        <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
          <div className="absolute bg-gray-900 border-gray-700 inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] shadow-2xl">
            <Image
              src={"/app.jpeg"}
              alt="Booking screen showing upcoming service"
              className="object-top object-cover size-full"
              fill
            />
          </div>
        </div>
      </div>
      <div className="absolute pointer-events-none shadow ring-1 rounded-lg ring-black/5 dark:ring-gray-600 lg:rounded-l-[2rem] inset-px" />
    </div>

    {/* Service Categories */}
    <div className="relative max-lg:row-start-1">
      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 max-lg:rounded-t-[2rem] transition-colors duration-300" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
          <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 dark:text-white max-lg:text-center">
            Wide Range of Services
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
            Choose from Cleaning, Laundry, Gardening, Internet Setup, Car Wash and more — all verified and quality assured.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
          <Image
            className="w-full max-lg:max-w-xs"
            src={"/servicerange.jpeg"}
            alt="Service category icons"
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="pointer-events-none shadow ring-1 absolute rounded-lg ring-black/5 dark:ring-gray-600 lg:rounded-t-[2rem] inset-px" />
    </div>

    {/* Payments through App */}
    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 transition-colors duration-300" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
        <div className="sm:pt-10 sm:px-10 pt-8 px-8">
          <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 dark:text-white max-lg:text-center">
            Secure In-App Payments
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
            Pay securely from your mobile app. No cash needed — track payments and download invoices anytime.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
          <Image
            src={"/online.jpeg"}
            alt="Payment feature preview"
            className="w-full max-lg:max-w-xs"
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="absolute shadow ring-1 ring-black/5 dark:ring-gray-600 pointer-events-none rounded-lg inset-px" />
    </div>

    {/* Provider dashboard features */}
    <div className="relative lg:row-span-2">
      <div className="absolute bg-white dark:bg-gray-700 rounded-lg inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem] transition-colors duration-300" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
        {/* Header Text */}
        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
          <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 dark:text-white max-lg:text-center">
            Provider Dashboard
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
            Service providers can create, update, and delete their offerings, view bookings, and manage availability all from one place.
          </p>
        </div>

        {/* Image container */}
        <div className="relative flex flex-col items-center justify-center gap-6 px-8 py-8 sm:px-10 lg:pb-10">
          <Image
            src="/dashboard.jpeg"
            alt="Provider dashboard preview"
            className="w-full max-w-md rounded-lg shadow-md"
            width={500}
            height={300}
          />
          <Image
            src="/provider.jpeg"
            alt="Provider managing services"
            className="w-full max-w-md rounded-lg shadow-md"
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="shadow pointer-events-none ring-1 ring-black/5 dark:ring-gray-600 rounded-lg absolute inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
    </div>
  </div>
</section>

       {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#EBEDE8] dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Simple steps to get your service done</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* For Customers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">For Customers</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Choose Your Service</h4>
                    <p className="text-gray-600 dark:text-gray-300">Select from our wide range of home services</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Book Instantly</h4>
                    <p className="text-gray-600 dark:text-gray-300">Schedule at your preferred time and date</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Get Service Done</h4>
                    <p className="text-gray-600 dark:text-gray-300">Our verified professionals complete the job</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Providers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">For Service Providers</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Sign Up & Verify</h4>
                    <p className="text-gray-600 dark:text-gray-300">Create your profile and get verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Receive Bookings</h4>
                    <p className="text-gray-600 dark:text-gray-300">Get notified of nearby service requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg dark:text-white">Earn Money</h4>
                    <p className="text-gray-600 dark:text-gray-300">Complete jobs and get paid instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Why Choose Us */}
      <section className="py-20 bg-[#EBEDE8] dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose ServiceHub?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">We make home services simple, reliable, and affordable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Verified Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300">All service providers are background-checked and verified</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Quick Response</h3>
              <p className="text-gray-600 dark:text-gray-300">Get service providers at your doorstep within hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">100% satisfaction guarantee or your money back</p>
            </div>
          </div>
        </div>
      </section>
       {/* Customer Testimonials */}
      <section id="testimonials" className="py-20 bg-[#EBEDE8] dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real reviews from satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Excellent AC cleaning service! The technician was professional and thorough. My AC is running like
                  new again."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">Sarah Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Quick and reliable plumbing service. Fixed my kitchen sink in no time. Highly recommend ServiceHub!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">Mike Chen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Amazing kitchen deep cleaning service. They made my kitchen sparkle! Professional and affordable."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#EBEDE8] dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Have questions? We're here to help!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="dark:text-gray-300">+91 9876543210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="dark:text-gray-300">support@vorks.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="dark:text-gray-300">New Delhi, India</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4 dark:text-white">Business Hours</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <Card className="dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <Input placeholder="Subject" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <textarea
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none h-32 dark:bg-gray-700 dark:text-white"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-20 bg-[#EBEDE8] dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-300">
            Join thousands of satisfied customers and service providers on ServiceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800" onClick={()=>{
              router.push('/sign-up')
            }}>
              Book Your First Service
            </Button>
            <Button size="lg" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700" onClick={()=>{router.push('/sign-up')}}>
              Become a Service Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default LandingPage