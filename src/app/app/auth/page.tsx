'use client';
import { createClient } from "@utils/supabase/client";
import { Button } from "@/components/ui/button";

const handleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
    });

    if (error) {
        console.error("Error logging in with Discord:", error.message);
    }
};

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Button onClick={handleLogin}>Login with Discord</Button>
        </div>
    );
}
