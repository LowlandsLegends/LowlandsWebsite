'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface ShopItem {
    id: string
    name: string
    description: string
    price: number
    category: string
}

interface ShopItemsProps {
    shopItems: ShopItem[]
    onAddToCart: (item: ShopItem) => void
}

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [matches, query])

    return matches
}

export function ShopItems({ shopItems, onAddToCart }: ShopItemsProps) {
    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    const itemsPerPage = 6
    const totalPages = Math.ceil(shopItems.length / itemsPerPage)

    const displayedItems = isDesktop
        ? shopItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        : shopItems

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
    }

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === ',' || event.key === '<' || event.key === 'ArrowLeft') {
                prevPage();
            } else if (event.key === '.' || event.key === '>' || event.key === 'ArrowRight') {
                nextPage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const getDescriptionPreview = (description: string, maxLength: number): string => {
        const stack: string[] = [];
        let length = 0;
        let result = '';
        let i = 0;

        while (i < description.length && length < maxLength) {
            const char = description[i];
            const nextTwoChars = description.substring(i, 2);

            if (nextTwoChars === '**') {
                if (stack[stack.length - 1] === '**') {
                    stack.pop();
                } else {
                    stack.push('**');
                }
                result += '**';
                i += 2;
            } else if (char === '*') {
                if (stack[stack.length - 1] === '*') {
                    stack.pop();
                } else {
                    stack.push('*');
                }
                result += '*';
                i += 1;
            } else {
                result += char;
                length++;
                i++;
            }
        }

        // Continue until we close any open markdown elements
        while (i < description.length && stack.length > 0) {
            const char = description[i];
            const nextTwoChars = description.substr(i, 2);

            if (nextTwoChars === '**' && stack[stack.length - 1] === '**') {
                stack.pop();
                result += '**';
                i += 2;
            } else if (char === '*' && stack[stack.length - 1] === '*') {
                stack.pop();
                result += '*';
                i += 1;
            } else {
                result += char;
                i++;
            }
        }

        // Close any unclosed markdown elements
        while (stack.length > 0) {
            const token = stack.pop();
            result += token;
        }

        return result;
    }

    return (
        <div className="w-full min-h-[37rem] h-auto text-card-foreground p-4 rounded-lg shadow-custom backdrop-blur-sm">
            {isDesktop && totalPages > 1 && (
                <div className="absolute top-1/2 left-0 right-0 flex justify-between flex-grow transform -translate-y-1/2">
                    <Button
                        onClick={prevPage}
                        className="rounded-full p-1 z-10"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-6 w-6 " />
                    </Button>
                    <Button
                        onClick={nextPage}
                        className="rounded-full p-1"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            )}
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {displayedItems.map((item) => (
                        <Card key={item.id} className="h-64 ">
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-between">
                                <ReactMarkdown className="text-sm text-white">
                                    {getDescriptionPreview(item.description, 110) + " ..."}
                                </ReactMarkdown>
                            </CardContent>
                            <CardFooter className="absolute bottom-0 left-0 right-0 flex justify-between">
                                <Button onClick={() => onAddToCart(item)} className="w-[40%] mr-2">
                                    €{item.price.toFixed(2)}
                                </Button>
                                <Button onClick={() => setSelectedItem(item)} className="w-[60%]">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedItem?.name}</DialogTitle>
                            <DialogDescription>
                                {selectedItem && <ReactMarkdown>{selectedItem.description}</ReactMarkdown>}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <p className="text-lg font-semibold">Price: €{selectedItem?.price.toFixed(2)}</p>
                            <Button
                                onClick={() => {
                                    onAddToCart(selectedItem!)
                                    setSelectedItem(null)
                                }}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}