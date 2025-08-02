import { createClient } from '@supabase/supabase-js'

// Correctly access the FULL environment variable names
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Add a check to ensure the variables are not empty
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing from .env.local file. Make sure they start with NEXT_PUBLIC_");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)