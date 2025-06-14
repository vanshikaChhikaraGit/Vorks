'use client'

import type { FormEvent } from 'react'
import { useState } from 'react' // Add this import
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff } from 'lucide-react' // Add eye icons
import { z } from 'zod'
import { signupSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type signupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [loading,setLoading] = useState(false)
  const { register,handleSubmit, formState:{errors},watch} = useForm<signupFormData>({
    resolver:zodResolver(signupSchema),
    defaultValues: {
      role: 'CUSTOMER' // Default to customer
    }
  })
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false) // State for toggle
const selectedRole = watch('role')

  async function handleOnSubmit(data: signupFormData) {
    try {
      setLoading(true)
        const { name, email, password,role } = data

    console.log(data)

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password,name,role }),
    })

    if (response.ok) {
    if (role === 'PROVIDER') {
        router.push('/provider')
      } else {
        router.push('/home')
      }
    } else {
      const errorData = await response.json()
      // Handle errors, e.g., show a notification or alert
      console.error('Signup failed:', errorData.error)
    }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  
  }

  return (
    <div className='bg-[#EBEDE8] dark:bg-black flex h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-4'>
            <div>
<input
            {...register('name', { required: true })}
              type="name"
              name="name"
              placeholder="Name"
              className='w-full p-2 border rounded'
            />
            {errors.name && (
              <p className='text-red-500 p-2'>{errors.name.message}</p>
            )}
            </div>

            <div>
              <input
                {...register('email', { required: true })}
                type="email"
                name="email"
                placeholder="Email"
                className='w-full p-2 border rounded'
              />
              {errors.email && (
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

            {/* //role  */}

            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register('role')}
                  value="CUSTOMER"
                  className="form-radio"
                  checked={selectedRole === 'CUSTOMER'}
                />
                <span>Customer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register('role')}
                  value="PROVIDER"
                  className="form-radio"
                  checked={selectedRole === 'PROVIDER'}
                />
                <span>Provider</span>
              </label>
            </div>

            <Button disabled={loading} type='submit' variant={'default'} className='w-full'>
              SignUp
            </Button>
          </form>
          
          <Link 
            href={'/login'} 
            className='flex items-center w-full justify-center mt-2'
          >
            Already have an account?
            <span className='ml-2 text-decoration-line: underline flex items-center'>
              Login <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}