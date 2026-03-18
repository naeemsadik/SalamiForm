import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

if (supabaseUrl.includes("supabase.com/dashboard")) {
  throw new Error(
    "Invalid NEXT_PUBLIC_SUPABASE_URL. Use your project API URL (https://<project-ref>.supabase.co), not the dashboard URL."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
