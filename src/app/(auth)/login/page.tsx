'use client'

import type { FormEvent } from 'react'
import { useState } from 'react' // Add this import
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff } from 'lucide-react' // Add eye icons
import { z } from 'zod'
import { loginSchema } from '@/lib/zodSchema' // Import your zod schema
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { error } from 'console'

type loginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [loading,setLoading] = useState(false)
    const { register,handleSubmit,formState: { errors} } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    })
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false) // State for toggle

  async function handleOnSubmit(data:loginFormData) {

    try {
      setLoading(true)
       const { email, password } = data

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      if(data.role=='CUSTOMER'){
 router.push('/home')
      }else{
        router.push('/provider')
      }
     
    } else {
        const errorData = await response.json()
        // Handle errors, e.g., show a notification or alert
        console.error('Login failed:', errorData.error)
    }
    } catch (error) {
      console.log('error')
    }finally{
      setLoading(false)
    }
  
   
  }

  return (
    <div className='bg-[#EBEDE8] dark:bg-black flex h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-4'>
            <div>
                <input
            {...register('email',{required:true})}
              type="email"
              name="email"
              placeholder="Email"
              className='w-full p-2 border rounded'
            /> 
            {errors.email&&(
                <p className='text-red-500 p-2'>{errors.email.message}</p>
            )}
            </div>
           
            
            <div className=""> {/* Password container */}
                <div className='flex w-full'>
                    <input 
              {...register('password',{required:true})}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className='w-full p-2 border-t border-b border-l rounded pr-10' /* Add right padding */
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
                </div>
              
              {errors.password && (
                <p className='text-red-500 p-2'>{errors.password.message}</p>
              )}
            </div>

            <Button disabled={loading} type='submit' variant={'default'} className='w-full'>
              Login
            </Button>
          </form>
          
          <Link 
            href={'/sign-up'} 
            className='flex items-center w-full justify-center mt-2'
          >
            Don't have an account?
            <span className='ml-2 text-decoration-line: underline flex items-center'>
              SignUp <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}