"use client"

import Link from "next/link"
import {
  Shield,
  CheckCircle,
  ImageIcon,
  Video,
  Headphones,
  Instagram,
  Layers,
  Fingerprint,
  Zap,
  Eye,
  Lock,
  Globe,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesPage() {
  const features = [
    {
      icon: ImageIcon,
      title: "Image Analysis",
      description: "Detect manipulated images with 99.8% accuracy using our proprietary neural network.",
      status: "Available",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Video,
      title: "Video Detection",
      description: "Coming soon: Frame-by-frame analysis of videos to identify deepfake manipulation.",
      status: "Coming Soon",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Headphones,
      title: "Audio Verification",
      description: "Coming soon: Detect AI-generated or manipulated audio with advanced acoustic analysis.",
      status: "Coming Soon",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Instagram,
      title: "Social Media Scanning",
      description: "Coming soon: Browser extension to verify authenticity of social media profiles and content.",
      status: "Coming Soon",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Layers,
      title: "Manipulation Heatmap",
      description: "Visualize exactly which parts of an image have been manipulated with our detailed heatmap.",
      status: "Available",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Fingerprint,
      title: "AI Model Detection",
      description: "Identify which AI model was used to create the deepfake, helping trace the source.",
      status: "Available",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  const capabilities = [
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get results in 2-5 seconds with our optimized AI infrastructure",
    },
    {
      icon: Eye,
      title: "Pixel-level Analysis",
      description: "Examines every pixel for inconsistencies invisible to the human eye",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "End-to-end encryption with automatic file deletion after 24 hours",
    },
    {
      icon: Globe,
      title: "API Access",
      description: "Integrate our detection technology into your own applications",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-purple-500" />
           </div>
          </div>
          <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-300 font-medium">
            Features
          </Link>
          <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-gray-300 font-medium px-6 py-2 rounded-lg transition-all duration-200">
            Try Now
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block bg-purple-600/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-500/30">
            Advanced Features
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Cutting-Edge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Detection
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Our AI-powered platform combines multiple detection techniques to provide the most accurate and
            comprehensive deepfake analysis available.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Core Detection Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm group"
                >
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                          <Icon className="h-8 w-8 text-gray-300" />
                        </div>
                      </div>
                      <div
                        className={`absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-medium ${
                          feature.status === "Available"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        }`}
                      >
                        {feature.status}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Platform Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-600/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">{capability.title}</h3>
                    <p className="text-gray-400 text-sm">{capability.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mb-24">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-12 rounded-3xl border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Specifications</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.8%</div>
                <div className="text-gray-400">Detection Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{"<5s"}</div>
                <div className="text-gray-400">Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">5MB</div>
                <div className="text-gray-400">Max File Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-16 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-6">Ready to Detect Deepfakes?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            Start using our AI-powered forensics tool today and protect yourself from the growing threat of deepfakes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-gray-300 font-medium px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent font-medium px-8 py-4 rounded-lg transition-all duration-200"
            >
              View Pricing
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
