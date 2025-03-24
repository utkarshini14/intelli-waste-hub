
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import FeatureCard from '../components/home/FeatureCard';
import { Camera, MessageSquare, GameController, ShoppingBag } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovative Waste Management Solutions
            </h2>
            <p className="text-intelliwaste-gray-dark max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with sustainability principles 
              to revolutionize how we interact with waste materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Smart Image Recognition"
              description="Upload photos of waste items and our AI will identify whether they're recyclable or not."
              icon={<Camera size={24} className="text-white" />}
              to="/recognition"
              color="bg-intelliwaste-blue"
            />
            <FeatureCard
              title="Waste Management Assistant"
              description="Chat with our intelligent assistant to get guidance on proper waste disposal methods."
              icon={<MessageSquare size={24} className="text-white" />}
              to="/chatbot"
              color="bg-intelliwaste-green"
            />
            <FeatureCard
              title="Educational Waste Game"
              description="Test and improve your knowledge of waste sorting through our interactive game."
              icon={<GameController size={24} className="text-white" />}
              to="/game"
              color="bg-intelliwaste-yellow"
            />
            <FeatureCard
              title="Waste Marketplace"
              description="Buy, sell, or trade reusable waste materials in our community marketplace."
              icon={<ShoppingBag size={24} className="text-white" />}
              to="/marketplace"
              color="bg-intelliwaste-blue-dark"
            />
          </div>
        </div>
      </section>
      
      {/* Stats section */}
      <section className="py-16 bg-intelliwaste-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-glass-sm">
              <div className="text-4xl font-bold text-intelliwaste-blue mb-2">95%</div>
              <p className="text-intelliwaste-gray-dark">Classification Accuracy</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-glass-sm">
              <div className="text-4xl font-bold text-intelliwaste-green mb-2">10k+</div>
              <p className="text-intelliwaste-gray-dark">Waste Items Identified</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-glass-sm">
              <div className="text-4xl font-bold text-intelliwaste-yellow mb-2">5k+</div>
              <p className="text-intelliwaste-gray-dark">Active Community Members</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-glass-sm">
              <div className="text-4xl font-bold text-intelliwaste-blue-dark mb-2">1.2k</div>
              <p className="text-intelliwaste-gray-dark">Marketplace Transactions</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Sustainable Waste Revolution
            </h2>
            <p className="text-intelliwaste-gray-dark mb-8">
              Start using INTELLIwaste today and become part of the solution to our global waste challenge.
            </p>
            <a 
              href="/recognition" 
              className="inline-block px-8 py-4 bg-intelliwaste-blue text-white rounded-lg font-medium shadow-md hover:bg-intelliwaste-blue-dark transition-colors"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
