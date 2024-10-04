'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
    items: { name: string; price: number; quantity: number }[];
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        // Call the backend to create a Checkout session
        const res = await fetch('/api/stripe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
        });

        const { sessionId } = await res.json();

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        if (stripe) {
            stripe.redirectToCheckout({ sessionId });
        } else {
            console.error('Stripe.js has not loaded yet.');
        }

        setLoading(false);
    };

    return (
        <div className="bg-red-700 p-8 flex items-center justify-center h-screen">
            <Button onClick={handleCheckout} disabled={loading} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-0 rounded-full px-6 py-3 transition-all duration-300">
                {loading ? 'Loading...' : 'Checkout'}
            </Button>
        </div>
    );
};

export default CheckoutButton;
