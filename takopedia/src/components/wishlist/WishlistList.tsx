"use client";

import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { product } from "../home/FeaturedProducts";

export default function WishlistList() {
    const [wishlist, setWishlist] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const response = await fetch("http://localhost:3001/wishlist");

                if (!response.ok) {
                    throw new Error("Failed to fetch wishlist");
                }

                const data = await response.json();
                setWishlist(data);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlist();
    }, []);

    if (loading) {
        return <p className="container mx-auto mt-8 mb-8 text-center">Loading wishlist...</p>;
    }

    if (wishlist.length === 0) {
        return <p className="container mx-auto mt-8 mb-8 text-center">Your wishlist is empty.</p>;
    }

    return (
        <div className="grid gap-4">
            {wishlist.map((product) => (
                <WishlistItem key={product.slug} product={product} />
            ))}
        </div>
    );
}
