'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";



const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setFeaturedProducts(data.slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <section aria-labelledby="featured-products" className="bg-white py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="featured-products" 
          className="text-4xl font-bold text-center text-primary mb-12 relative"
        >
          Featured Products
          <span className="block h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          {featuredProducts.map((product) => (
            <article 
              key={product._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 relative"
            >
              {product.image && (
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-base-content/70 mb-6 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link 
                    href={`/products/${product._id}`}
                    className="px-6 py-3 rounded-full bg-primary text-primary-content hover:bg-primary/90 transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
