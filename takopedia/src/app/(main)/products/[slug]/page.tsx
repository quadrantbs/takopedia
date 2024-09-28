// takopedia/src/app/(main)/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import React from 'react';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { ProductTypes } from '@/types';
import { Metadata } from 'next';
import { baseUrl } from '@/utils/helpers';
import { cookies } from 'next/headers';

interface ProductDetailProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
    const { slug } = params;
    const response = await fetch(`${baseUrl}/api/products/${slug}`);
    const product: ProductTypes = await response.json();
    return {
        title: product?.name,
        description: product?.description,
        openGraph: {
            title: product?.name,
            description: product?.description,
            url: `${baseUrl}/products/${slug}`,
            images: [
                {
                    url: product?.thumbnail,
                    width: 800,
                    height: 600,
                },
            ],
            type: 'website',
        },
    };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
    const { slug } = params;
    const response = await fetch(`${baseUrl}/api/products/${slug}`, {
        cache: "no-store"
    });
    const product: ProductTypes = await response.json();
    const responseWishlist = await fetch(`${baseUrl}/api/wishlists`, {
        cache: "no-store",
        headers: {
            'Cookie': cookies().toString()
        },
        next: {
            tags: ["wishlists"]
        }
    });
    let updatedProduct
    if (!responseWishlist.ok) {
        updatedProduct = product
    } else {
        const dataWishlist = await responseWishlist.json();
        const productIds = dataWishlist.map((item: ProductTypes) => (item._id));
        updatedProduct = { ...product, isWishlisted: productIds.includes(product._id) }
    }

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
                    <p className="mt-6 text-2xl font-semibold text-green-400">
                        {product.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 2,
                        })}
                    </p>
                    <div className="py-4">
                        <WishlistButton product={updatedProduct} onWishlistChange={
                            async () => {
                                "use server"
                                return;
                            }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
