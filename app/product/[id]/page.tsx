'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InquiryForm from '@/components/inquiry-form';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-900">
            Shuddhi
          </Link>
        </div>
      </nav>

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/" className="text-purple-600 hover:text-purple-700 mb-8 inline-flex">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-96">
              <img
                src={product.image || '/placeholder.svg?key=3bbgl'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-purple-600 mb-4">₹{product.price}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-purple-600 font-bold mt-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient: string, i: number) => (
                      <span
                        key={i}
                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dosage */}
            {product.dosage && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Dosage:</span> {product.dosage}
                </p>
              </div>
            )}

            {/* Inquiry Section */}
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent>
                <InquiryForm productId={product._id} productName={product.name} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
