// takopedia/src/app/api/products/route.ts

import { ProductModel } from '@/db/models/products';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const searchTerm = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    try {
        const products = await ProductModel.findAll(skip, limit, searchTerm);
        const totalProducts = await ProductModel.count(searchTerm);
        const totalPages = Math.ceil(totalProducts / limit);

        return NextResponse.json({
            products,
            totalProducts,
            totalPages,
            currentPage: page,
        });
    } catch (error: unknown) {
        let message = 'An unexpected error occurred';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json(
            { message },
            { status: 500 }
        );
    }
}
