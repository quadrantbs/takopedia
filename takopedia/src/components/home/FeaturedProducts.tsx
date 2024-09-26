// src/components/home/FeaturedProducts.tsx
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductTypes } from '@/types';
import { baseUrl } from '@/utils/helpers';

export default function FeaturedProducts() {

    const [products, setProducts] = useState<ProductTypes[]>([]);

    async function fetchPosts() {
        try {
            const response = await fetch(`${baseUrl}/api/products`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = (await response.json()).products;
            setProducts(data?.sort(() => 0.5 - Math.random()).slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="my-8 sm:mx-20 md:mx-40 mx-10">
            <h2 className="text-2xl text-white font-bold text-center mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.slug} className=" border border-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-40 object-cover mb-4 rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
                            <p className="text-green-600 font-bold mb-4">Rp {product.price.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 2,
                            })}</p>
                            <Link href={`/products/${product.slug}`} className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                                View Product
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
