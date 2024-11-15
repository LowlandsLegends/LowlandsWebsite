// lib/getShopItemsData.ts
import fs from 'fs';
import path from 'path';

export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export async function getShopItemsData(): Promise<ShopItem[]> {
    // Initial shop items data without descriptions
    const items: ShopItem[] = [
        { id: '1', name: 'Starter Pack', description: '', price: 9.99, category: '1' },
        { id: '2', name: 'Dino Egg', description: '', price: 14.99, category: '2' },
        { id: '3', name: 'Blueprint: Advanced Base', description: '', price: 19.99, category: '3' },
        { id: '4', name: 'Rebuild Kit', description: '', price: 7.99, category: '4' },
        { id: '5', name: 'Boss Summoning Totem', description: '', price: 29.99, category: '5' },
        { id: '6', name: 'Mystery Lootbox', description: '', price: 4.99, category: '6' },
        { id: '7', name: 'Mystery Lootbox', description: '', price: 4.99, category: '6' },
    ];

    // Read markdown descriptions for each item
    for (const item of items) {
        const filePath = path.join(process.cwd(), 'data', 'shopItems', `${item.id}.md`);
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            item.description = fileContents;
        } catch (err) {
            console.error(`Error reading markdown file for item ${item.id}:`, err);
            item.description = 'Description not available.';
        }
    }

    return items;
}