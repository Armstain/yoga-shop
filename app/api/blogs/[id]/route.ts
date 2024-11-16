/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    const data = await request.json();
    
    const result = await db
      .collection("blogs")
      .updateOne(
        { _id: new ObjectId(params.id) },
        { $set: data }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");
    
    const result = await db
      .collection("blogs")
      .deleteOne({ 
        _id: new ObjectId(params.id) 
      });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error ) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 
