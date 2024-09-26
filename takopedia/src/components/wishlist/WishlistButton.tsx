// takopedia/src/components/wishlist/WishlistButton.tsx

"use client";

import { ProductTypes } from "@/types";
import { updateWishlistCache } from "@/utils/actions";
import { baseUrl } from "@/utils/helpers";
import { useState, useEffect, MouseEvent } from "react";

interface WishlistButtonProps {
    product: ProductTypes;
    onWishlistChange: () => void;
}

export default function WishlistButton({ product, onWishlistChange }: WishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setIsInWishlist(product.isWishlisted)
    }, [product]);

    const handleWishlistAction = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = `${baseUrl}/api/wishlists`;
            const method = isInWishlist ? "DELETE" : "POST";
            const productId = product._id;
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': document.cookie
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isInWishlist ? "remove" : "add"} item from wishlist`);
            }

            updateWishlistCache()

            setIsInWishlist(!isInWishlist);
            onWishlistChange();
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