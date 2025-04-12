
import React from 'react';
import Layout from '../components/Layout';
import MarketplaceList from '../components/marketplace/MarketplaceList';
import { ShoppingBag, Recycle, ArrowRight } from 'lucide-react';

const Marketplace = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-intelliwaste-blue-dark/10 text-intelliwaste-blue-dark text-sm font-medium mb-4">
              Waste Marketplace
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Buy, Sell, and Trade Waste Materials
            </h1>
            <p className="text-intelliwaste-gray-dark max-w-2xl mx-auto">
              One person's waste is another's resource. Connect with your community to give waste materials a second life.
            </p>
          </div>
          
          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm">
              <div className="w-12 h-12 rounded-full bg-intelliwaste-blue-dark/10 flex items-center justify-center text-intelliwaste-blue-dark mb-4">
                <Recycle size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">List Your Waste</h3>
              <p className="text-intelliwaste-gray-dark mb-4">
                Instead of throwing away usable materials, list them on our marketplace for others to use.
              </p>
              <a 
                href="/marketplace/new" 
                className="inline-flex items-center gap-1 text-intelliwaste-blue-dark hover:underline"
              >
                List an item <ArrowRight size={16} />
              </a>
            </div>
            <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm">
              <div className="w-12 h-12 rounded-full bg-intelliwaste-blue-dark/10 flex items-center justify-center text-intelliwaste-blue-dark mb-4">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Materials</h3>
              <p className="text-intelliwaste-gray-dark mb-4">
                Search for free or low-cost waste materials that you can repurpose for your projects.
              </p>
              <a 
                href="/marketplace?category=all" 
                className="inline-flex items-center gap-1 text-intelliwaste-blue-dark hover:underline"
              >
                Browse listings <ArrowRight size={16} />
              </a>
            </div>
            <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm">
              <div className="w-12 h-12 rounded-full bg-intelliwaste-blue-dark/10 flex items-center justify-center text-intelliwaste-blue-dark mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
                  <path d="m11 17 2 2a1 1 0 0 0 1.5-.2l2.3-6.5c.5-1.5-.6-3-2.1-3H7.8a1 1 0 0 1-.8-.4l-1.5-2c-.5-.6-1.3-.9-2.2-.7-.8.2-1.3.9-1.3 1.7v7.8c0 1.5 1.3 2.7 2.8 2.6l4.2-.4z"></path>
                  <path d="m15 17 2 2a1 1 0 0 0 1.5-.2l2.5-6.8c.5-1.4-.6-3-2.1-3H9.1a1 1 0 0 1-.8-.4l-1.3-1.8c-.5-.6-1.3-.9-2.2-.7-.8.2-1.3.9-1.3 1.7v6.9c0 1.4 1.2 2.6 2.6 2.6h4.9z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trade & Connect</h3>
              <p className="text-intelliwaste-gray-dark mb-4">
                Connect with eco-conscious individuals in your community to trade waste materials.
              </p>
              <a 
                href="/marketplace?filter=trade" 
                className="inline-flex items-center gap-1 text-intelliwaste-blue-dark hover:underline"
              >
                Find trades <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          {/* Marketplace listings */}
          <MarketplaceList />
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
