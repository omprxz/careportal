'use client'

import { useState } from 'react'
import SymptomForm from '@/components/symptom-form'
import Results from '@/components/results'
import Loading from '@/components/loading'

export default function Home() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      setResults(result.response)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-indigo-50 to-purple-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-4xl whitespace-nowrap font-bold text-center mb-8 text-indigo-700">
          Medical Symptom Checker
        </h1>
        {isLoading ? (
          <Loading />
        ) : results ? (
          <Results results={results} setResults={setResults} />
        ) : (
          <SymptomForm
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  )
}