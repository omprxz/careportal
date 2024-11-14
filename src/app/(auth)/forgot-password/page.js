'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await axios.post('/api/forgot-password', { userId })

      if (response.data.success) {
        setSuccess(true)
        toast.success('Password reset instructions sent to your email.')
      } else {
        setError('Unable to process your request. Please try again.')
        toast.error('Failed to send reset instructions. Please try again.')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
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
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-600 mt-2">Enter your email or phone to reset your password</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email_phone">Email or phone</Label>
              <div className="relative">
                <Input
                  id="email_phone"
                  type="text"
                  placeholder="Enter your email or phone"
                  required
                  className="pl-10"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-600">
            Password reset instructions have been sent to your email.
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}