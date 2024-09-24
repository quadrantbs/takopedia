// takopedia/src/components/wishlist/WishlistItem.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { product } from "../home/FeaturedProducts";

interface WishlistItemProps {
  product: product;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  return (
    <div className="shadow-md block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-48 object-cover"
        />
      </Link>

      <Link href={`/products/${product.slug}`} className="p-4 block mb-2">
        <h3 className="text-lg font-bold text-white">{product.name}</h3>
        <p className="text-green-600 font-semibold">Rp {product.price}</p>
      </Link>

      <div className="p-4">
        <WishlistButton productSlug={product.slug} />
      </div>
    </div>
  );
}
