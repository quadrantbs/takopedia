"use client";

import WishlistList from '@/components/wishlist/WishlistList';

export default function WishlistPage() {
    return (
        <div className="container mx-auto mt-8 mb-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Your Wishlist</h1>
            <WishlistList />
        </div>
    );
}
