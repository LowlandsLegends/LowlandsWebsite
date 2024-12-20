import { supabaseAdmin } from "@/src/app/lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('chat_messages')
        .select('*');
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}