// takopedia/src/components/wishlist/WishlistList.tsx

"use client";

import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { ProductTypes } from "@/types";
import { baseUrl } from "@/utils/helpers";

export default function WishlistList() {
    const [wishlist, setWishlist] = useState<ProductTypes[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/wishlists`, {
                headers: { Cookie: document.cookie }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch wishlist");
            }
            const data = await response.json();
            setWishlist(data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return <p className="container mx-auto mt-8 mb-8 text-center">Loading wishlist...</p>;
    }

    if (wishlist.length === 0) {
        return <p className="container mx-auto mt-8 mb-8 text-center">Your wishlist is empty.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wishlist.map((product) => (
                <WishlistItem key={product.slug} product={product} onWishlistChange={fetchWishlist} />
            ))}
        </div>
    );
}
