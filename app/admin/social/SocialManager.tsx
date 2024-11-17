'use client';
import { useState, useEffect } from 'react';

const DEFAULT_POSTS = [
  'https://www.instagram.com/p/CjtkQXAPTId/',
  'https://www.instagram.com/p/CjtkQXAPTId/',
  'https://www.instagram.com/p/CjtkQXAPTId/',
];

const STORAGE_KEY = 'instagram_posts';

const SocialManager = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [newPostUrl, setNewPostUrl] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    setPosts(savedPosts ? JSON.parse(savedPosts) : DEFAULT_POSTS);
  }, []);

  const addPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostUrl.includes('instagram.com')) {
      alert('Please enter a valid Instagram URL');
      return;
    }

    const updatedPosts = [...posts, newPostUrl];
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    setNewPostUrl('');
  };

  const deletePost = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Instagram Feed Manager</h2>
        
        <form onSubmit={addPost} className="mb-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex gap-4">
              <input
                type="url"
                value={newPostUrl}
                onChange={(e) => setNewPostUrl(e.target.value)}
                placeholder="Enter Instagram post URL"
                className="flex-1 input input-bordered bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
              <button 
                type="submit" 
                className="btn bg-primary hover:bg-primary/90 text-white border-none"
              >
                ➕ Add Post
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((url, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {url}
              </a>
              <button
                onClick={() => deletePost(index)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialManager;