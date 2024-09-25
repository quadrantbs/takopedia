// src/components/home/FeaturedProducts.tsx
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductTypes } from '@/types';

export default function FeaturedProducts() {

    const [products, setProducts] = useState<ProductTypes[]>([]);

    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setProducts(data.sort(() => 0.5 - Math.random()).slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="my-8 mx-60">
            <h2 className="text-2xl text-white font-bold text-center mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.slug} className="border rounded-lg p-4 shadow-lg">
                        <Image src={product.thumbnail} alt={product.name} width={400} height={400} className="w-full h-40 object-cover mb-4 rounded-lg" />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-green-600 font-bold">Rp {product.price}</p>
                        <Link href={`/products/${product.slug}`} className="block mt-4 text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            View Products
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
