import React from "react";
import { Metadata } from "next";

import HomePage from "./homepage";

export const metadata: Metadata = {
    title: "LowlandsLegendsPVP",
};

const ShopPage: React.FC = async () => {
    return (
        <div>
            <HomePage />
        </div>
    );
}
export default ShopPage