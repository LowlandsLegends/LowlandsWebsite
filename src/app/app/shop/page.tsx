'use client';
import React from "react";
import { CategorySelectorComponent } from "@/components/category-selector";
import styles from './page.module.scss'


const categories = [
    { id: "1", name: "Starter kits", image: "/images/ascended_tier.jpg" },
    { id: "2", name: "Dino's", image: "/images/ascended_tier.jpg" },
    { id: "3", name: "Blueprints", image: "/images/ascended_tier.jpg" },
    { id: "4", name: "Rebuild kits", image: "/images/ascended_tier.jpg" },
    { id: "5", name: "Boss kits", image: "/images/ascended_tier.jpg" },
    { id: "6", name: "Lootboxes", image: "/images/ascended_tier.jpg" }
]


const ShopPage:React.FC = () => {
    const handleCategorySelect = (categoryId: string) => {
        console.log("Selected category:", categoryId)
        // Add your logic here to update the displayed products based on the selected category
    }
    return(
        <div style={{height:'90%', display:'flex'}}>
            <div className={styles.main} style={{marginLeft:"10px"}}>
                <CategorySelectorComponent categories={categories} onSelect={handleCategorySelect} />
            </div>
        </div>
    );
}
export default ShopPage