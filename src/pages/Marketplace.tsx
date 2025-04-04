
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'toothbrush', name: 'Toothbrushes' },
  { id: 'toothpaste', name: 'Toothpastes' },
  { id: 'floss', name: 'Dental Floss' },
  { id: 'mouthwash', name: 'Mouthwash' },
  { id: 'whitening', name: 'Whitening Products' },
  { id: 'accessories', name: 'Accessories' },
];

const mockProducts = [
  {
    id: '1',
    name: 'Sonic Pro Electric Toothbrush',
    image: 'https://images.unsplash.com/photo-1572315831029-5e8146afb5f7?auto=format&fit=crop&w=500&q=80',
    price: 79.99,
    rating: 4.8,
    reviewCount: 342,
    category: 'toothbrush',
    inStock: true
  },
  {
    id: '2',
    name: 'Premium Teeth Whitening Kit',
    image: 'https://images.unsplash.com/photo-1625795188134-e68a12931bd3?auto=format&fit=crop&w=500&q=80',
    price: 49.99,
    rating: 4.6,
    reviewCount: 219,
    category: 'whitening',
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Mint Dental Floss',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=500&q=80',
    price: 8.99,
    rating: 4.7,
    reviewCount: 156,
    category: 'floss',
    inStock: true
  },
  {
    id: '4',
    name: 'Antibacterial Mouthwash',
    image: 'https://images.unsplash.com/photo-1612888473221-92ebd5c28dcf?auto=format&fit=crop&w=500&q=80',
    price: 12.99,
    rating: 4.5,
    reviewCount: 178,
    category: 'mouthwash',
    inStock: true
  },
  {
    id: '5',
    name: 'Sensitive Teeth Toothpaste',
    image: 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?auto=format&fit=crop&w=500&q=80',
    price: 6.99,
    rating: 4.9,
    reviewCount: 267,
    category: 'toothpaste',
    inStock: true
  },
  {
    id: '6',
    name: 'Water Flosser Professional',
    image: 'https://images.unsplash.com/photo-1621273583975-03f1793f3afb?auto=format&fit=crop&w=500&q=80',
    price: 69.99,
    rating: 4.6,
    reviewCount: 134,
    category: 'accessories',
    inStock: false
  },
  {
    id: '7',
    name: 'Kids Strawberry Toothpaste',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80',
    price: 5.99,
    rating: 4.8,
    reviewCount: 98,
    category: 'toothpaste',
    inStock: true
  },
  {
    id: '8',
    name: 'Bamboo Toothbrush Set',
    image: 'https://images.unsplash.com/photo-1575675069903-57c89daf1265?auto=format&fit=crop&w=500&q=80',
    price: 14.99,
    rating: 4.7,
    reviewCount: 221,
    category: 'toothbrush',
    inStock: true
  },
  {
    id: '9',
    name: 'Charcoal Teeth Whitening Powder',
    image: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?auto=format&fit=crop&w=500&q=80',
    price: 19.99,
    rating: 4.4,
    reviewCount: 112,
    category: 'whitening',
    inStock: true
  }
];

const Marketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Add to cart function
  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    
    // In a real app, you would send this to your backend
    console.log("Added to cart:", productId);
    
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-12 bg-sociodent-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Dental Product Marketplace
              </h1>
              <p className="text-lg text-gray-600">
                Find expert-recommended dental products to maintain your oral health between appointments.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div className="hidden md:flex flex-wrap gap-2">
                {productCategories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="mb-2"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden flex items-center"
                onClick={() => setShowMobileFilter(!showMobileFilter)}
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filter
              </Button>
            </div>
            
            {showMobileFilter && (
              <div className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {productCategories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowMobileFilter(false);
                      }}
                      className="mb-2"
                      size="sm"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try changing your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    category={product.category}
                    inStock={product.inStock}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
