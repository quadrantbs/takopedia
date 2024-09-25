import { NextResponse } from 'next/server';
import { comparePasswords, signToken } from '@/utils/helpers';
import { UserModel } from '@/db/models/users';
import { handleError } from '@/utils/ErrorHandler';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email) {
            return NextResponse.json({ message: 'Email cannot be empty' }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ message: 'Email cannot be empty' }, { status: 400 });
        }

        const user = await UserModel.findByEmailOrUsername(email)
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }
        const isPasswordValid = await comparePasswords(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const userLoggedIn = { _id: user._id, username: user.username, email: user.email }

        const token = signToken(userLoggedIn);

        cookies().set('token', `Bearer ${token}`);
        cookies().set('userLoggedIn', JSON.stringify(userLoggedIn));

        return NextResponse.json({ message: `Login successful! Welcome, ${user.name}`, token, userLoggedIn });
    } catch (error) {
        return handleError(error);
    }
}

