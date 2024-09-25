"use server"

import { cookies } from "next/headers";

export async function saveCookies(token: string) {
    cookies().set('token', `Bearer ${token}`);
}