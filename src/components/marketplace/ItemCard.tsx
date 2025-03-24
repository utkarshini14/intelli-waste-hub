
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number | null;
  isFree: boolean;
  image: string;
  category: string;
  location: string;
  postedDate: Date;
}

interface ItemCardProps {
  item: MarketplaceItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  // Format the posted date relative to current time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-intelliwaste-gray-medium shadow-glass-sm hover:shadow-glass transition-all duration-300 hover-lift">
      <div className="relative h-48">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
            {item.category}
          </span>
        </div>
        {item.isFree && (
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-intelliwaste-green text-white">
              Free
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{item.title}</h3>
        
        <div className="flex items-center text-sm text-intelliwaste-gray-dark mb-2">
          <MapPin size={14} className="mr-1" />
          {item.location}
          <span className="mx-2">•</span>
          {formatRelativeTime(item.postedDate)}
        </div>
        
        <p className="text-intelliwaste-gray-dark text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg">
            {item.isFree 
              ? <span className="text-intelliwaste-green">Free</span>
              : item.price 
                ? `$${item.price.toFixed(2)}`
                : <span className="text-intelliwaste-blue">Trade</span>
            }
          </div>
          
          <a 
            href={`/marketplace/item/${item.id}`}
            className="inline-flex items-center gap-1 text-sm text-intelliwaste-blue hover:underline"
          >
            View details <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
