import { NextResponse } from 'next/server';
import { UserSchema, UserTypes } from '@/types';
import { hashPassword } from '@/utils/helpers';
import { UserModel } from '@/db/models/users';
import { handleError } from '@/utils/ErrorHandler';

export async function POST(request: Request) {
    try {
        const body = await request.json() as UserTypes;
        const result = UserSchema.safeParse(body);
        if (!result.success) {
            throw result.error;
        }

        const { name, username, email, password } = result.data;

        const existingUser = await UserModel.findByEmailOrUsername(email, username)

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = {
            name,
            username,
            email,
            password: hashedPassword,
        };

        await UserModel.create(newUser)

        return NextResponse.json({ message: `Registration with email ${newUser.email} was successful` });
    } catch (error) {
        return handleError(error);
    }
}

