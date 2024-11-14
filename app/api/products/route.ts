/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    
    const products = await db.collection("products")
      .find({})
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    const data = await request.json();
    
    const result = await db.collection("products")
      .insertOne(data);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
} 