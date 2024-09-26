"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function saveCookies(token: string) {
    cookies().set('token', `Bearer ${token}`);
}

export async function updateWishlistCache() {
    revalidateTag("wishlists")
}