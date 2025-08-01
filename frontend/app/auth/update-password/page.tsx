// frontend/app/update-password/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Your Supabase client
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // This useEffect will run when the component mounts
  // It's crucial for Supabase's PKCE flow to handle the redirect
  useEffect(() => {
    // Supabase automatically parses the URL for the access_token
    // and sets the session when the page loads if it's a redirect from a magic link/reset email.
    // We can then try to get the session to confirm.
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If there's no session, it means the token might be invalid or expired.
        // Or the user landed here directly without a proper reset link.
        setError("Invalid or expired password reset link. Please try resetting your password again.");
      }
    };
    getSession();
  }, []);

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

    if (password.length < 6) { // Supabase default minimum password length
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    console.log("--- [DEBUG] Updating User Password ---");

    // This updates the password for the currently signed-in user (whose session was set by the magic link)
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error("[DEBUG] Password Update Error:", updateError.message);
      setError(updateError.message);
    } else {
      console.log("[DEBUG] Password Updated Successfully!");
      setSuccess("Your password has been updated successfully! You can now log in with your new password.");
      setPassword('');
      setConfirmPassword('');
      // Optionally redirect the user to a login page or dashboard after a short delay
      setTimeout(() => {
        router.push('/login'); // Redirect to your login page
      }, 3000);
    }
    setLoading(false);
    console.log("--- [DEBUG] Password Update Process Ended ---");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
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
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white disabled:opacity-50">
              {loading ? 'Updating Password...' : 'Set New Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}