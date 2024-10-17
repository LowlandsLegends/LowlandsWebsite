import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@components/ShopClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia',
});

export async function POST(req: Request) {
    try {
        const { items } = await req.json();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
            throw new Error('NEXT_PUBLIC_BASE_URL is not set');
        }

        const successUrl = `${baseUrl.replace(/\/$/, '')}/app/shop/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl.replace(/\/$/, '')}/app/shop/cancel`;

        // Log the URLs for debugging
        console.log('Success URL:', successUrl);
        console.log('Cancel URL:', cancelUrl);

        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: CartItem) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe Checkout session:', error);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
}