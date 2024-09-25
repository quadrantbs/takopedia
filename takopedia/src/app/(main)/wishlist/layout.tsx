import ProtectedComponent from '@/components/auth/ProtectedComponent';
import React from 'react';

export default function WishlistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProtectedComponent>
            {children}
            </ProtectedComponent>
        </>
    );
}
