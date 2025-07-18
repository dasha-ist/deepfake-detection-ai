"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, Lock, Database, Users, FileText, Calendar, CheckCircle, ShieldCheck} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Overview", icon: Eye },
    { id: "collection", title: "Data Collection", icon: Database },
    { id: "usage", title: "How We Use Data", icon: Users },
    { id: "sharing", title: "Data Sharing", icon: FileText },
    { id: "security", title: "Security", icon: Lock },
    { id: "rights", title: "Your Rights", icon: Shield },
  ]

  const lastUpdated = "January 15, 2024"

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Policy
            </span>
          </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              We take your privacy seriously. This policy explains how we collect, use, and protect your data.
            </p>
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/50 border-gray-800 sticky top-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                            activeSection === section.id
                              ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{section.title}</span>
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  {activeSection === "overview" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">Overview</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          At DeepFake Detector, we are committed to protecting your privacy and ensuring the security of
                          your personal information. This Privacy Policy explains how we collect, use, disclose, and
                          safeguard your information when you use our deepfake detection services.
                        </p>
                        <p>
                          We understand that trust is fundamental to our relationship with you, especially when dealing
                          with sensitive media content. This policy is designed to be transparent about our data
                          practices and your rights regarding your personal information.
                        </p>
                        <div className="bg-purple-600/10 border border-purple-500/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-400 mb-2">Key Principles</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• We only collect data necessary for our services</li>
                            <li>• Your uploaded media is processed securely and not stored permanently</li>
                            <li>• We never sell your personal information to third parties</li>
                            <li>• You have full control over your data and can request deletion at any time</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "collection" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">Data Collection</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <h3 className="text-lg font-semibold">Information We Collect</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Account Information</h4>
                            <p>
                              When you create an account, we collect your email address, name, and password (encrypted).
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Media Files</h4>
                            <p>
                              Images, videos, and audio files you upload for analysis. These are processed using our AI
                              models and are automatically deleted from our servers within 24 hours unless you choose to
                              save results.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Usage Data</h4>
                            <p>
                              Information about how you use our service, including analysis history, feature usage, and
                              performance metrics (anonymized).
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Technical Information</h4>
                            <p>
                              IP address, browser type, device information, and cookies for service optimization and
                              security.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "usage" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">How We Use Data</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <h3 className="text-lg font-semibold">Primary Uses</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Provide deepfake detection and analysis services</li>
                          <li>Improve our AI models and detection accuracy</li>
                          <li>Communicate with you about your account and our services</li>
                          <li>Ensure platform security and prevent abuse</li>
                          <li>Comply with legal obligations and law enforcement requests</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6">AI Model Training</h3>
                        <p>
                          We may use anonymized and aggregated data from analyses to improve our detection models.
                          Individual media files are never used for training without explicit consent, and all training
                          data is stripped of personally identifiable information.
                        </p>

                        <div className="bg-green-600/10 border border-green-500/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-400 mb-2">Data Minimization</h4>
                          <p className="text-sm">
                            We follow the principle of data minimization - we only collect and process the minimum
                            amount of data necessary to provide our services effectively.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "sharing" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">Data Sharing</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <h3 className="text-lg font-semibold">When We Share Information</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Service Providers</h4>
                            <p>
                              We work with trusted third-party service providers for cloud hosting, payment processing,
                              and analytics. These providers are bound by strict confidentiality agreements.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Legal Requirements</h4>
                            <p>
                              We may disclose information when required by law, court order, or to protect our rights
                              and the safety of our users.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Business Transfers</h4>
                            <p>
                              In the event of a merger, acquisition, or sale of assets, user information may be
                              transferred as part of the transaction.
                            </p>
                          </div>
                        </div>

                        <div className="bg-red-600/10 border border-red-500/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-400 mb-2">What We Never Do</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Sell your personal information to advertisers or data brokers</li>
                            <li>• Share your uploaded media with unauthorized parties</li>
                            <li>• Use your data for purposes other than those stated in this policy</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "security" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">Security</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <h3 className="text-lg font-semibold">Security Measures</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Encryption</h4>
                            <p className="text-sm">All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>
                          </div>
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Access Controls</h4>
                            <p className="text-sm">
                              Strict access controls and multi-factor authentication for all staff.
                            </p>
                          </div>
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Regular Audits</h4>
                            <p className="text-sm">Regular security audits and penetration testing by third parties.</p>
                          </div>
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Data Retention</h4>
                            <p className="text-sm">Automatic deletion of uploaded media within 24 hours of analysis.</p>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-6">Incident Response</h3>
                        <p>
                          In the unlikely event of a security breach, we will notify affected users within 72 hours and
                          take immediate steps to secure the system and prevent further unauthorized access.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSection === "rights" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-purple-400">Your Rights</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <h3 className="text-lg font-semibold">Data Subject Rights</h3>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                              <Eye className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Right to Access</h4>
                              <p className="text-sm">Request a copy of all personal data we hold about you.</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                              <FileText className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Right to Rectification</h4>
                              <p className="text-sm">Correct any inaccurate or incomplete personal data.</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                              <Lock className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Right to Erasure</h4>
                              <p className="text-sm">
                                Request deletion of your personal data ("right to be forgotten").
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                              <Database className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Right to Portability</h4>
                              <p className="text-sm">Export your data in a machine-readable format.</p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-6">How to Exercise Your Rights</h3>
                        <p>
                          To exercise any of these rights, please contact us at{" "}
                          <a
                            href="mailto:privacy@deepfakedetector.com"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            privacy@deepfakedetector.com
                          </a>
                          . We will respond to your request within 30 days.
                        </p>

                        <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-400 mb-2">Contact Our Data Protection Officer</h4>
                          <p className="text-sm">
                            For privacy-related questions or concerns, you can reach our Data Protection Officer at{" "}
                            <a href="mailto:dpo@deepfakedetector.com" className="text-blue-400 hover:text-blue-300">
                              dpo@deepfakedetector.com
                            </a>
                          </p>
                        </div>
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
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Logo + Title */}
      <Link href="/" className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-purple-500" />
        <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
      </Link>

      {/* Navigation Links - Visible on all screens, stacked on small screens */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
        <Link href="/gdpr" className="text-gray-400 hover:text-white transition-colors">
          GDPR
        </Link>
        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
          Terms of Service
        </Link>
        <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
          Cookie Policy
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
