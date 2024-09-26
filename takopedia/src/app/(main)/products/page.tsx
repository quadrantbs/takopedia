// takopedia/src/app/(main)/products/page.tsx

"use client";

import { useState, useEffect } from 'react';
import ProductList from '@/components/products/ProductList';
import ProductSearch from '@/components/products/ProductSearch';
import { ProductTypes } from '@/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { baseUrl } from '@/utils/helpers';

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);

    async function fetchWishlist() {
        try {
            const response = await fetch(`${baseUrl}/api/wishlists`, {
                method: 'GET',
                headers: {
                    'Cookie': document.cookie
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist.');
            }
            const data = await response.json();
            const productIds = data.map((item: ProductTypes) => (item._id));
            setWishlistProductIds(productIds);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchProducts(newPage: number, searchQuery: string = '') {
        try {
            const response = await fetch(
                `${baseUrl}/api/products?page=${newPage}&limit=6&search=${searchQuery}`,
                { cache: "no-cache" }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch products.');
            }
            const data = await response.json();

            if (data.products.length < 6) {
                setHasMore(false);
            }

            const updatedProducts = data.products.map((product: ProductTypes) => ({
                ...product,
                isWishlisted: wishlistProductIds.includes(String(product._id))
            }));

            if (newPage === 1) {
                setProducts(updatedProducts);
            } else {
                setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setPage(1);
            fetchProducts(1, '');
            setHasMore(true);
        } else {
            setPage(1);
            fetchProducts(1, searchTerm);
            setHasMore(true);
        }
    }, [searchTerm, wishlistProductIds]);

    const fetchMoreProducts = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, searchTerm);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductSearch onSearch={setSearchTerm} />
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Products</h1>

            {loading && page === 1 ? (
                <p className="text-center text-gray-300">Loading products...</p>
            ) : products.length == 0 ? (
                <p className="text-center text-gray-300 my-8">No products found</p>
            ) : (
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreProducts}
                    hasMore={hasMore}
                    loader={<p className="text-center text-gray-300 my-8">Loading more products...</p>}
                    endMessage={<p className="text-center text-gray-300 my-8">No more products</p>}
                >
                    <ProductList products={products} />
                </InfiniteScroll>
            )}
        </div>
    );
}
