'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaUserMd, FaUser } from 'react-icons/fa'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/login', {
        emailOrPhone,
        password,
        rememberMe
      })

      if (response.data.success) {
        toast.success('Login successful!')
        router.push('/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
        toast.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again later.')
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your Care Portal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-phone">Email or Phone</Label>
            <div className="relative">
              <Input
                id="email-phone"
                type="text"
                placeholder="Enter your email or phone"
                required
                className="pl-10"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Don&apos;t have an account?</p>
          <div className="mt-4 space-x-4">
            <Link href="/register/patient" className="inline-flex items-center text-blue-600 hover:underline">
              <FaUser className="mr-2" />
              Register as Patient
            </Link>
            <Link href="/register/doctor" className="inline-flex items-center text-green-600 hover:underline">
              <FaUserMd className="mr-2" />
              Register as Doctor
            </Link>
          </div>
        </div>
      </motion.div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}