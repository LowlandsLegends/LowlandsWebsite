// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';


// These environment variables should be securely stored and never exposed client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export const supabaseClient = createPagesBrowserClient();