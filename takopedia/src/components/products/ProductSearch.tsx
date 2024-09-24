// takopedia/src/components/products/ProductSearch.tsx

"use client";

import { useState } from 'react';

interface ProductSearchProps {
    onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query); 
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded py-2 px-4"
                placeholder="Search products..."
            />
            <button
                onClick={handleSearch}
                className="bg-green-500 hover:bg-green-700 text-white rounded px-4 py-2 ml-2"
            >
                Search
            </button>
        </div>
    );
}
