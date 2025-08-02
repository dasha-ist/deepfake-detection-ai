"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from "@/lib/supabase/client"; // Corrected import path
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

// This component contains all the client-side logic
export default function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // This hook now runs safely on the client side
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Invalid or expired password reset link. Please try resetting your password again.");
      }
    };
    getSession();
  }, [supabase.auth]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Your password has been updated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push('/auth');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <Card className="sm:max-w-md w-full p-0 bg-gray-900/95 border-gray-800 backdrop-blur-xl">
      <CardHeader className="space-y-1 px-6 pb-4 pt-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-purple-500" />
            <span className="text-xl font-bold text-white">DeepFake Detector</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-white">Reset Your Password</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
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
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          {/* Form inputs */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">New Password</Label>
              <Input
                id="new-password" type="password" placeholder="••••••••" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
              <Input
                id="confirm-password" type="password" placeholder="••••••••" required
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white disabled:opacity-50">
            {loading ? 'Updating Password...' : 'Set New Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}