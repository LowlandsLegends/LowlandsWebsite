import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
                storageKey: 'supabase.auth.token',
            },
            global: {
                headers: {
                    'x-application-name': 'my-app',
                },
            },
        }
    );
