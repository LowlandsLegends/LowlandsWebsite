'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import InputButton from "@/src/app/components/server-info/chatbox/input-button"
import { useEffect, useState, useRef } from "react";
import Loading from "../ui/Loading";

interface serverMessage {
    id:number
    server_index:number
    username:string 
    message:string
}

export default function ChatBox() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const user = session?.user;

    const servers: Array<{ index: number; name: string;}> = [
        { index: 0, name: "The Island"},
        { index: 1, name: "Abberation"},
        { index: 2, name: "Extinction"},
        { index: 5, name: "Discord" },
        { index:10, name: "Web" }
    ];

    const [messages, setMessages] = useState<serverMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false); // To track if the scroll has been set
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/chat/get-chat');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 1000);
        setLoading(false)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Ensure the scroll logic runs only once
        if (!hasScrolled && scrollRef.current && messages.length > 0) {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
            setHasScrolled(true); // Prevent further scrolling
        };
    }, [hasScrolled, messages]);

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
        <Card className="w-80 h-min flex flex-col">
            <CardHeader>
                <CardTitle>In-Game Cross-Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
                {loading ? (
                    <div className="items-center justify-center h-96">
                        <Loading />
                    </div>  
                ) : (
                    <ScrollArea className="h-full overflow-y-auto min-h-96 max-h-96 mt-2 text-white" ref={scrollRef}>
                        {messages.map((message) => {
                            const serverName = servers.find((server) => server.index === message.server_index)?.name || "Unknown Server";
                            return (
                                <div key={message.id} className="mb-2 text-white text-sm">
                                    <strong>({serverName}) {message.username} : </strong> {message.message}
                                </div>
                            );
                        })}
                    </ScrollArea>
                )}
            </CardContent>
            <CardFooter>
                {user ?
                    <>
                    <InputButton />
                    </> :
                    <Button onClick={handleLogin} className="w-full">Click to Login</Button>
                }
            </CardFooter>
        </Card>
    )
}

