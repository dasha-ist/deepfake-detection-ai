"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, Mail, Send, CheckCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-purple-500" />
           </div>
          <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
            Try Now
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 bg-gradient-to-r from-purple-600/10 to-blue-600/10 py-16 rounded-2xl border border-purple-500/20">
            <div className="inline-block bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Contact Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Team
            </span>
          </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions about our deepfake detection technology? Need enterprise solutions? We're here to help you
              protect against manipulated media.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-gray-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-gray-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-gray-300"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-gray-300 min-h-[120px]"
                    placeholder="Tell us more about your needs..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
                <p className="text-gray-400">Prefer to reach out directly? Here are other ways to contact us.</p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-gray-400 text-sm mb-2">Send us an email anytime</p>
                        <a href="mailto:contact@deepfakedetector.com" className="text-purple-400 hover:text-purple-300">
                          contact@deepfakedetector.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 rounded-lg border border-purple-500/30">
                  <h3 className="font-semibold mb-2">Enterprise Solutions</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Need custom deepfake detection for your organization? Let's discuss enterprise pricing and features.
                  </p>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 backdrop-blur-sm">
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Logo + Title */}
      <Link href="/" className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-purple-500" />
        <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
      </Link>

      {/* Navigation Links - Visible on all screens, stacked on small screens */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
          Terms of Service
        </Link>
        <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
          About
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
