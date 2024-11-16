/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    
    const blogs = await db.collection("blogs")
      .find({})
      .toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    const data = await request.json();
    
    const result = await db.collection("blogs")
      .insertOne(data);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add blog' },
      { status: 500 }
    );
  }
}
