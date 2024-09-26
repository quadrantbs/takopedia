import { ObjectId } from 'mongodb';
import { z } from 'zod';

export type ProductTypes = {
    isWishlisted: boolean;
    _id: ObjectId
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    images: string[]
    createdAt: string
    updatedAt: string
}

export const UserSchema = z.object({
    name: z.string().optional(),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Length of password must be at least 5 characters" })
});

export type UserTypes = z.infer<typeof UserSchema>

export type UserCookies = Omit<UserTypes, 'password'> & {
    _id: ObjectId;
};

export type WishlistTypes = {
    userId: ObjectId
    productId: ObjectId
    createdAt: Date
    updatedAt: Date
}