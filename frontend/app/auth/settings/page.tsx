import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Upload, History, SettingsIcon, LogOut, User, Bell, Lock, CreditCard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold">DeepFake Detector</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 hidden md:block">
          <div className="p-4">
            <nav className="space-y-2">
              <Link
                href="/auth/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/30"
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
              <Link
                href="/auth/history"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/30"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </Link>
              <Link
                href="/auth/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/50 text-white"
              >
                <SettingsIcon className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-gray-400">Manage your account preferences and settings</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-gray-900/50 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your account profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Your company name" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 mt-2">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription className="text-gray-400">Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-400">Receive email notifications for analysis results</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-gray-400">Get notified about security issues and updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-sm text-gray-400">Receive updates about new features and offers</p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 mt-2">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription className="text-gray-400">Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 mt-2">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription className="text-gray-400">You are currently on the Premium plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Premium Plan</h3>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">Active</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Unlimited analyses, priority processing, and advanced detection features
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">$29.99/month</span>
                      <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900">
                        Change Plan
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between bg-gray-800/30 p-3 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-gray-700 rounded"></div>
                        <span>•••• •••• •••• 4242</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900">
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
