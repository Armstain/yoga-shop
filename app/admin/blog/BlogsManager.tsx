'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  image: string;
}

const BlogsManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `/api/blogs/${isEditing}`
        : '/api/blogs';
      
      const method = isEditing ? axios.put : axios.post;
      
      const response = await method(url, {
        ...formData,
        publishedDate: new Date().toISOString()
      });

      if (response.status === 200 || response.status === 201) {
        fetchBlogs();
        setFormData({ title: '', content: '', author: '', image: '' });
        setIsEditing(null);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await axios.delete(`/api/blogs/${id}`);
      
      if (response.status === 200) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setIsEditing(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: blog.image
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Content</label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Author</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Image URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Blog' : 'Add Blog'}
        </button>
        {isEditing && (
          <button 
            type="button" 
            className="btn btn-ghost ml-2"
            onClick={() => {
              setIsEditing(null);
              setFormData({ title: '', content: '', author: '', image: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.content.substring(0, 50)}...</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsManager;