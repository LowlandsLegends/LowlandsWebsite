'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'
import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react";

export default function InputWithButton() {
    const [message, setMessage] = useState("");
    const session = useSession();
    const user = session?.user;

    const handleSend = () => {
        if (!message || !user?.user_metadata?.full_name) {
            console.error("Missing required fields:", { user, message });
            return;
        }

        fetch('/api/chat/send-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                server_index: 10,
                username: user?.user_metadata.full_name,
                message: message,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setMessage(''); // Clear the input field
    };

    return (
        <div className="flex items-center space-x-2 w-full max-w-md">
            <div className="relative flex-grow">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="pr-10 bg-transparent border-white text-white placeholder:text-white/70"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-white hover:bg-white/10"
                    onClick={handleSend}
                >
                    <Send className="h-4 w-4 text-white focus:text-white" />
                </Button>
            </div>
        </div>
    )
}