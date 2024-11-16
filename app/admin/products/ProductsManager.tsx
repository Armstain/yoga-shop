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
    <div>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-ghost ml-2"
            onClick={() => {
              setIsEditing(null);
              setFormData({ name: '', description: '', price: '', image: '' });
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
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description.substring(0, 50)}...</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product._id)}
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

export default ProductsManager;
