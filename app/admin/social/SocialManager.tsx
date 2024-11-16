// 'use client';
// import { useState, useEffect } from 'react';

// const DEFAULT_POSTS = [
//   'https://www.instagram.com/p/CjtkQXAPTId/',
//   'https://www.instagram.com/p/CjtkQXAPTId/',
//   'https://www.instagram.com/p/CjtkQXAPTId/',
// ];

// const STORAGE_KEY = 'instagram_posts';

// const SocialManager = () => {
//   const [posts, setPosts] = useState<string[]>([]);
//   const [newPostUrl, setNewPostUrl] = useState('');

//   useEffect(() => {
//     // Load posts from localStorage or use defaults
//     const savedPosts = localStorage.getItem(STORAGE_KEY);
//     setPosts(savedPosts ? JSON.parse(savedPosts) : DEFAULT_POSTS);
//   }, []);

//   const addPost = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newPostUrl.includes('instagram.com')) {
//       alert('Please enter a valid Instagram URL');
//       return;
//     }

//     const updatedPosts = [...posts, newPostUrl];
//     setPosts(updatedPosts);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
//     setNewPostUrl('');
//   };

//   const deletePost = (index: number) => {
//     const updatedPosts = posts.filter((_, i) => i !== index);
//     setPosts(updatedPosts);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Manage Instagram Posts</h2>
      
//       <form onSubmit={addPost} className="mb-8">
//         <div className="flex gap-4">
//           <input
//             type="url"
//             value={newPostUrl}
//             onChange={(e) => setNewPostUrl(e.target.value)}
//             placeholder="Enter Instagram post URL"
//             className="flex-1 input input-bordered"
//             required
//           />
//           <button type="submit" className="btn btn-primary">
//             Add Post
//           </button>
//         </div>
//       </form>

//       <div className="space-y-4">
//         {posts.map((url, index) => (
//           <div key={index} className="flex items-center justify-between p-4 border rounded">
//             <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//               {url}
//             </a>
//             <button
//               onClick={() => deletePost(index)}
//               className="btn btn-error btn-sm"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SocialManager;