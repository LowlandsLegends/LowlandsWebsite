'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

interface ShopItemsProps {
    shopItems: ShopItem[];
    onAddToCart: (item: ShopItem) => void;
}

export function ShopItems({ shopItems, onAddToCart }: ShopItemsProps) {
    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {shopItems.map((item) => (
                <Card key={item.id} className="cursor-pointer hover:shadow-custom transition-shadow h-64">
                    <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between">
                        <ReactMarkdown className="text-sm text-muted-foreground text-white">
                            {item.description.substring(0, 100)}
                        </ReactMarkdown>
                    </CardContent>
                    <CardFooter className="absolute bottom-0 left-0 right-0 flex justify-between">
                        <Button onClick={() => onAddToCart(item) } className="w-[40%] mr-2">
                            €{item.price.toFixed(2)}
                        </Button>
                        <Button onClick={() => setSelectedItem(item)} className="w-[60%]">
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            ))}

            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedItem?.name}</DialogTitle>
                        <DialogDescription>
                            {selectedItem && <ReactMarkdown>{selectedItem.description}</ReactMarkdown>}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <p className="text-lg font-semibold text-white">
                            Price: €{selectedItem?.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground text-white">
                            Category: {selectedItem?.category}
                        </p>
                        <Button
                            onClick={() => {
                                onAddToCart(selectedItem!);
                                setSelectedItem(null);
                            }}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}