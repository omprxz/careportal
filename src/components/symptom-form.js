'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export default function SymptomForm({ step, setStep, formData, setFormData, handleSubmit }) {
  const [symptoms, setSymptoms] = useState([])
  const [currentSymptom, setCurrentSymptom] = useState('')
  const [durationError, setDurationError] = useState(false)
  const [locationError, setLocationError] = useState(false)

  const addSymptom = () => {
    if (currentSymptom.trim() !== '') {
      setSymptoms([...symptoms, currentSymptom.trim()])
      setCurrentSymptom('')
    }
  }

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    setFormData({ ...formData, symptoms })
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const submitForm = () => {
    if (!formData.duration || !formData.location_discomfort) {
      setDurationError(!formData.duration)
      setLocationError(!formData.location_discomfort)
      return
    }
    const finalFormData = { ...formData, symptoms }
    handleSubmit(finalFormData)
  }

  return (
    <motion.div
      key={step}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Step 1: Symptoms</h2>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="Enter a symptom"
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
            />
            <Button onClick={addSymptom} variant="outline" className="bg-indigo-100 text-indigo-700">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center">
                <span>{symptom}</span>
                <button onClick={() => removeSymptom(index)} className="ml-2 focus:outline-none">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={nextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Step 2: Additional Information</h2>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-indigo-700">Duration of Symptoms (in days)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="e.g., 3"
              value={formData.duration || ''}
              onChange={(e) => {
                setFormData({ ...formData, duration: e.target.value })
                setDurationError(false)
              }}
              className={`border-indigo-300 focus:border-indigo-500 ${durationError ? 'border-red-500' : ''}`}
            />
            {durationError && <p className="text-red-500 text-sm mt-1">Duration is required</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-indigo-700">Location of Pain/Discomfort</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., chest, abdomen"
              value={formData.location_discomfort || ''}
              onChange={(e) => {
                setFormData({ ...formData, location_discomfort: e.target.value })
                setLocationError(false)
              }}
              className={`border-indigo-300 focus:border-indigo-500 ${locationError ? 'border-red-500' : ''}`}
            />
            {locationError && <p className="text-red-500 text-sm mt-1">Location of pain/discomfort is required</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="travel" className="text-indigo-700">Recent Travels (optional)</Label>
            <Input
              id="travel"
              type="text"
              placeholder="e.g., Southeast Asia"
              value={formData.recent_travel || ''}
              onChange={(e) => setFormData({ ...formData, recent_travel: e.target.value })}
              className="border-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-indigo-700">Allergies (optional)</Label>
            <Input
              id="allergies"
              type="text"
              placeholder="e.g., peanuts, penicillin"
              value={formData.allergies || ''}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              className="border-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="conditions" className="text-indigo-700">Pre-existing Conditions (optional)</Label>
            <Input
              id="conditions"
              type="text"
              placeholder="e.g., asthma, diabetes"
              value={formData.pre_existing_conditions || ''}
              onChange={(e) => setFormData({ ...formData, pre_existing_conditions: e.target.value })}
              className="border-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family-history" className="text-indigo-700">Family Medical History (optional)</Label>
            <Textarea
              id="family-history"
              placeholder="e.g., heart disease, cancer"
              value={formData.family_medical_history || ''}
              onChange={(e) => setFormData({ ...formData, family_medical_history: e.target.value })}
              className="border-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" className="bg-indigo-100 text-indigo-700">
              Previous
            </Button>
            <Button onClick={submitForm} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Submit
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}