import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserCookies } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const signToken = (userData: UserCookies): string => {
    return jwt.sign( userData , JWT_SECRET);
};

export const verifyToken = (token: string): string | JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log(error)
        return null;
    }
};

