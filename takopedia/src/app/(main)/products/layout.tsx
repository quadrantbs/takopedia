// takopedia/src/app/(main)/products/layout.tsx

"use client"; // Ensure this is a Client Component

import { ReactNode } from 'react';

interface ProductsLayoutProps {
    children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {

    return (
        <>
            <div>{children}</div>
        </>
    );
}
