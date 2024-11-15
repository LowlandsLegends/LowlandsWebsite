import React from "react";
import ShopClient from "@components/shop/ShopClient";
import { getShopItemsData } from "@lib/getShopItemsData";
import { Metadata } from "next";


const categories = [
    { id: "1", name: "Starter kits", image: "/images/ascended_tier.jpg" },
    { id: "2", name: "Dino's", image: "/images/ascended_tier.jpg" },
    { id: "3", name: "Blueprints", image: "/images/ascended_tier.jpg" },
    { id: "4", name: "Rebuild kits", image: "/images/ascended_tier.jpg" },
    { id: "5", name: "Boss kits", image: "/images/ascended_tier.jpg" },
    { id: "6", name: "Lootboxes", image: "/images/ascended_tier.jpg" }
]

export const metadata: Metadata = {
    title: "Shop",
};

const ShopPage: React.FC = async () => {
    const shopItemsData = await getShopItemsData();
    return (
        <div>
            <ShopClient shopItemsData={shopItemsData} categories={categories}  />
        </div>
    );
}
export default ShopPage