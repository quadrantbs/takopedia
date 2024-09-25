// takopedia/src/app/api/products/routes.ts

import { ProductModel } from '@/db/models/products';
// import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = await ProductModel.findAll();
        return Response.json(products);
    } catch (error: any) {
        return Response.json(
            { message: error.message },
            { status: error.status || 500 }
        );
    }
}
