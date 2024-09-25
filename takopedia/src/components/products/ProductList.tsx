// takopedia\src\components\products\ProductList.tsx
"use client";

import { ProductTypes } from '@/types';
import ProductItem from './ProductItem';

interface ProductListProps {
    products: ProductTypes[];
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

