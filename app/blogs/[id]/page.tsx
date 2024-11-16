'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    publishedDate: string;
    slug: string;
    image: string;
}

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blogs/${id}`);
                
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
        
                const data: Blog = await response.json();
                setBlog(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load blog');
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchBlog();
    }, [id]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"/>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="text-red-500 mb-4">{error}</p>
        </div>;
    }

    if(!blog) {
        return <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="text-red-500 mb-4">Blog not found</p>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {blog.image && (
                <div className="mb-8">
                    <Image 
                        src={blog.image}
                        alt={blog.title}
                        width={1200}
                        height={400}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center text-gray-600 mb-8">
                <p className="mr-4">By {blog.author}</p>
                <p>{(blog.publishedDate)}</p>
            </div>
            <div className="prose max-w-none">{blog.content}</div>
        </div>
    );
};

export default BlogDetailPage;