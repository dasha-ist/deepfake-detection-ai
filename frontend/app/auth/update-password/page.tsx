// frontend/app/auth/update-password/page.tsx
import { Suspense } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

// A simple loading component to show while the main form is loading
function LoadingFallback() {
  return (
     <Card className="sm:max-w-md w-full p-0 bg-gray-900/95 border-gray-800 backdrop-blur-xl">
      <CardHeader className="space-y-1 px-6 pb-4 pt-6 text-center">
        <ShieldCheck className="h-7 w-7 text-purple-500 mx-auto" />
        <CardTitle className="text-2xl font-bold text-white">Loading...</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 h-64 animate-pulse">
        <div className="bg-gray-700/50 rounded-md w-full h-full"></div>
      </CardContent>
    </Card>
  )
}

// This is now a Server Component
export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <Suspense fallback={<LoadingFallback />}>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}