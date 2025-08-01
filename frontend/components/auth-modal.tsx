"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient" // Your Supabase client
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert("Login successful!");
      setIsOpen(false)
      router.refresh()
    }
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    
    const { data, error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
      options: {
        data: {
          first_name: formState.firstName,
          last_name: formState.lastName,
        },
      },
    })

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user && (data.user.identities?.length === 0 || data.session)) {
      setError("A user with this email address already exists. Please try to log in.");
      setLoading(false);
      return;
    }

    if (data.user) {
      alert("Registration successful! Please check your email to verify your account.")
      setIsOpen(false)
    }

    setLoading(false)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(formState.email, {
      // This URL will be the page where the user can set their new password.
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password reset link sent! Please check your email inbox.");
    }
    setLoading(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setFormState({ email: "", password: "", firstName: "", lastName: "" });
      setError(null);
      setSuccess(null);
      setLoading(false);
      setShowForgotPassword(false);
    } else {
      setActiveTab("login");
      setError(null);
      setSuccess(null);
    }
    setIsOpen(open);
  }

  const onTabChange = (value: string) => {
    setShowForgotPassword(false);
    setError(null);
    setSuccess(null);
    setActiveTab(value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-gray-900/95 border-gray-800 backdrop-blur-xl">
        <div className="relative">
          <div className="flex items-center justify-center p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold text-white">DeepFake Detector</span>
            </div>
          </div>

          <div className="p-6">
            <Card className="bg-transparent border-0 shadow-none">
              <CardHeader className="space-y-1 px-0 pb-4">
                <CardTitle className="text-2xl font-bold text-center text-white">
                  {showForgotPassword ? 'Reset Password' : 'Welcome'}
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  {showForgotPassword 
                    ? 'Enter your email to receive a reset link' 
                    : 'Access your account or create a new one'
                  }
                </CardDescription>
              </CardHeader>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm p-3 rounded-md mb-4 text-center">
                  {error}
                </div>
              )}
               {success && (
                <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-sm p-3 rounded-md mb-4 text-center">
                  {success}
                </div>
              )}

              <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                {!showForgotPassword && (
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                    <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-600">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="text-white data-[state=active]:bg-purple-600">
                      Register
                    </TabsTrigger>
                  </TabsList>
                )}

                <TabsContent value="login">
                  {showForgotPassword ? (
                    <form onSubmit={handlePasswordReset}>
                      <CardContent className="space-y-4 pt-6 px-0">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email" className="text-white">Email</Label>
                          <Input id="reset-email" name="email" placeholder="name@example.com" type="email" required value={formState.email} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex-col gap-4 px-0">
                        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white disabled:opacity-50">
                          {loading ? 'Sending Link...' : 'Send Reset Link'}
                        </Button>
                        <Button variant="link" size="sm" type="button" onClick={() => setShowForgotPassword(false)} className="text-gray-400 h-auto p-0">
                          Back to Login
                        </Button>
                      </CardFooter>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin}>
                      <CardContent className="space-y-4 pt-6 px-0">
                        <div className="space-y-2">
                          <Label htmlFor="login-email" className="text-white">Email</Label>
                          <Input id="login-email" name="email" placeholder="name@example.com" type="email" required value={formState.email} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center justify-between">
                            <Label htmlFor="login-password" className="text-white">Password</Label>
                            <Button variant="link" size="sm" type="button" onClick={() => setShowForgotPassword(true)} className="text-purple-400 hover:text-purple-300 h-auto p-0 text-xs">
                              Forgot Password?
                            </Button>
                          </div>
                          <Input id="login-password" name="password" placeholder="••••••••" type="password" required value={formState.password} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                        </div>
                      </CardContent>
                      <CardFooter className="px-0">
                        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white disabled:opacity-50">
                          {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </CardFooter>
                    </form>
                  )}
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4 pt-6 px-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-firstName" className="text-white">First Name</Label>
                          <Input id="register-firstName" name="firstName" placeholder="John" type="text" required value={formState.firstName} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-lastName" className="text-white">Last Name</Label>
                          <Input id="register-lastName" name="lastName" placeholder="Doe" type="text" required value={formState.lastName} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-white">Email</Label>
                        <Input id="register-email" name="email" placeholder="name@example.com" type="email" required value={formState.email} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-white">Password</Label>
                        <Input id="register-password" name="password" placeholder="A secure password" type="password" required value={formState.password} onChange={handleInputChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500" />
                      </div>
                    </CardContent>
                    <CardFooter className="px-0">
                      <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white disabled:opacity-50">
                        {loading ? 'Creating Account...' : 'Create Account'}
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