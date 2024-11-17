'use client';

import { useState } from 'react';
import ProductsManager from './products/ProductsManager';
import BlogsManager from './blog/BlogsManager';
import SocialManager from './social/SocialManager';


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="p-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === 'products' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={`tab ${activeTab === 'blogs' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          Blogs
        </button>
        <button 
          className={`tab ${activeTab === 'social' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Social
        </button>
      </div>

      {activeTab === 'products' ? <ProductsManager /> : activeTab === 'blogs' ? <BlogsManager /> : <SocialManager />}
    </div>
  );
};

export default AdminPage;