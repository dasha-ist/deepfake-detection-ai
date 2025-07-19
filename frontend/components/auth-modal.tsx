"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ShieldCheck } from "lucide-react"

interface AuthModalProps {
  children: React.ReactNode
}

export function AuthModal({ children }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted")
    // Close modal after successful login
    // setIsOpen(false)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle register logic here
    console.log("Register submitted")
    // Close modal after successful registration
    // setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-gray-900/95 border-gray-800 backdrop-blur-xl">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold text-white">DeepFake Detector</span>
            </div>
          </div>

          {/* Auth Content */}
          <div className="p-6">
            <Card className="bg-transparent border-0 shadow-none">
              <CardHeader className="space-y-1 px-0 pb-6">
                <CardTitle className="text-2xl font-bold text-center text-white">Welcome back</CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                  <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-600">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-white data-[state=active]:bg-purple-600">
                    Register
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-6 px-0">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white">Email</Label>
                        <Input
                          id="login-email"
                          placeholder="name@example.com"
                          type="email"
                          required
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-white">Password</Label>
                          <button
                            type="button"
                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <Input
                          id="login-password"
                          placeholder="••••••••"
                          type="password"
                          required
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="px-0">
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                      >
                        Sign In
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4 pt-6 px-0">
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-white">Name</Label>
                        <Input 
                          id="register-name" 
                          placeholder="John Doe" 
                          type="text" 
                          required
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-white">Email</Label>
                        <Input
                          id="register-email"
                          placeholder="name@example.com"
                          type="email"
                          required
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-white">Password</Label>
                        <Input
                          id="register-password"
                          placeholder="••••••••"
                          type="password"
                          required
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="px-0">
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                      >
                        Create Account
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}