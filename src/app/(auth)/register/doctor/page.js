'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaUserMd, FaFileUpload } from 'react-icons/fa'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { locations, countryCodes } from '@/lib/locations'

const specializations = [
  "General Practice",
  "Internal Medicine",
  "Pediatrics",
  "Obstetrics and Gynecology",
  "Surgery",
  "Psychiatry",
  "Dermatology",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Oncology",
  "Radiology",
  "Anesthesiology",
  "Ophthalmology",
  "Urology",
  "Other"
]

export default function RegisterDoctorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    country: 'India',
    state: 'Bihar',
    city: 'Patna',
    pinCode: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
    experience: '',
    specialization: '',
    certificate: null,
  })
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    setStates(Object.keys(locations[formData.country] || {}))
  }, [formData.country])

  useEffect(() => {
    setCities(locations[formData.country]?.[formData.state] || [])
  }, [formData.country, formData.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, certificate: e.target.files[0] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value)
      }
    })

    try {
      const response = await axios.post('/api/register/doctor', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.data.success) {
        toast.success('Registration successful!')
        router.push('/login')
      } else {
        setError('Registration failed. Please try again.')
        toast.error('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
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
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Registration</h1>
          <p className="text-gray-600 mt-2">Create your Care Portal doctor account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => handleSelectChange('countryCode', value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((cc) => (
                      <SelectItem key={cc.code} value={cc.code}>
                        {cc.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(locations).map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleSelectChange('state', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleSelectChange('city', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN Code</Label>
              <div className="relative">
                <Input
                  id="pinCode"
                  name="pinCode"
                  type="number"
                  placeholder="Enter your PIN code"
                  required
                  className="pl-10"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="relative">
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  required
                  className="pl-10"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years)</Label>
              <div className="relative">
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="Years of experience"
                  required
                  className="pl-10"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
                <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => handleSelectChange('specialization', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate">Certificate (PDF)</Label>
              <div className="relative">
                <Input
                  id="certificate"
                  name="certificate"
                  type="file"
                  accept=".pdf"
                  required
                  className="pl-10"
                  onChange={handleFileChange}
                />
                <FaFileUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Sent For Approval'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Are you a patient?</p>
          <Link href="/register/patient" className="text-blue-600 hover:underline">
            Register as a Patient
          </Link>
        </div>
      </motion.div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}