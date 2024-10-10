'use client';

import React, { useState } from 'react';
import { ShopItems, ShopItem } from './ShopItems';
import { CategorySelectorComponent } from './CategorySelector';
import styles from './ShopClient.module.scss';

interface ShopClientProps {
    shopItemsData: ShopItem[];
    categories: { id: string; name: string; image: string }[];
}

const ShopClient: React.FC<ShopClientProps> = ({ shopItemsData, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleCategoryReset = () => {
        setSelectedCategory(null);
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
                    <ShopItems shopItems={filteredItems} />
                </div>
            </div>
        </div>
    );
};

export default ShopClient;
