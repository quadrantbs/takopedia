"use client";

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { ProductTypes } from "@/types";

interface WishlistItemProps {
  product: ProductTypes;
}

export default function WishlistItem({ product }: WishlistItemProps) {
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
        <p className="text-green-400 text-sm mt-2">
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2,
          })}
        </p>
        <div className="py-4">
          <WishlistButton product={product} />
        </div>
      </div>
    </Link>
  );
}
