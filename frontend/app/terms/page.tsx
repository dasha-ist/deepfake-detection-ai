"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, CheckCircle, FileText, Scale, Users, AlertTriangle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShieldCheck,
} from "lucide-react"

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Overview", icon: FileText }, 
    { id: "acceptance", title: "Acceptance", icon: CheckCircle },
    { id: "services", title: "Our Services", icon: Shield },
    { id: "usage", title: "Acceptable Use", icon: Users },
    { id: "liability", title: "Liability", icon: Scale },
    { id: "termination", title: "Termination", icon: AlertTriangle },
  ]

  const lastUpdated = "July 15, 2025"

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
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
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
          <Link href="/auth" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
            Try Now
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-500/30">
              Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
               Service
            </span>
          </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
              Please read these terms carefully before using our deepfake detection services.
            </p>
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/50 border-gray-800/50 sticky top-6 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-6">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-300 ${
                            activeSection === section.id
                              ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{section.title}</span>
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-10">
                  {activeSection === "overview" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Terms of Service Overview</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                          Welcome to DeepFake Detector. These Terms of Service ("Terms") govern your use of our
                          AI-powered deepfake detection platform and services.
                        </p>
                        <p>
                          By accessing or using our services, you agree to be bound by these Terms and our Privacy
                          Policy. If you disagree with any part of these terms, you may not access our services.
                        </p>
                        <div className="bg-purple-600/10 border border-purple-500/30 p-6 rounded-xl">
                          <h4 className="font-semibold text-purple-400 mb-3">Important Notice</h4>
                          <p className="text-sm">
                            Our deepfake detection service is provided for informational purposes. While we strive for
                            high accuracy, no detection system is 100% perfect. Users should exercise their own judgment
                            when making decisions based on our analysis results.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "acceptance" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Acceptance of Terms</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <h3 className="text-xl font-semibold">Agreement to Terms</h3>
                        <p>
                          By creating an account, uploading content, or using any part of our service, you acknowledge
                          that you have read, understood, and agree to be bound by these Terms.
                        </p>

                        <h3 className="text-xl font-semibold">Age Requirements</h3>
                        <p>
                          You must be at least 18 years old to use our services. If you are under 18, you may only use
                          our services with the involvement and consent of a parent or guardian.
                        </p>

                        <h3 className="text-xl font-semibold">Changes to Terms</h3>
                        <p>
                          We reserve the right to modify these Terms at any time. We will notify users of significant
                          changes via email or through our platform. Continued use of our services after changes
                          constitutes acceptance of the new Terms.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSection === "services" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Our Services</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <h3 className="text-xl font-semibold">Service Description</h3>
                        <p>
                          DeepFake Detector provides AI-powered analysis to detect manipulated media content, including:
                        </p>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li>Image authenticity verification with confidence scoring</li>
                          <li>Manipulation heatmap visualization</li>
                          <li>AI model identification and source tracing</li>
                          <li>API access for enterprise integration</li>
                        </ul>

                        <h3 className="text-xl font-semibold">Service Availability</h3>
                        <p>
                          We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may
                          temporarily suspend services for maintenance, updates, or technical issues.
                        </p>

                        <h3 className="text-xl font-semibold">Accuracy Disclaimer</h3>
                        <div className="bg-orange-600/10 border border-orange-500/30 p-6 rounded-xl">
                          <p className="text-sm">
                            While our AI achieves high accuracy rates, deepfake detection is an evolving field. Results
                            should be considered as one factor in determining media authenticity, not as definitive
                            proof.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "usage" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Acceptable Use Policy</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <h3 className="text-xl font-semibold">Permitted Uses</h3>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li>Verifying authenticity of media content</li>
                          <li>Educational and research purposes</li>
                          <li>Journalism and fact-checking</li>
                          <li>Legal and forensic analysis</li>
                          <li>Personal content verification</li>
                        </ul>

                        <h3 className="text-xl font-semibold">Prohibited Uses</h3>
                        <div className="bg-red-600/10 border border-red-500/30 p-6 rounded-xl">
                          <p className="font-semibold text-red-400 mb-3">You may NOT use our service to:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Upload illegal, harmful, or non-consensual content</li>
                            <li>• Violate any applicable laws or regulations</li>
                            <li>• Infringe on intellectual property rights</li>
                            <li>• Attempt to reverse engineer our AI models</li>
                            <li>• Overwhelm our systems with excessive requests</li>
                            <li>• Share your account credentials with others</li>
                          </ul>
                        </div>

                        <h3 className="text-xl font-semibold">Content Responsibility</h3>
                        <p>
                          You are solely responsible for the content you upload and analyze. You must have the right to
                          upload and analyze any media you submit to our service.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSection === "liability" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Limitation of Liability</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <h3 className="text-xl font-semibold">Service Disclaimer</h3>
                        <p>
                          Our services are provided "as is" without warranties of any kind. We do not guarantee the
                          accuracy, completeness, or reliability of our deepfake detection results.
                        </p>

                        <h3 className="text-xl font-semibold">Limitation of Damages</h3>
                        <p>
                          To the maximum extent permitted by law, DeepFake Detector shall not be liable for any
                          indirect, incidental, special, consequential, or punitive damages arising from your use of our
                          services.
                        </p>

                        <h3 className="text-xl font-semibold">Maximum Liability</h3>
                        <p>
                          Our total liability to you for any claims arising from these Terms or your use of our services
                          shall not exceed the amount you paid us in the 12 months preceding the claim.
                        </p>

                        <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-xl">
                          <h4 className="font-semibold text-blue-400 mb-3">Important Legal Notice</h4>
                          <p className="text-sm">
                            Some jurisdictions do not allow the exclusion of certain warranties or limitation of
                            liability. In such cases, our liability will be limited to the maximum extent permitted by
                            law.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "termination" && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-purple-400">Account Termination</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <h3 className="text-xl font-semibold">Termination by You</h3>
                        <p>
                          You may terminate your account at any time by contacting our support team or using the account
                          deletion feature in your dashboard.
                        </p>

                        <h3 className="text-xl font-semibold">Termination by Us</h3>
                        <p>
                          We may suspend or terminate your account immediately if you violate these Terms, engage in
                          fraudulent activity, or for any other reason at our sole discretion.
                        </p>

                        <h3 className="text-xl font-semibold">Effect of Termination</h3>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li>Your access to our services will be immediately revoked</li>
                          <li>All your data will be deleted within 30 days</li>
                          <li>You remain liable for any outstanding fees</li>
                          <li>Certain provisions of these Terms will survive termination</li>
                        </ul>

                        <h3 className="text-xl font-semibold">Contact Information</h3>
                        <p>
                          For questions about these Terms or to request account termination, contact us at{" "}
                          <a href="mailto:legal@deepfakedetector.com" className="text-purple-400 hover:text-purple-300">
                            legal@deepfakedetector.com
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                  <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8 text-purple-500" />
                  </div>
              </div>
              <span className="font-bold">DeepFake Detector</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/gdpr" className="text-gray-400 hover:text-white transition-colors">
                GDPR
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
