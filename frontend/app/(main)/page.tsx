// frontend/app/page.tsx
// frontend/app/(main)/page.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
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
              <Link href="/upload">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 h-12 px-8 text-lg">
                    Start Scanning
                </Button>
              </Link>
            </MagneticButton>
            <Link href="/#learn-more">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900 h-12 px-8 text-lg">
                Learn More
                </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-6">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">⚡</div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">3s</div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs">✓</div>
            </div>
            <p className="text-gray-400">
                <span className="text-white font-medium">Results in</span> seconds with accuracy
            </p>
            </div>
        </AnimatedSection>
        <AnimatedSection className="flex-1 relative z-10" animation="scale-in" delay={0.4}>
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
      <ParallaxSection id="features" className="py-20 relative z-10" speed={0.3}>
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
      <ParallaxSection className="py-20 relative z-10" speed={0.4}>
        <div id="how-it-works" className="container mx-auto px-4">
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
            <AnimatedSection className="relative step-card group" animation="fade-up" delay={0.2} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 h-full group-hover:bg-gray-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10 group-hover:bg-purple-800/60 transition-colors duration-300">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4">Upload Media</h3>
                <p className="text-gray-400">
                  Simply upload the image you want to analyze through our secure interface. We support all major image
                  formats.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative step-card group" animation="fade-up" delay={0.4} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 h-full group-hover:bg-gray-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10 group-hover:bg-purple-800/60 transition-colors duration-300">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
                <p className="text-gray-400">
                  Our advanced neural network analyzes the image, looking for telltale signs of manipulation that are
                  invisible to the human eye.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative step-card group" animation="fade-up" delay={0.6} yOffset={80}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 h-full group-hover:bg-gray-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-6 relative z-10 group-hover:bg-purple-800/60 transition-colors duration-300">
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

      {/* Interactive Demo Section */}
      <section id="learn-more" className="container mx-auto px-4 py-20 relative z-10">
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

      {/* Mobile Experience Section */}
      <ParallaxSection className="py-20 relative z-10" speed={0.2}>
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

      {/* Get Started Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <AnimatedSection className="relative" animation="scale-in" delay={0.2}>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center backdrop-blur-sm">
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
    </>
  )
}