/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle GET request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");

    // Validate ID format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    // Fetch the blog by ID
    const blog = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(params.id) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Yoga-shop");

    // Parse request body
    const data = await request.json();

    // Basic validation (example: check if title exists)
    if (!data.title || !data.content) {
      return NextResponse.json(
        { success: false, error: 'Invalid data. Title and content are required.' },
        { status: 400 }
      );
    }

    // Insert into the database
    const result = await db.collection("blogs").insertOne(data);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add blog' },
      { status: 500 }
    );
  }
}
