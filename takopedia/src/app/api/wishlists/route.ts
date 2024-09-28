// takopedia/src/app/api/wishlists/route.ts

import { NextResponse } from 'next/server';
import { WishlistModel } from '@/db/models/wishlists';
import { ObjectId } from 'mongodb';
import { ProductModel } from '@/db/models/products';
import { handleError } from '@/utils/ErrorHandler';

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { productId } = data;
        const userId = String(request.headers.get('x-user-id'));
        const isInWishlist = await WishlistModel.isProductInWishlist(userId, productId);
        if (isInWishlist) {
            return NextResponse.json({ message: 'Product already in wishlist' }, { status: 400 });
        }

        await WishlistModel.addToWishlist(userId, productId);
        return NextResponse.json({ message: 'Product added to wishlist' });
    } catch (error) {
        return handleError(error)
    }
}

export async function DELETE(request: Request) {
    try {
        const { productId } = await request.json();
        const userId = String(request.headers.get('x-user-id'));

        const isInWishlist = await WishlistModel.isProductInWishlist(userId, productId);
        if (!isInWishlist) {
            return NextResponse.json({ message: 'Product not found in wishlist' }, { status: 400 });
        }

        await WishlistModel.removeFromWishlist(userId, productId);
        return NextResponse.json({ message: 'Product removed from wishlist' });
    } catch (error) {
        return handleError(error)
    }
}

export async function GET(request: Request) {
    try {
        const userId = String(request.headers.get('x-user-id'));
        const wishlists = await WishlistModel.findByUserId(userId!);
        const productIds = wishlists.map((wishlist: { productId: ObjectId }) => wishlist.productId);
        const products = await Promise.all(
            productIds.map(productId => ProductModel.findById(productId))
        );
        return NextResponse.json(products);
    } catch (error) {
        return handleError(error)
    }
}
