/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");

    const blog = await db
      .collection("blogs")
      .findOne({
        _id: new ObjectId(params.id)
      });

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
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
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
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
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
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 