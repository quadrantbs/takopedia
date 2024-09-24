// takopedia/src/components/products/ProductItem.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { product } from '../home/FeaturedProducts';
import WishlistButton from '../wishlist/WishlistButton';

interface ProductItemProps {
    product: product;
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <Link href={`/products/${product.slug}`}>
            <div className="border border-gray-700 bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer group">
                <div className="overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover rounded-md w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                </div>
                <h3 className="text-lg font-bold text-white mt-4 truncate">{product.name}</h3>
                <p className="text-green-400 text-sm mt-2">Rp {product.price}</p>
                <div className="py-4">
                    <WishlistButton productSlug={product.slug} />
                </div>
            </div>
        </Link>
    );
}

