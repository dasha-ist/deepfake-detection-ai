import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { PulseDot } from "@/components/pulse-dot";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  return (
    <main className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analysis History</h1>
        <p className="text-gray-400">View your previous deepfake detection analyses</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input placeholder="Search by filename or date..." className="pl-10 bg-gray-900/50 border-gray-700" />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-6">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 relative">
                  <img src={`/placeholder.svg?height=150&width=150&text=Image ${i+1}`} alt={`Analysis ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <div className="flex items-center gap-2">
                      <PulseDot size="sm" color={i % 3 === 0 ? "red" : "green"} pulseIntensity="subtle" />
                      <span className="text-xs font-medium">
                        {i % 3 === 0 ? "Deepfake Detected" : "Real Image"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">analysis_{i + 1}.jpg</h3>
                      <p className="text-gray-400 text-sm">Analyzed on May {i + 10}, 2025</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${i % 3 === 0 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                      {i % 3 === 0 ? "92.7% Fake" : "99.8% Real"}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-900">
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}