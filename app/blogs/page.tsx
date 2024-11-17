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
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Yoga & Wellness Blog</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((post: Post) => (
                    <Link href={`/blogs/${post._id}`} key={post._id}>
                        <div className="card bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                            <figure className="relative h-56">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100 w-full">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                            </figure>
                            <div className="card-body p-6">
                                <h2 className="card-title text-lg text-black">{post.title}</h2>
                                <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                        </svg>
                                        {post.author}
                                    </span>
                                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2 mt-2">{post.content}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;