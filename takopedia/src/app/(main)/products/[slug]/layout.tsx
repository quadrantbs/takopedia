// takopedia\src\app\(main)\products\[slug]\layout.tsx

import React from 'react';

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
};

export default ProductDetailLayout;
