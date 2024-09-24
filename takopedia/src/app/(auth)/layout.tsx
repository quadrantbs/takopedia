import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md p-8 rounded-lg shadow-md">
                {children}
            </div>
        </div>
    );
}
