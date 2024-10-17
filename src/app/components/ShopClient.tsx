/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { ShopItems, ShopItem } from './ShopItems';
import { CategorySelectorComponent } from './CategorySelector';
import styles from './ShopClient.module.scss';
import { ShopCart } from './ShopCart';
import { loadStripe } from '@stripe/stripe-js';

interface ShopClientProps {
    shopItemsData: ShopItem[];
    categories: { id: string; name: string; image: string }[];
}

export interface CartItem extends ShopItem {
    quantity: number;
}


const ShopClient: React.FC<ShopClientProps> = ({ shopItemsData, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleCategoryReset = () => {
        setSelectedCategory(null);
    };

    const handleAddToCart = (item: ShopItem) => {
        setCartItems((prevItems) => {
            // Check if the item is already in the cart
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                // Update quantity
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                );
            } else {
                // Add new item with quantity 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleCheckout = async () => {
        setLoading(true);
        // Call the backend to create a Checkout session
        const res = await fetch('/api/stripe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({items: cartItems}),
        });

        const { sessionId } = await res.json();

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        if (stripe) {
            stripe.redirectToCheckout({ sessionId });
        } else {
            console.error('Stripe.js has not loaded yet.');
        }
        console.log(cartItems)
        setLoading(false);
    };

    const filteredItems = selectedCategory
        ? shopItemsData.filter(item => item.category === selectedCategory)
        : shopItemsData;

    return (
        <div className={styles.main}>
            <div className={styles.CategorySelectWrapper}>
                <div>
                    <CategorySelectorComponent
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelect={handleCategorySelect}
                        onReset={handleCategoryReset}
                    />
                </div>
            </div>
            <div className={styles.ShopItemsWrapper}>
                <div className="w-full h-auto text-card-foreground p-4 rounded-lg shadow-custom backdrop-blur-sm">
                    <ShopItems shopItems={filteredItems} onAddToCart={handleAddToCart} />
                </div>
            </div>
            <div className={styles.ShopCart}>
                <ShopCart
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveFromCart}
                    onCheckout={handleCheckout}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ShopClient;
