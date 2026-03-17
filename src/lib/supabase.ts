import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Client-side (public) - for reading public data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side (service role) - for writing data, bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
