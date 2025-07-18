"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, CheckCircle, Cookie, Settings, BarChart, ShieldIcon, Calendar, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function CookiePage() {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  const cookieTypes = [
    {
      id: "essential",
      title: "Essential Cookies",
      description: "Required for basic website functionality and security",
      icon: ShieldIcon,
      required: true,
      examples: ["Authentication", "Security", "Load balancing"],
    },
  ]

  const handleCookieToggle = (type: string) => {
    setCookieSettings((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }))
  }

  const lastUpdated = "January 15, 2024"

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800/50 backdrop-blur-sm">
        {/* logo section */}
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
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
            Try Now
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-500/30">
              Cookie Policy
            </div>
            {/* main heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Cookie{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Policy
            </span>
          </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
              Learn about how we use cookies to improve your experience on our platform.
            </p>
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* Cookie Settings */}
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm mb-12">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Cookie className="h-6 w-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Cookie Preferences</h2>
              </div>
              <p className="text-gray-400 mb-8">
                Manage your cookie preferences below. You can change these settings at any time.
              </p>

              <div className="space-y-6">
                {cookieTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      className="flex items-start justify-between p-6 bg-gray-800/30 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="bg-purple-600/20 p-3 rounded-lg">
                          <Icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{type.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, index) => (
                              <span key={index} className="bg-gray-700/50 px-2 py-1 rounded text-xs text-gray-300">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {type.required ? (
                          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                            Required
                          </div>
                        ) : (
                          <Switch
                            checked={cookieSettings[type.id as keyof typeof cookieSettings]}
                            onCheckedChange={() => handleCookieToggle(type.id)}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center mt-8">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Information */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">What Are Cookies?</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. They help us
                    provide you with a better experience by remembering your preferences and analyzing how you use our
                    service.
                  </p>
                  <p>
                    We use both session cookies (which expire when you close your browser) and persistent cookies (which
                    remain on your device for a set period or until you delete them).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">How We Use Cookies</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Authentication & Security</h3>
                    <p>
                      Essential cookies help us verify your identity and protect your account from unauthorized access.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Performance & Analytics</h3>
                    <p>
                      We use analytics cookies to understand how users interact with our platform and identify areas for
                      improvement.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Personalization</h3>
                    <p>Preference cookies remember your settings and help us customize your experience.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">Managing Cookies</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete cookies individually or all at once</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies (though this may affect website functionality)</li>
                  </ul>
                  <div className="bg-orange-600/10 border border-orange-500/30 p-4 rounded-xl mt-6">
                    <p className="text-sm">
                      <strong>Note:</strong> Disabling essential cookies may prevent you from using certain features of
                      our service, including account login and file uploads.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">Third-Party Cookies</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>We may use third-party services that set their own cookies. These include:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>
                      <strong>Google Analytics:</strong> For website analytics and performance monitoring
                    </li>
                    <li>
                      <strong>Stripe:</strong> For secure payment processing
                    </li>
                    <li>
                      <strong>Cloudflare:</strong> For security and performance optimization
                    </li>
                  </ul>
                  <p>
                    These third parties have their own privacy policies and cookie practices. We recommend reviewing
                    their policies for more information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-12 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about our use of cookies, please don't hesitate to contact us.
            </p>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent font-medium px-8 py-3 rounded-lg transition-all duration-200"
            >
              Contact Support
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
