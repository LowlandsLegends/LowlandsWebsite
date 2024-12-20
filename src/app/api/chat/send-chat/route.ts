import { supabaseAdmin } from "@lib/supabaseClient";
import { RCONScheduler } from "@/src/app/lib/rcon";

export async function POST(req: Request) {
    async function sendToDiscord(message: { server_index: number; username: string; message: string }) {
        const payload = {
            content: `**[Web] ${message.username}:** ${message.message}`,
        };

        const response = await fetch(
            "https://discord.com/api/webhooks/1314281661235728424/9oB_DMbF0G5QJLnVKxsIiN14uTG4LjPUOkj8lo6ejkvKIczTx8pgv8Js2-PnPxLrzOoz",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to send message to Discord:", errorText);
            throw new Error("Discord webhook request failed");
        }
    }

    async function sendToServers(message: { server_index: number; username: string; message: string }){
        RCONScheduler.sendChatToAllServers(message);
    }
    async function saveToSupabase(message: { server_index: number; username: string; message: string }) {

        const { error } = await supabaseAdmin.from('chat_messages').insert([
            {
                server_index: 10,
                username: message.username,
                message: message.message
            },
        ]);
        if (error) {
            console.error('Error inserting player counts to Supabase:', error);
            throw error;
        }
    }

    try {
        const body = await req.json();

        if (!body || typeof body !== "object" || !body.server_index || !body.username || !body.message) {
            return new Response(JSON.stringify({ status: 400, error: "Invalid request body" }), {
                status: 400,
            });
        }

        await sendToDiscord(body);
        await saveToSupabase(body);
        await sendToServers(body);

        return new Response(JSON.stringify({ status: 200 }), { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ status: 500, error: "Internal Server Error" }), {
            status: 500,
        });
    }
}