// frontend/app/page.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShieldCheck,
  ImageIcon,
  Video,
  Headphones,
  Instagram,
  Layers,
  Fingerprint,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { TextReveal } from "@/components/text-reveal"
import { ParallaxSection } from "@/components/parallax-section"
import { FloatingElement } from "@/components/floating-element"
import { RevealImage } from "@/components/reveal-image"
import { MagneticButton } from "@/components/magnetic-button"
import { PulseDot } from "@/components/pulse-dot"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FloatingElement floatIntensity={0.5} rotateIntensity={2} duration={4}>
            <ShieldCheck className="h-8 w-8 text-purple-500" />
          </FloatingElement>
          <span className="text-xl font-bold">DeepFake Detector</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex text-gray-300 hover:text-white">
            Login
          </Button>
          <MagneticButton intensity={0.8}>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              Try Now
            </Button>
          </MagneticButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <AnimatedSection className="flex-1 space-y-8" animation="fade-up" delay={0.2}>
          <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
            AI-Powered Forensics
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Detect DeepFakes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              with Precision
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Our advanced AI forensics tool helps you identify manipulated images with industry-leading accuracy. Protect
            yourself from the growing threat of deepfakes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <MagneticButton intensity={1}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 h-12 px-8 text-lg">
                Start Scanning
              </Button>
            </MagneticButton>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900 h-12 px-8 text-lg">
              Learn More
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">JD</div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">KL</div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">MN</div>
            </div>
            <p className="text-gray-400">
              <span className="text-white font-medium">500+</span> security professionals trust our tool
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection className="flex-1 relative" animation="scale-in" delay={0.4}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-800">
            <RevealImage
              src="/placeholder.svg?height=600&width=400"
              alt="DeepFake Detector Interface"
              direction="right"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PulseDot size="sm" color="green" pulseIntensity="subtle" />
                <span className="text-sm font-medium">Real Image</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">99.8% Confidence</Badge>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Features Section */}
      <ParallaxSection className="py-20" speed={0.3} backgroundEffect="particles" intensity={0.7}>
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Features
            </Badge>
            <TextReveal as="h2" className="text-4xl font-bold mb-4">
              Advanced DeepFake Detection
            </TextReveal>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our tool uses cutting-edge AI to analyze and identify manipulated media with exceptional accuracy.
            </p>
          </AnimatedSection>

          <AnimatedSection
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            animation="stagger"
            staggerChildren=".feature-card"
            staggerAmount={0.15}
          >
            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <ImageIcon className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Image Analysis</h3>
                  <p className="text-gray-400">
                    Detect manipulated images with 99.8% accuracy using our proprietary neural network.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0.1}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <Video className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Video Detection</h3>
                  <p className="text-gray-400">
                    Coming soon: Frame-by-frame analysis of videos to identify deepfake manipulation.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0.2}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <Headphones className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Audio Verification</h3>
                  <p className="text-gray-400">
                    Coming soon: Detect AI-generated or manipulated audio with advanced acoustic analysis.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0.3}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <Instagram className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Social Media Scanning</h3>
                  <p className="text-gray-400">
                    Coming soon: Browser extension to verify authenticity of social media profiles and content.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0.4}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <Layers className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Manipulation Heatmap</h3>
                  <p className="text-gray-400">
                    Visualize exactly which parts of an image have been manipulated with our detailed heatmap.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement className="feature-card" floatIntensity={0.3} delay={0.5}>
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                <CardContent className="pt-6">
                  <Fingerprint className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">AI Model Detection</h3>
                  <p className="text-gray-400">
                    Identify which AI model was used to create the deepfake, helping trace the source.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>
          </AnimatedSection>
        </div>
      </ParallaxSection>

      {/* How It Works Section */}
      <ParallaxSection className="py-20" speed={0.4} backgroundEffect="wave" intensity={0.8}>
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Process
            </Badge>
            <TextReveal as="h2" className="text-4xl font-bold mb-4">
              How It Works
            </TextReveal>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our advanced AI forensics tool works in three simple steps to detect deepfakes with precision.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 hidden md:block"
              style={{ transform: "translateY(-50%)" }}
            ></div>

            <AnimatedSection className="relative step-card" animation="fade-up" delay={0.2} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4">Upload Media</h3>
                <p className="text-gray-400">
                  Simply upload the image you want to analyze through our secure interface. We support all major image
                  formats.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative step-card" animation="fade-up" delay={0.4} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
                <p className="text-gray-400">
                  Our advanced neural network analyzes the image, looking for telltale signs of manipulation that are
                  invisible to the human eye.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative step-card" animation="fade-up" delay={0.6} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Get Results</h3>
                <p className="text-gray-400">
                  Receive a detailed report with confidence score, manipulation heatmap, and AI model identification if
                  applicable.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </ParallaxSection>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <AnimatedSection className="flex-1 space-y-8" animation="fade-up">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Interactive Demo
            </Badge>
            <TextReveal as="h2" className="text-4xl font-bold">
              See the Technology in Action
            </TextReveal>
            <p className="text-xl text-gray-400">
              Our deepfake detection technology provides detailed analysis with visual heatmaps showing exactly where an
              image has been manipulated.
            </p>
            <AnimatedSection
              className="space-y-4"
              animation="stagger"
              staggerChildren=".feature-item"
              staggerAmount={0.15}
              delay={0.3}
            >
              <div className="flex items-start gap-3 feature-item">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Pixel-Level Analysis</h3>
                  <p className="text-gray-400">Examines every pixel for inconsistencies invisible to the human eye</p>
                </div>
              </div>
              <div className="flex items-start gap-3 feature-item">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Confidence Scoring</h3>
                  <p className="text-gray-400">Provides a clear probability score of image authenticity</p>
                </div>
              </div>
              <div className="flex items-start gap-3 feature-item">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">AI Model Identification</h3>
                  <p className="text-gray-400">Identifies which AI model was likely used to create the deepfake</p>
                </div>
              </div>
            </AnimatedSection>
            <MagneticButton intensity={1}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                Try Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </MagneticButton>
          </AnimatedSection>
          <AnimatedSection className="flex-1" animation="scale-in" delay={0.3}>
            <Tabs defaultValue="original" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="deepfake">Deepfake</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="original" className="mt-4">
                <div className="relative rounded-lg overflow-hidden border border-gray-800">
                  <RevealImage src="/placeholder.svg?height=500&width=500" alt="Original Image" direction="bottom" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <Badge className="bg-green-500/20 text-green-400">Original Image</Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="deepfake" className="mt-4">
                <div className="relative rounded-lg overflow-hidden border border-gray-800">
                  <RevealImage src="/placeholder.svg?height=500&width=500" alt="Deepfake Image" direction="bottom" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <Badge className="bg-red-500/20 text-red-400">Deepfake Image</Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analysis" className="mt-4">
                <div className="relative rounded-lg overflow-hidden border border-gray-800">
                  <RevealImage src="/placeholder.svg?height=500&width=500" alt="Analysis Heatmap" direction="bottom" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <Badge className="bg-purple-500/20 text-purple-400">Analysis Heatmap</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile App Preview */}
      <ParallaxSection className="py-20" speed={0.2} backgroundEffect="gradient" intensity={0.6}>
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Coming Soon
            </Badge>
            <TextReveal as="h2" className="text-4xl font-bold mb-4">
              Mobile Experience
            </TextReveal>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Take deepfake detection on the go with our upcoming mobile application.
            </p>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <AnimatedSection className="relative" animation="fade-up" delay={0.2} yOffset={50}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-black rounded-3xl overflow-hidden border border-gray-800 w-[280px] h-[560px]">
                <ParallaxImage
                  src="/placeholder.svg?height=560&width=280"
                  alt="Mobile App Preview"
                  className="w-full h-full object-cover"
                  speed={0.1}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection className="relative mt-8 md:mt-16" animation="fade-up" delay={0.4} yOffset={50}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-black rounded-3xl overflow-hidden border border-gray-800 w-[280px] h-[560px]">
                <ParallaxImage
                  src="/placeholder.svg?height=560&width=280"
                  alt="Mobile App Preview"
                  className="w-full h-full object-cover"
                  speed={0.2}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection className="relative" animation="scale-in" delay={0.2}>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Get Started
            </Badge>
            <TextReveal as="h2" className="text-4xl font-bold mb-4">
              Ready to Detect DeepFakes?
            </TextReveal>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Start using our AI-powered forensics tool today and protect yourself from the growing threat of deepfakes.
            </p>
            <div className="flex justify-center">
              <MagneticButton intensity={1}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 h-12 px-8 text-lg">
                  Start Free Trial
                </Button>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FloatingElement floatIntensity={0.5} rotateIntensity={2} duration={4}>
                <ShieldCheck className="h-8 w-8 text-purple-500" />
              </FloatingElement>
              <span className="text-xl font-bold">DeepFake Detector</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 pb-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Integration
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      GDPR
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 DeepFake Detector. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
