'use client';
import { InstagramEmbed } from 'react-social-media-embed';
import { useState, useEffect } from 'react';

const DEFAULT_POSTS = [
  'https://www.instagram.com/p/CjtkQXAPTId/',
  'https://www.instagram.com/p/CjtkQXAPTId/',
  'https://www.instagram.com/p/CjtkQXAPTId/',
];

const SocialMediaFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState<string[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('instagram_posts');
    setInstagramPosts(savedPosts ? JSON.parse(savedPosts) : DEFAULT_POSTS);
  }, []);

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Follow Us on Instagram</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((url, index) => (
            <div key={index} className="w-full">
              <InstagramEmbed url={url} width={328} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaFeed;