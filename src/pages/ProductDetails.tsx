
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data - this would come from your backend in a real application
const mockProducts = [
  {
    id: '1',
    name: 'Sonic Pro Electric Toothbrush',
    image: 'https://images.unsplash.com/photo-1559304822-9eb5e14a44ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 79.99,
    rating: 4.8,
    reviewCount: 342,
    category: 'Electric Toothbrush',
    inStock: true,
    description: 'The Sonic Pro Electric Toothbrush uses advanced sonic technology with 40,000 vibrations per minute to provide a deep, thorough clean. The built-in 2-minute timer with 30-second interval notifications ensures you brush for the dentist-recommended time. The rechargeable battery lasts up to 30 days on a single charge.',
    features: [
      '40,000 vibrations per minute',
      '5 cleaning modes: Clean, White, Polish, Gum Care, Sensitive',
      'Smart pressure sensor',
      '2-minute timer with 30-second intervals',
      'Rechargeable battery with 30-day life',
      'Waterproof for shower use'
    ],
    specs: {
      'Battery Type': 'Lithium-ion',
      'Battery Life': '30 days',
      'Weight': '125g',
      'Modes': '5',
      'Included Heads': '3',
      'Warranty': '2 years'
    }
  },
  {
    id: '2',
    name: 'Premium Teeth Whitening Kit',
    image: 'https://images.unsplash.com/photo-1570001276999-bc13027db47b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 49.99,
    rating: 4.6,
    reviewCount: 219,
    category: 'Whitening',
    inStock: true,
    description: 'Our Premium Teeth Whitening Kit offers professional-grade whitening in the comfort of your home. The LED accelerator light speeds up the whitening process, while the custom-fit mouth trays ensure even application. The formula is safe for sensitive teeth and enamel, with visible results in just 3 days.',
    features: [
      'LED accelerator light technology',
      'Custom-fit mouth trays',
      'Enamel-safe whitening formula',
      'Results in 3 days',
      '14 treatments included',
      'Safe for sensitive teeth'
    ],
    specs: {
      'Treatment Time': '15 minutes daily',
      'Course Length': '14 days',
      'Active Ingredient': 'Carbamide Peroxide',
      'Shelf Life': '24 months',
      'Made In': 'USA',
      'FDA Approved': 'Yes'
    }
  },
  {
    id: '3',
    name: 'Organic Mint Dental Floss',
    image: 'https://images.unsplash.com/photo-1612887726773-e64e49123924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 8.99,
    rating: 4.7,
    reviewCount: 156,
    category: 'Floss',
    inStock: true,
    description: 'Our Organic Mint Dental Floss is made from 100% biodegradable silk and coated with natural candelilla wax. The refreshing mint essential oil leaves your breath fresh while the expanded fibers provide superior cleaning between teeth. The eco-friendly packaging is plastic-free and compostable.',
    features: [
      '100% biodegradable silk floss',
      'Natural candelilla wax coating',
      'Organic mint essential oil',
      'Expanded fibers for better cleaning',
      'Plastic-free packaging',
      'Refillable dispenser available'
    ],
    specs: {
      'Length': '30m (33yd)',
      'Material': 'Silk',
      'Coating': 'Candelilla Wax',
      'Flavor': 'Organic Mint',
      'Packaging': 'Compostable Paper',
      'Certifications': 'Organic, Vegan'
    }
  }
];

const relatedProducts = [
  {
    id: '5',
    name: 'Sensitive Teeth Toothpaste',
    image: 'https://images.unsplash.com/photo-1598255777148-a7b2d18321d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 6.99,
    rating: 4.9,
    reviewCount: 267,
    category: 'Toothpaste',
    inStock: true
  },
  {
    id: '8',
    name: 'Bamboo Toothbrush Set',
    image: 'https://images.unsplash.com/photo-1616709073893-d7a2c3a4aa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 14.99,
    rating: 4.7,
    reviewCount: 221,
    category: 'Toothbrush',
    inStock: true
  },
  {
    id: '4',
    name: 'Antibacterial Mouthwash',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    price: 12.99,
    rating: 4.5,
    reviewCount: 178,
    category: 'Mouthwash',
    inStock: true
  }
];

const ProductDetails = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/marketplace">
              <Button>Return to Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    // In a real app, you would send this to your backend
    console.log("Added to cart:", {
      productId: product.id,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container-custom py-12">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-8">
            <Link to="/marketplace" className="text-gray-500 hover:text-sociodent-600 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Marketplace
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Product Image */}
            <div className="glass-card border border-white/50 rounded-2xl overflow-hidden p-8 bg-white">
              <div className="aspect-square relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-sociodent-100 text-sociodent-700 px-2 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sociodent-500 mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <div className="text-gray-500">{key}</div>
                      <div className="font-medium">{value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-sociodent-600 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-2 border-r disabled:opacity-50"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    className="px-3 py-2 border-l"
                    onClick={handleIncreaseQuantity}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <Button 
                  className="flex-1 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Button variant="outline" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                {product.inStock 
                  ? <span className="text-green-600 font-medium">✓ In Stock</span> 
                  : <span className="text-red-600 font-medium">✕ Out of Stock</span>
                }
                <span className="mx-2">•</span>
                Free shipping on orders over $50
                <span className="mx-2">•</span>
                2-year warranty
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <Link to="/marketplace" className="text-sociodent-600 font-medium flex items-center hover:text-sociodent-700">
                View All Products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="glass-card rounded-2xl overflow-hidden card-hover">
                  <Link to={`/marketplace/${relatedProduct.id}`} className="block relative aspect-square">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-contain p-4"
                      loading="lazy" 
                    />
                    <div className="absolute top-3 left-3 bg-sociodent-100 text-sociodent-700 px-2 py-1 rounded-full text-xs font-medium">
                      {relatedProduct.category}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/marketplace/${relatedProduct.id}`} className="hover:text-sociodent-600 transition-colors">
                      <h3 className="font-medium text-gray-900 leading-snug">{relatedProduct.name}</h3>
                    </Link>
                    
                    <div className="flex items-center mt-2 mb-3">
                      <div className="flex items-center text-sm">
                        <Star className="text-yellow-400 w-4 h-4 mr-1" />
                        <span className="font-medium">{relatedProduct.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-xs ml-1">({relatedProduct.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                      <button 
                        className="w-9 h-9 flex items-center justify-center bg-sociodent-500 text-white rounded-full hover:bg-sociodent-600 transform active:scale-95 transition-all"
                        aria-label="Add to cart"
                        onClick={() => {
                          toast({
                            title: "Added to cart",
                            description: "Product has been added to your cart",
                          });
                        }}
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
