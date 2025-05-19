import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldCheck, Upload, History, Settings, LogOut } from "lucide-react"
import { PulseDot } from "@/components/pulse-dot"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold">DeepFake Detector</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PulseDot size="sm" color="green" pulseIntensity="subtle" />
              <span className="text-sm font-medium">Premium Account</span>
            </div>
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
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/50 text-white"
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
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/30"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Upload and analyze images for deepfake detection</p>
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="w-full bg-gray-900/50 mb-6">
              <TabsTrigger value="upload" className="flex-1">
                Upload New Image
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">
                Recent Analyses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                  <CardDescription className="text-gray-400">
                    Upload an image to analyze for potential deepfake manipulation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-lg font-medium">Drag and drop your image here</p>
                    <p className="text-gray-500 mt-2">or click to browse files</p>
                    <p className="text-gray-600 text-sm mt-4">Supports JPG, PNG, WEBP up to 10MB</p>
                    <Button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                      Select File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent">
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-gray-900/50 border-gray-800 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm shadow-purple-500/20"></div>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Analysis ${i}`}
                          alt={`Analysis ${i}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PulseDot size="sm" color="green" pulseIntensity="subtle" />
                              <span className="text-sm font-medium">Real Image</span>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              99.8% Confidence
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Image_{i}.jpg</h3>
                        <p className="text-gray-400 text-sm">Analyzed on May 1{i}, 2025</p>
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-2">
                          View detailed report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
