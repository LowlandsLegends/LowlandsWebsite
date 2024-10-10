import React from "react";
import { CategorySelectorComponent } from "@components/CategorySelector";
import { ShopItems, ShopItem } from "@components/ShopItems";
import styles from './page.module.scss'
import ShopClient from "../../components/ShopClient";
import { getShopItemsData } from "./getShopItemsData";


const categories = [
    { id: "1", name: "Starter kits", image: "/images/ascended_tier.jpg" },
    { id: "2", name: "Dino's", image: "/images/ascended_tier.jpg" },
    { id: "3", name: "Blueprints", image: "/images/ascended_tier.jpg" },
    { id: "4", name: "Rebuild kits", image: "/images/ascended_tier.jpg" },
    { id: "5", name: "Boss kits", image: "/images/ascended_tier.jpg" },
    { id: "6", name: "Lootboxes", image: "/images/ascended_tier.jpg" }
]


const ShopPage: React.FC = async () => {
    const shopItemsData = await getShopItemsData();
    return (
        <ShopClient shopItemsData={shopItemsData} categories={categories}  />
    );
}
export default ShopPage