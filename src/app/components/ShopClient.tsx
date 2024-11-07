/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { ShopItems, ShopItem } from './ShopItems';
import { CategorySelectorResponsive } from './CategorySelectorResponsive'; // Use the responsive selector
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
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch('/api/stripe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cartItems }),
        });

        const { sessionId } = await res.json();
        const stripe = await stripePromise;
        if (stripe) {
            stripe.redirectToCheckout({ sessionId });
        } else {
            console.error('Stripe.js has not loaded yet.');
        }
        setLoading(false);
    };

    const filteredItems = selectedCategory
        ? shopItemsData.filter(item => item.category === selectedCategory)
        : shopItemsData;

    return (
        <div className={styles.main}>
            <div className={styles.CategorySelectWrapper}>
                <CategorySelectorResponsive
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={handleCategorySelect}
                    onReset={handleCategoryReset}
                />
            </div>
            <div className={styles.ShopItemsWrapper}>
                <ShopItems shopItems={filteredItems} onAddToCart={handleAddToCart} />
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