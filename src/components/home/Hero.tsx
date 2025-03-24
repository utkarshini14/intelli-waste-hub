
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Camera,
  MessageSquare,
  GameController,
  ShoppingBag
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-intelliwaste-blue/5 to-intelliwaste-blue-light/5" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-intelliwaste-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-intelliwaste-blue-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-intelliwaste-blue/10 text-intelliwaste-blue text-sm font-medium mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Intelligent Waste Management
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-down" style={{ animationDelay: '0.4s' }}>
            Transform How You <span className="bg-gradient-to-r from-intelliwaste-blue to-intelliwaste-blue-light bg-clip-text text-transparent">Manage Waste</span>
          </h1>
          
          <p className="text-lg md:text-xl text-intelliwaste-gray-dark mb-10 animate-slide-down" style={{ animationDelay: '0.6s' }}>
            INTELLIwaste provides cutting-edge technology to help you identify, sort, and manage waste efficiently — turning environmental challenges into opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Link 
              to="/recognition" 
              className="px-6 py-3 rounded-lg bg-intelliwaste-blue hover:bg-intelliwaste-blue-dark text-white font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link 
              to="/chatbot" 
              className="px-6 py-3 rounded-lg bg-white hover:bg-intelliwaste-gray text-intelliwaste-blue-dark font-medium border border-intelliwaste-gray-medium transition-colors"
            >
              Ask Our Assistant
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <FeatureHighlight 
            icon={<Camera className="text-white" size={20} />} 
            title="Image Recognition" 
            color="bg-intelliwaste-blue"
            to="/recognition"
          />
          <FeatureHighlight 
            icon={<MessageSquare className="text-white" size={20} />} 
            title="Smart Assistant" 
            color="bg-intelliwaste-green"
            to="/chatbot"
          />
          <FeatureHighlight 
            icon={<GameController className="text-white" size={20} />} 
            title="Waste Game" 
            color="bg-intelliwaste-yellow"
            to="/game"
          />
          <FeatureHighlight 
            icon={<ShoppingBag className="text-white" size={20} />} 
            title="Marketplace" 
            color="bg-intelliwaste-blue-dark"
            to="/marketplace"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  to: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ icon, title, color, to }) => {
  return (
    <Link to={to} className="group relative overflow-hidden rounded-xl shadow-glass-sm hover:shadow-glass transition-all duration-300 hover-lift">
      <div className={`absolute inset-0 ${color}/10 transition-all duration-300 group-hover:${color}/20`} />
      <div className="relative p-5 flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${color}`}>
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
        <ArrowRight size={16} className="ml-auto text-intelliwaste-gray-dark group-hover:text-intelliwaste-blue transition-colors" />
      </div>
    </Link>
  );
};

export default Hero;
