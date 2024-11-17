'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/types/products';

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); 
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `/api/products/${isEditing}` 
        : '/api/products';

      const method = isEditing ? axios.put : axios.post;

      const response = await method(url, {
        ...formData,
        price: parseFloat(formData.price),
      });

      if (response.status === 200 || response.status === 201) {
        fetchProducts();
        setFormData({ name: '', description: '', price: '', image: '' });
        setIsEditing(null);
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image || '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid gap-6 max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-100">
            <div className="form-control">
              <label className="label">
                <span className="text-gray-700 font-medium">Product Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="text-gray-700 font-medium">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="text-gray-700 font-medium">Price ($)</span>
              </label>
              <input
                type="number"
                step="0.01"
                className="input input-bordered bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="text-gray-700 font-medium">Image URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            
            <div className="flex gap-4 pt-2">
              <button 
                type="submit" 
                className="btn bg-primary hover:bg-primary/90 text-white border-none flex-1"
              >
                {isEditing ? '💾 Update Product' : '➕ Add Product'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => {
                    setIsEditing(null);
                    setFormData({ name: '', description: '', price: '', image: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="table bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600">Name</th>
                <th className="text-gray-600">Description</th>
                <th className="text-gray-600">Price</th>
                <th className="text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="font-medium text-black">{product.name}</td>
                  <td className="text-gray-600">{product.description.substring(0, 50)}...</td>
                  <td className="font-medium text-primary">${product.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                      onClick={() => handleDelete(product._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;
