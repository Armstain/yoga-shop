'use client';
import { InstagramEmbed } from 'react-social-media-embed';

const SocialMediaFeed = () => {
  const instagramPosts = [
    'https://www.instagram.com/p/CjtkQXAPTId/',
    'https://www.instagram.com/p/CjtkQXAPTId/',
    'https://www.instagram.com/p/CjtkQXAPTId/',
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Follow Us on Instagram</h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instagramPosts.map((url, index) => (
            <div key={index} className="card bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-4">
              <InstagramEmbed url={url} width={328} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFeed;