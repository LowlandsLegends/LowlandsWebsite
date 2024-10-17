import Stripe from 'stripe';
import { Metadata } from 'next';

interface SuccessPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
    title: 'Payment Successful',
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const sessionId = searchParams.session_id;

    if (!sessionId || typeof sessionId !== 'string') {
        return <p>No session ID provided.</p>;
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        throw new Error('STRIPE_SECRET_KEY is not set');
    }

    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2024-09-30.acacia',
    });

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return (
            <div>
                <h1>Payment Successful</h1>
                <p>Thank you for your purchase!</p>
                <p>Amount Paid: {session.amount_total! / 100} EUR</p>
            </div>
        );
    } catch (error) {
        console.error('Error retrieving Stripe session:', error);
        return <p>Failed to retrieve session details.</p>;
    }
}