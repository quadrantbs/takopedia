// takopedia/src/db/models/users.ts

import { db } from '@/db/config';
import { UserTypes } from '@/types';
import { ObjectId } from 'mongodb';

export class UserModel {
    static collection() {
        return db.collection<UserTypes>('users');
    }

    static async findById(id: string) {
        return await this.collection().findOne({ _id: new ObjectId(id) });
    }

    static async findByEmailOrUsername(email: string, username?: string) {
        return await this.collection().findOne({
            $or: [{ email }, { username }]
        });
    }

    static async create(user: UserTypes) {
        return await this.collection().insertOne(user);
    }
}
