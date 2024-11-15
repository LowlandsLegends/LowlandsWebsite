import React from "react";
import { Metadata } from "next";

import HomePageClient from "./homepage";

export const metadata: Metadata = {
    title: "LowlandsLegendsPVP",
};

const HomePage: React.FC = async () => {
    return (
        <div>
            <HomePageClient />
        </div>
    );
}
export default HomePage