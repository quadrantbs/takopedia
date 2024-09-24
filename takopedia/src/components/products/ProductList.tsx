// takopedia\src\components\products\ProductList.tsx
"use client";

import ProductItem from './ProductItem';
import { product } from '../home/FeaturedProducts';

interface ProductListProps {
    products: product[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductItem
                    key={product.slug}
                    product={product}
                />
            ))}
        </div>
    );
}

