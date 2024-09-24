"use client"

import { ErrorProps } from "@/app/(main)/error";

export default function RegisterError({ error }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">An error occurred while loading the register page: {error.message}</h1>
    </div>
  );
}
