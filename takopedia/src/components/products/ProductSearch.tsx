// takopedia/src/components/products/ProductSearch.tsx

"use client";

import { useState, useEffect } from 'react';

interface ProductSearchProps {
    onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
            onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="border rounded py-2 px-4"
                placeholder="Search products..."
            />
            <button
                onClick={() => onSearch(query)} 
                className="bg-green-500 hover:bg-green-700 text-white rounded px-4 py-2 ml-2"
            >
                Search
            </button>
        </div>
    );
}
