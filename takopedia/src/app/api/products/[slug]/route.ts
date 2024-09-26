// takopedia/src/app/api/products/[slug]/routes.ts

import { ProductModel } from '@/db/models/products';
import { handleError } from '@/utils/ErrorHandler';
// import { NextResponse } from 'next/server';

type paramsSlugTypes = {
    slug: string
}

export async function GET(request: Request, { params }: { params: paramsSlugTypes }) {
    try {
        const { slug } = params
        const products = await ProductModel.findBySlug(slug);
        return Response.json(products);
    } catch (error) {
        handleError(error)
    }
}
