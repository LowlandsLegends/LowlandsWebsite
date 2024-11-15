'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShopItem } from './ShopItems';
import Loading from '../ui/Loading';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

interface CartItem extends ShopItem {
	quantity: number;
}

interface ShopCartProps {
	cartItems: CartItem[];
	onRemoveItem: (itemId: string) => void;
	onCheckout: () => void;
	loading: boolean;
}

export function ShopCart({ cartItems, onRemoveItem, onCheckout, loading }: ShopCartProps) {
	const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * (item.quantity || 1),
		0
	);

	const supabase = useSupabaseClient();

	const session = useSession();
	const user = session?.user;
	const cartItemsParam = encodeURIComponent(JSON.stringify(cartItems));


	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL!}/app/shop?cartitems=${cartItemsParam}`,
			},
		});

		if (error) {
			console.error("Error logging in with Discord:", error.message);
		}
	};

	return (
		<div className="flex justify-end p-4">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='shoppingcart' className="relative">
						<div className="h-10 w-10 flex items-center justify-center">
							<ShoppingCart className='text-white' />
						</div>
						{totalItems > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{totalItems}
							</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="space-y-4">
						<h3 className="font-medium text-white text-lg">Shopping Cart</h3>
						{cartItems.length === 0 ? (
							<p className='text-white'>Your cart is empty</p>
						) : (
							<>
								<ul className="space-y-2">
									{cartItems.map((item) => (
										<li key={item.id} className="flex justify-between text-white items-center">
											<span>{item.name}</span>
											<div className="flex items-center">
												<span className="text-sm text-white mr-2">
													{(item.quantity || 1)} x €{item.price.toFixed(2)}
												</span>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => onRemoveItem(item.id)}
												>
													Remove
												</Button>
											</div>
										</li>
									))}
								</ul>
								<div className="border-t pt-2">
									<div className="flex justify-between font-medium text-white">
										<span>Total:</span>
										<span>€{totalPrice.toFixed(2)}</span>
									</div>
								</div>
								<Button className="w-full"
									onClick={() => {
										if (user) {
											onCheckout()
										} else {
											handleLogin()
										}
									}}>
									{!user ? 'Click To Login' : loading ? <Loading /> : 'Proceed To Checkout'}
								</Button>
							</>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}