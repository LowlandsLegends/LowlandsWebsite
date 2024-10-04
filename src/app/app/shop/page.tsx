import React from "react";
import CheckoutButton from "@components/CheckoutButton";

const ShopPage:React.FC = () => {
    const items = [
        { name: 'Product 1', price: 1000, quantity: 1 }, // price in cents
        { name: 'Product 2', price: 2000, quantity: 2 },
    ];
    return(
        
        <div>
            <CheckoutButton items={items}></CheckoutButton>
        </div>
    );
}
export default ShopPage