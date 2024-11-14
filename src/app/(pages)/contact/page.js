
"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Landing/Header';
import Footer from '@/components/Landing/Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/contact', formData);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 mt-16">Contact Us</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-400" />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-400" />
              <Input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-start space-x-2">
              <FaPaperPlane className="text-gray-400 mt-2" />
              <Textarea
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
          {submitStatus === 'success' && (
            <p className="mt-4 text-green-600 text-center">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-red-600 text-center">Error sending message. Please try again.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}