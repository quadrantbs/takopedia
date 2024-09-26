// takopedia/src/db/models/products.ts

import { db } from '@/db/config';
import { ProductTypes } from '@/types';
import { ObjectId } from 'mongodb';

export class ProductModel {
    static collection() {
        return db.collection<ProductTypes>('products');
    }

    static async findAll(skip: number = 0, limit: number = 10, searchTerm: string = '') {
        const query = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            }
            : {};

        return await this.collection()
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    static async count(searchTerm: string = '') {
        const query = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            }
            : {};

        return await this.collection().countDocuments(query);
    }

    static async findBySlug(slug: string) {
        return await this.collection().findOne({ slug });
    }

    static async findById(id: ObjectId) {
        return await this.collection().findOne({ _id: id });
    }

    static async create(product: ProductTypes) {
        return await this.collection().insertOne(product);
    }

    static async updateBySlug(slug: string, product: Partial<ProductTypes>) {
        return await this.collection().updateOne({ slug }, { $set: product });
    }

    static async deleteBySlug(slug: string) {
        return await this.collection().deleteOne({ slug });
    }
}
