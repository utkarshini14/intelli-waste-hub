
import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ItemCard, { MarketplaceItem } from './ItemCard';

// Mock marketplace data
const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Cardboard boxes (moving boxes)',
    description: 'Collection of 10 sturdy cardboard boxes in good condition, perfect for moving or storage.',
    price: null,
    isFree: true,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Cardboard+Boxes',
    category: 'Paper & Cardboard',
    location: 'Downtown',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Scrap metal pieces',
    description: 'Various metal scraps from a home renovation project. Good for recycling or craft projects.',
    price: 25,
    isFree: false,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Scrap+Metal',
    category: 'Metal',
    location: 'West End',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Used glass jars',
    description: 'Collection of clean glass jars with lids, various sizes. Perfect for storage or DIY projects.',
    price: null,
    isFree: true,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Glass+Jars',
    category: 'Glass',
    location: 'North Side',
    postedDate: new Date(),
  },
  {
    id: '4',
    title: 'Plastic storage containers',
    description: 'Set of 5 plastic storage containers with lids. Clean and ready to use.',
    price: 15,
    isFree: false,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Plastic+Containers',
    category: 'Plastic',
    location: 'East Village',
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Empty paint cans',
    description: 'Collection of empty paint cans, cleaned and ready for proper disposal or reuse.',
    price: null,
    isFree: true,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Paint+Cans',
    category: 'Metal',
    location: 'South Bay',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Wooden pallets',
    description: 'Three wooden pallets in good condition. Great for DIY furniture projects or gardening.',
    price: 20,
    isFree: false,
    image: 'https://placehold.co/400x300/e2e8f0/1e293b?text=Wooden+Pallets',
    category: 'Wood',
    location: 'Riverside',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Paper & Cardboard',
  'Metal',
  'Glass',
  'Plastic',
  'Wood',
  'Electronics',
  'Textiles',
  'Other'
];

const MarketplaceList: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItem[]>(mockMarketplaceItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter items based on search, category, and price
  useEffect(() => {
    let filteredItems = mockMarketplaceItems;
    
    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }
    
    // Filter by price
    if (priceFilter === 'free') {
      filteredItems = filteredItems.filter(item => item.isFree);
    } else if (priceFilter === 'paid') {
      filteredItems = filteredItems.filter(item => !item.isFree);
    }
    
    setItems(filteredItems);
  }, [searchTerm, selectedCategory, priceFilter]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  const handlePriceFilter = (filter: 'all' | 'free' | 'paid') => {
    setPriceFilter(filter);
  };
  
  return (
    <div className="w-full">
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intelliwaste-gray-dark" size={18} />
            <input
              type="text"
              placeholder="Search for waste materials..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-intelliwaste-gray-medium focus:border-intelliwaste-blue focus:ring-1 focus:ring-intelliwaste-blue/30 outline-none transition-all"
            />
          </div>
          
          <button
            onClick={toggleFilters}
            className="md:hidden px-4 py-3 rounded-lg border border-intelliwaste-gray-medium flex items-center gap-2 hover:bg-intelliwaste-gray transition-colors"
          >
            <Filter size={18} />
            Filters
          </button>
          
          <div className="hidden md:flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-3 rounded-lg border border-intelliwaste-gray-medium focus:border-intelliwaste-blue focus:ring-1 focus:ring-intelliwaste-blue/30 outline-none transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <div className="flex rounded-lg border border-intelliwaste-gray-medium overflow-hidden">
              <button
                onClick={() => handlePriceFilter('all')}
                className={`px-4 py-2 text-sm ${
                  priceFilter === 'all' 
                    ? 'bg-intelliwaste-blue text-white' 
                    : 'bg-white hover:bg-intelliwaste-gray'
                } transition-colors`}
              >
                All
              </button>
              <button
                onClick={() => handlePriceFilter('free')}
                className={`px-4 py-2 text-sm ${
                  priceFilter === 'free' 
                    ? 'bg-intelliwaste-blue text-white' 
                    : 'bg-white hover:bg-intelliwaste-gray'
                } transition-colors`}
              >
                Free
              </button>
              <button
                onClick={() => handlePriceFilter('paid')}
                className={`px-4 py-2 text-sm ${
                  priceFilter === 'paid' 
                    ? 'bg-intelliwaste-blue text-white' 
                    : 'bg-white hover:bg-intelliwaste-gray'
                } transition-colors`}
              >
                Paid
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile filters */}
        {showFilters && (
          <div className="mt-4 p-4 rounded-lg border border-intelliwaste-gray-medium bg-white md:hidden">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <SlidersHorizontal size={16} />
              Filter Options
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm text-intelliwaste-gray-dark mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 rounded-lg border border-intelliwaste-gray-medium focus:border-intelliwaste-blue focus:ring-1 focus:ring-intelliwaste-blue/30 outline-none transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-intelliwaste-gray-dark mb-1">
                Price
              </label>
              <div className="flex rounded-lg border border-intelliwaste-gray-medium overflow-hidden">
                <button
                  onClick={() => handlePriceFilter('all')}
                  className={`flex-1 px-4 py-2 text-sm ${
                    priceFilter === 'all' 
                      ? 'bg-intelliwaste-blue text-white' 
                      : 'bg-white hover:bg-intelliwaste-gray'
                  } transition-colors`}
                >
                  All
                </button>
                <button
                  onClick={() => handlePriceFilter('free')}
                  className={`flex-1 px-4 py-2 text-sm ${
                    priceFilter === 'free' 
                      ? 'bg-intelliwaste-blue text-white' 
                      : 'bg-white hover:bg-intelliwaste-gray'
                  } transition-colors`}
                >
                  Free
                </button>
                <button
                  onClick={() => handlePriceFilter('paid')}
                  className={`flex-1 px-4 py-2 text-sm ${
                    priceFilter === 'paid' 
                      ? 'bg-intelliwaste-blue text-white' 
                      : 'bg-white hover:bg-intelliwaste-gray'
                  } transition-colors`}
                >
                  Paid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-intelliwaste-gray-dark">
          {items.length} {items.length === 1 ? 'item' : 'items'} found
        </p>
        
        <a
          href="/marketplace/new"
          className="px-4 py-2 rounded-lg bg-intelliwaste-blue text-white text-sm font-medium hover:bg-intelliwaste-blue-dark transition-colors"
        >
          List Your Waste
        </a>
      </div>
      
      {/* Items grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-intelliwaste-gray/30 rounded-lg border border-intelliwaste-gray-medium">
          <p className="text-intelliwaste-gray-dark mb-2">No items found</p>
          <p className="text-sm text-intelliwaste-gray-dark">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceList;
