import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {}

export const config = {
    matcher: ['/api/google/callback'],
};
