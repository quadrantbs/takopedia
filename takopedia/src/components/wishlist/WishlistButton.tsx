// takopedia/src/components/wishlist/WishlistButton.tsx

"use client";

import { useState, useEffect } from "react";

interface WishlistButtonProps {
    productSlug: string;
}

export default function WishlistButton({ productSlug }: WishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkWishlist() {
            try {
                const response = await fetch(`http://localhost:3001/wishlist?slug=${productSlug}`);
                const wishlistItems = await response.json();
                if (wishlistItems.some((item: { slug: string }) => item.slug === productSlug)) {
                    setIsInWishlist(true);
                }
            } catch (error) {
                console.error("Error checking wishlist", error);
            }
        }

        checkWishlist();
    }, [productSlug]);

    const handleWishlistAction = async () => {
        setLoading(true);
        try {
            const url = `http://localhost:3001/wishlist?slug=${productSlug}`;
            const method = isInWishlist ? "DELETE" : "POST";
            const response = await fetch(url, { method });

            if (!response.ok) {
                throw new Error(`Failed to ${isInWishlist ? "remove" : "add"} item from wishlist`);
            }

            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error(`Error ${isInWishlist ? "removing" : "adding"} from wishlist`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleWishlistAction}
            className={`px-4 py-2 rounded-md ${isInWishlist ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} transition-colors duration-200 text-white`}
            disabled={loading}
        >
            {loading ? "Processing..." : isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
    );
}
