'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaStethoscope, FaUserMd} from 'react-icons/fa'
import { MdAccessTimeFilled } from 'react-icons/md'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import Header from '@/components/Landing/Header'
import Footer from '@/components/Landing/Footer'

export default function LandingPage() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-100 to-green-100 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Welcome to Care Portal: Your Direct Link to Healthcare
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience healthcare like never before. Connect directly with doctors, get instant symptom analysis, and
                receive personalized care from the comfort of your home.
              </p>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Check Symptoms Now
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                  <FaStethoscope className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Describe Your Symptoms</h3>
                <p className="text-gray-600">
                  Input your symptoms into our advanced AI-powered system for instant analysis.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-6 inline-block mb-4">
                  <FaUserMd className="text-green-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect with Doctors</h3>
                <p className="text-gray-600">Get matched with qualified healthcare professionals based on your needs.</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-6 inline-block mb-4">
                  <MdAccessTimeFilled className="text-yellow-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Receive Care</h3>
                <p className="text-gray-600">
                  Consult with doctors, receive diagnoses, and get treatment plans all through our platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Symptom Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Our AI-powered system analyzes your symptoms and provides initial insights into potential conditions.
                </p>
                <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Direct Doctor Consultations</h3>
                <p className="text-gray-600 mb-4">
                  Connect directly with qualified doctors for personalized care and expert medical advice.
                </p>
                <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Secure Health Records</h3>
                <p className="text-gray-600 mb-4">
                  Keep all your medical information in one secure place, accessible only to you and your chosen healthcare
                  providers.
                </p>
                <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600 mb-4">
                  Our platform is available round the clock, ensuring you can get help whenever you need it.
                </p>
                <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">
                    &quot;Care Portal has revolutionized how I manage my health. It&apos;s so convenient to get expert medical advice
                    from home!&quot;
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={`https://i.pravatar.cc/60?img=${index}`}
                      alt={`User ${index}`}
                      width={40}
                      height={40}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-500">Patient</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <div className="flex flex-col justify-start">
              <div className='mb-2'>
                <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
                <p className="text-xl mb-6">
                  Get instant access to healthcare professionals and manage your health on the go.
                </p>
              </div>
              <div>
                <div className="bg-white text-blue-600 inline-block px-6 py-2 rounded-full font-semibold text-lg">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}