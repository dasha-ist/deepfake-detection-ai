"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Target, Award, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at Stanford with 10+ years in computer vision and deepfake detection.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in machine learning and neural network architectures.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Research",
      bio: "PhD in Computer Science from MIT, published 50+ papers on AI security and media forensics.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Park",
      role: "Head of Product",
      bio: "Former product lead at Meta, expert in building scalable AI-powered consumer applications.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const faqs = [
    {
      question: "How accurate is your deepfake detection technology?",
      answer:
        "Our proprietary AI model achieves 99.8% accuracy on standard benchmarks and is continuously updated to detect the latest deepfake generation techniques including face swaps, lip-sync, and full synthetic media.",
    },
    {
      question: "What file formats do you support?",
      answer:
        "We support JPG, PNG, JPEG files up to 5MB for image analysis. Video detection (MP4, AVI, MOV) and audio verification (MP3, WAV) are coming soon with our upcoming platform updates.",
    },
    {
      question: "How long does analysis take?",
      answer:
        "Most image analyses complete within 2-5 seconds. Our AI processes your media in real-time, providing instant confidence scores and detailed manipulation heatmaps.",
    },
    {
      question: "Do you store my uploaded files?",
      answer:
        "No, we prioritize your privacy. Uploaded files are automatically deleted from our servers within 24 hours of analysis. You can also manually delete them immediately after receiving results.",
    },
    {
      question: "Can I use this for commercial purposes?",
      answer:
        "Yes, we offer enterprise plans for businesses, news organizations, and institutions. Contact our sales team for volume pricing and API access for commercial deepfake detection.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
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
          <Link href="/about" className="text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Try Now
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            About Us
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-300">
            Protecting Truth in the
            <span className="text-purple-400"> Digital Age</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to combat the growing threat of deepfakes and manipulated media through cutting-edge AI
            technology and forensic analysis.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-300">Our Mission</h3>
              <p className="text-gray-400">
                To democratize deepfake detection technology and make it accessible to everyone, from individuals to
                large enterprises.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-300">Our Vision</h3>
              <p className="text-gray-400">
                A world where digital media authenticity is verifiable, protecting society from the harmful effects of
                manipulated content.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-300">Our Values</h3>
              <p className="text-gray-400">
                Transparency, privacy, accuracy, and continuous innovation drive everything we do in the fight against
                digital deception.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-300">Our Story</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                At AIDeepfake, we believe that truth should not be a casualty of technology. In an era where artificial
                intelligence can generate hyper-realistic fake content in seconds, we are on a mission to equip
                individuals, organizations, and institutions with tools to recognize what's real—and what isn't.
              </p>
              <p>
                Our team brings together experts in AI, computer vision, and digital forensics to build state-of-the-art
                tools that detect manipulated media with precision. Whether you're a journalist, educator, legal
                analyst, or everyday user, our platform empowers you to analyze images and videos for authenticity using
                cutting-edge deepfake detection models.
              </p>
              <p>
                But we're not just technologists—we're advocates for a safer, more transparent digital world. From
                social media scans to visual heatmaps that expose manipulation, every tool we build is designed to
                defend truth, restore trust, and give users clarity in the face of misinformation.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-300">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-12 rounded-2xl border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-4 text-gray-300">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our AI-powered deepfake detection technology to verify the authenticity of
            digital media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
            >
              Contact Sales
            </Button>
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
        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
          Contact
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
