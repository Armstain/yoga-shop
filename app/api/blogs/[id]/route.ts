/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");

    console.log('Searching for blog with ID:', params.id);

    if (!ObjectId.isValid(params.id)) {
      console.log('Invalid ObjectId format');
      return NextResponse.json(
        { error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    const blog = await db
      .collection("blogs")
      .findOne({
        _id: new ObjectId(params.id)
      });

    console.log('Database query result:', blog);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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