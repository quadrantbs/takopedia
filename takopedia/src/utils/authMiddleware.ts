// takopedia/src/utils/authMiddleware.ts

import { cookies } from 'next/headers';
import { verifyToken } from './helpers';

export async function authMiddleware() {
    const token = (cookies().get('token'))?.value;;
    console.log(token)
    if (!token) {
        return null; 
    }

    try {
        const decoded = verifyToken(token);
        console.log(decoded)
        return decoded; 
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}
