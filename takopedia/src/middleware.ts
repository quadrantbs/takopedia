import { UserCookies } from '@/types';
import { jwtVerify } from "jose";
import { WithId } from "mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CostumError, handleError } from './utils/ErrorHandler';

async function auth(request: NextRequest) {
    const authCookie = cookies().get("token");
    if (!authCookie) throw new CostumError("Invalid token", 401);

    const [type, token] = authCookie.value.split(" ");
    if (type !== "Bearer") throw new CostumError("Invalid token", 401);

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<WithId<UserCookies>>(token, jwtSecret)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload._id.toString());
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-username", payload.username);

    return requestHeaders
}

export async function middleware(request: NextRequest) {
    try {
        const requestHeaders = await auth(request);

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    } catch (error) {
        return handleError(error)
    }
}

export const config = {
    matcher: [
        "/api/wishlists/:path*"
    ]
}