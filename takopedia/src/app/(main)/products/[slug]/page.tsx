// takopedia/src/app/(main)/products/[slug]/page.tsx

import { product } from '@/components/home/FeaturedProducts';
import { notFound } from 'next/navigation';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import React from 'react';
import WishlistButton from '@/components/wishlist/WishlistButton';

interface ProductDetailProps {
    params: {
        slug: string;
    };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
    const { slug } = params;

    const response = await fetch(`http://localhost:3001/products?slug=${slug}`);
    const product: product = (await response.json())[0];

    if (!product) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-full lg:w-1/2">
                    <ProductImageGallery images={product.images} thumbnail={product.thumbnail} name={product.name} />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
                    <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                    <p className="mt-4 text-lg text-gray-300">{product.description}</p>
                    <p className="mt-6 text-2xl font-semibold text-green-400">Rp {product.price}</p>
                    <div className="py-4">
                        <WishlistButton productSlug={product.slug} />
                    </div>
                </div>
            </div>
        </div >
    );
}
