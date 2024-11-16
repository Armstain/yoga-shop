'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    publishedDate: string;
    slug: string;
    image: string;
}


const BlogPage = () => {
    const [blogs, setBlogs] = useState<Post[]> ([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Yoga & Wellness Blog</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((post: Post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200" />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <h3 className="text-gray-600 mb-4 line-clamp-3">{post.author}</h3>
              <h4 className="text-gray-600 mb-4 line-clamp-3">{post.publishedDate}</h4>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <Link 
                href={`/blogs/${post._id}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
            </div>
        </div>
    )
}

export default BlogPage;