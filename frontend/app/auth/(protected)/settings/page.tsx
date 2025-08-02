// frontend/app/auth/(protected)/settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { settingsNavItems } from "@/components/config/settings-nav";

export default function SettingsPage() {
  // Make the Tabs component controlled with state
  const [activeTab, setActiveTab] = useState(settingsNavItems[0].id);

  return (
    // We remove the redundant <main> tag here
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-gray-400 mt-1">
          Manage your account, notifications, and billing preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-only Select Menu */}
        <div className="md:hidden mb-6">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-gray-900/50 border-gray-700">
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              {settingsNavItems.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs List */}
        <TabsList className="hidden md:grid w-full grid-cols-4 bg-gray-900/50 mb-6 h-auto">
          {settingsNavItems.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="flex items-center gap-2 py-3">
              <item.icon className="h-4 w-4" />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content for the Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                {settingsNavItems.find(i => i.id === 'profile')?.content}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="bg-gray-800/50 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="john.doe@example.com" disabled className="bg-gray-800/50 border-gray-700" />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 mt-2">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content for the Notifications Tab */}
        <TabsContent value="notifications">
           <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription className="text-gray-400">
                    {settingsNavItems.find(i => i.id === 'notifications')?.content}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-400">Receive email notifications for analysis results.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-gray-400">Get notified about critical security updates.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                   <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-sm text-gray-400">Receive updates about new features and offers.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
        </TabsContent>
        
        {/* Add your other TabsContent components for 'security' and 'billing' here */}

      </Tabs>
    </>
  );
}