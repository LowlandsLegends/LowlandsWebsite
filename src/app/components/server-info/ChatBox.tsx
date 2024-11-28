'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function ChatBox() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const user = session?.user;


    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL!}/app/server-info`,
            },
        });

        if (error) {
            console.error("Error logging in with Discord:", error.message);
        }
    };
    return (
        <Card className="w-full h-min flex flex-col">
            <CardHeader>
                <CardTitle>In-Game Cross-Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full min-h-96">
                    {/* Chat messages would go here */}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form className="flex w-60 gap-2">
                    {user ?
                        <>
                            <Input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-grow no-focus"
                            />
                            <Button type="submit">Send</Button> </> :
                        <Button onClick={handleLogin} className="w-full">Click to Login</Button>
                    }
                </form>
            </CardFooter>
        </Card>
    )
}

