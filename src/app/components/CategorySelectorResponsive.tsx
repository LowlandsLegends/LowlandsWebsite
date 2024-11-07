'use client';

import React, { useEffect} from 'react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CategorySelectorComponent } from './CategorySelector';
import { CategorySelectorMobileComponent } from './CategorySelectorMobile';

interface Category {
    id: string;
    name: string;
    image: string;
}

interface CategorySelectorResponsiveProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelect: (categoryId: string) => void;
    onReset: () => void;
}

export function CategorySelectorResponsive(props: CategorySelectorResponsiveProps) {

    useEffect(() => {
        const popoverElement = document.getElementById('popover');
        if (popoverElement) {
            popoverElement.style.display = 'none';
        }

    }, [props.selectedCategory]);

    return (
        <>
            <div className="flex justify-end p-4 md:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="shoppingcart" className="relative"  >
                            <div className="h-10 w-10 flex items-center justify-center">
                                <LayoutDashboardIcon className="text-white" />
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='md:hidden' id='popover'>
                        <CategorySelectorMobileComponent {...props} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="hidden md:block">
                <CategorySelectorComponent {...props} />
            </div>
        </>
    );
}