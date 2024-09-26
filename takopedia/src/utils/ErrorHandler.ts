import { ZodError } from 'zod';
import { NextResponse } from 'next/server';

export class CostumError extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export function handleError(error: unknown) {
    if (error instanceof CostumError) {
        return NextResponse.json(
            { message: error.message },
            { status: error.status }
        );
    } else if (error instanceof ZodError) {
        return NextResponse.json(
            {
                message: error.errors.map(err => err.message).join(', ')
            },
            { status: 400 }
        );
    } else if (error instanceof Error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    } else {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
