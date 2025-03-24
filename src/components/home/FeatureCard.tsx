
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to,
  color 
}) => {
  return (
    <div className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm hover:shadow-glass transition-all duration-500 hover-lift">
      <div className={`absolute -bottom-2 -right-2 w-32 h-32 rounded-full opacity-10 transition-all duration-500 group-hover:opacity-25 ${color}`} />
      
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color}`}>
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-intelliwaste-gray-dark mb-4">{description}</p>
        
        <Link 
          to={to} 
          className="inline-flex items-center gap-1 text-intelliwaste-blue font-medium transition-all duration-300 hover:gap-2"
        >
          Explore <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
