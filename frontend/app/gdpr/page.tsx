"use client"

import type React from "react"
import { useState } from "react"
import { Shield, CheckCircle, Download, Trash2, Eye, Edit, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GDPRPage() {
  const [requestType, setRequestType] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const rights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "Request a copy of all personal data we hold about you",
      action: "Request Data",
    },
    {
      icon: Edit,
      title: "Right to Rectification",
      description: "Correct any inaccurate or incomplete personal data",
      action: "Update Data",
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description: "Request deletion of your personal data ('right to be forgotten')",
      action: "Delete Data",
    },
    {
      icon: Download,
      title: "Right to Portability",
      description: "Export your data in a machine-readable format",
      action: "Export Data",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      // Optionally reset form
      // setEmail("");
      // setRequestType("");
    }, 3000)
  }

  const lastUpdated = "January 15, 2024"

  return (
    <>
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-500/30">
              GDPR Compliance
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Your Data{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Rights
            </span>
          </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
              Under the General Data Protection Regulation (GDPR), you have specific rights regarding your personal
              data.
            </p>
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* GDPR Rights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Your GDPR Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right, index) => {
                const Icon = right.icon
                return (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-600/20 p-3 rounded-xl">
                          <Icon className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3">{right.title}</h3>
                          <p className="text-gray-400 mb-4 leading-relaxed">{right.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                            onClick={() => setRequestType(right.action.replace(" ", ""))}
                          >
                            {right.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Request Form */}
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm mb-12">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Submit a GDPR Request</h2>
              </div>
              <p className="text-gray-400 mb-8">
                Use this form to exercise your GDPR rights. We'll respond to your request within 30 days.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-type">Request Type</Label>
                    <select
                      id="request-type"
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2 h-10"
                      required
                    >
                      <option value="">Select a request type</option>
                      <option value="RequestData">Data Access Request</option>
                      <option value="UpdateData">Data Correction Request</option>
                      <option value="DeleteData">Data Deletion Request</option>
                      <option value="ExportData">Data Export Request</option>
                      <option value="ObjectProcessing">Object to Processing</option>
                      <option value="RestrictProcessing">Restrict Processing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details (Optional)</Label>
                  <textarea
                    id="details"
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2 min-h-[100px]"
                    placeholder="Please provide any additional details about your request..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Request Submitted!
                    </>
                  ) : (
                    "Submit GDPR Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Sections */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">What is GDPR?</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into
                    effect on May 25, 2018. It gives individuals in the European Union specific rights regarding their
                    personal data.
                  </p>
                  <p>
                    As a company that processes personal data of EU residents, we are committed to full GDPR compliance
                    and transparency in our data handling practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">Our GDPR Commitments</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/30 p-4 rounded-xl">
                      <h3 className="font-semibold mb-2">Lawful Processing</h3>
                      <p className="text-sm text-gray-400">
                        We only process your data when we have a legal basis to do so.
                      </p>
                    </div>
                    <div className="bg-gray-800/30 p-4 rounded-xl">
                      <h3 className="font-semibold mb-2">Data Minimization</h3>
                      <p className="text-sm text-gray-400">We only collect data that is necessary for our services.</p>
                    </div>
                    <div className="bg-gray-800/30 p-4 rounded-xl">
                      <h3 className="font-semibold mb-2">Transparency</h3>
                      <p className="text-sm text-gray-400">
                        We clearly explain how we use your data in our privacy policy.
                      </p>
                    </div>
                    <div className="bg-gray-800/30 p-4 rounded-xl">
                      <h3 className="font-semibold mb-2">Security</h3>
                      <p className="text-sm text-gray-400">
                        We implement appropriate technical and organizational measures.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">Response Times & Process</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                      <Calendar className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">30-Day Response</h3>
                      <p className="text-sm text-gray-400">
                        We will respond to your GDPR request within 30 days of receipt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                      <Shield className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Identity Verification</h3>
                      <p className="text-sm text-gray-400">
                        We may request additional information to verify your identity before processing requests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-600/20 p-2 rounded-lg mt-1">
                      <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Free of Charge</h3>
                      <p className="text-sm text-gray-400">
                        Most GDPR requests are processed free of charge, unless they are excessive or repetitive.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-12 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your Rights?</h2>
            <p className="text-gray-400 mb-6">
              Our Data Protection Officer is here to help you understand and exercise your GDPR rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent font-medium px-8 py-3 rounded-lg transition-all duration-200"
              >
                Contact DPO
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200">
                View Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}