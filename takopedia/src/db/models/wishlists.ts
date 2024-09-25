// takopedia/src/db/models/wishlists.ts

import { db } from '@/db/config';
import { WishlistTypes } from '@/types';
import { ObjectId } from 'mongodb';

export class WishlistModel {
    static collection() {
        return db.collection<WishlistTypes>('wishlists');
    }

    static async findByUserId(userId: string) {
        return await this.collection().find({ userId: new ObjectId(userId) }).toArray();
    }

    static async addToWishlist(userId: string, productId: string) {
        const wishlistItem = {
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return await this.collection().insertOne(wishlistItem);
    }

    static async removeFromWishlist(userId: string, productId: string) {
        return await this.collection().deleteOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });
    }

    static async isProductInWishlist(userId: string, productId: string) {
        return await this.collection().findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });
    }
}
