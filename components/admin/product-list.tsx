'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductListProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: () => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setDeleting(id);
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
          onDelete();
        }
      } catch (error) {
        console.error('Failed to delete:', error);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No products yet. Create your first product!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product._id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2">
                  {product.category}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <p className="text-2xl font-bold text-purple-600 mb-4">₹{product.price}</p>
            <div className="space-y-2 mb-4">
              {product.benefits?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-700">Benefits:</p>
                  <p className="text-xs text-gray-600">{product.benefits.slice(0, 2).join(', ')}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => handleDelete(product._id)}
                disabled={deleting === product._id}
                variant="destructive"
                className="flex-1"
              >
                {deleting === product._id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
