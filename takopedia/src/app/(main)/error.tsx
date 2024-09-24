"use client"

export type ErrorProps = {
  error: Error
}

export default function RegisterError({ error }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">An error occurred while loading the login page: {error.message}</h1>
    </div>
  );
}
