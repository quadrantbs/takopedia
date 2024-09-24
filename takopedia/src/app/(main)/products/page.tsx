// takopedia/src/app/(main)/products/page.tsx

"use client";

import { useState, useEffect } from 'react';
import ProductList from '@/components/products/ProductList';
import ProductSearch from '@/components/products/ProductSearch';
import { product } from '@/components/home/FeaturedProducts';

export default function ProductsPage() {
    const [products, setProducts] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<product[]>([]);

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/products`, { cache: "no-store" });
            if (!response.ok) {
                throw new Error('Failed to fetch products.');
            }
            const data = await response.json();
            console.log(data);
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }

    }, [searchTerm, products]);

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductSearch onSearch={setSearchTerm} />
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Products</h1>
            {loading ? (
                <p className="text-center text-gray-300">Loading products...</p>
            ) : (
                <div>
                    {filteredProducts && filteredProducts.length > 0 ? (
                        <ProductList
                            products={filteredProducts}
                        />
                    ) : (
                        <div className="text-center text-gray-300">No Products Found</div>
                    )}

                </div>
            )}
        </div>
    );
}
