import React, { useState } from 'react';
import { MENU_ITEMS, TOURIST_PLACES } from '../data/restaurantData';

interface FoodVisualProps {
  type: string;
  className?: string;
  altText?: string;
}

export const FoodVisual: React.FC<FoodVisualProps> = ({ type, className = 'w-full h-48', altText }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Look up image URL from MENU_ITEMS
  const menuItem = MENU_ITEMS.find((m) => m.id === type);
  
  // Default image mapping based on category/type
  let imageUrl = menuItem?.imageUrl;
  let caption = menuItem?.name || 'Keshari Dhaba Signature';

  if (!imageUrl) {
    if (type === 'signature' || type === 'dish-1') {
      imageUrl = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80';
      caption = 'Handi Dal Tadka · Pure Desi Ghee';
    } else if (type === 'paneer' || type === 'dish-3' || type === 'dish-4') {
      imageUrl = 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80';
      caption = 'Kadhai Paneer · Rich Copper Handi';
    } else if (type === 'thali' || type === 'dish-8') {
      imageUrl = 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1000&q=80';
      caption = 'Maharaja Royal Thali · 9 Delicacies';
    } else if (type === 'tandoor' || type === 'dish-10' || type === 'dish-11') {
      imageUrl = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80';
      caption = 'Clay Oven Tandoori Breads';
    } else if (type === 'beverages' || type === 'dish-15' || type === 'dish-16') {
      imageUrl = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80';
      caption = 'Clay Kulhad Lassi & Masala Chai';
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80';
      caption = 'Keshari Dhaba Specialty';
    }
  }

  return (
    <div className={`relative overflow-hidden bg-stone-950 group ${className}`}>
      {/* Background ambient container while image loads */}
      <div
        className={`absolute inset-0 bg-stone-900 ${
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      <img
        src={imageUrl}
        alt={altText || caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover object-center ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Atmospheric luxury restaurant vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Subtle gold border accent glow */}
      <div className="absolute inset-0 border border-amber-500/10 pointer-events-none" />
    </div>
  );
};

export const TouristVisual: React.FC<{ placeId: string; className?: string; altText?: string }> = ({
  placeId,
  className = 'w-full h-48',
  altText,
}) => {
  const [loaded, setLoaded] = useState(false);
  const place = TOURIST_PLACES.find((p) => p.id === placeId);
  const imageUrl = place?.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';

  return (
    <div className={`relative overflow-hidden bg-stone-950 group ${className}`}>
      <div
        className={`absolute inset-0 bg-stone-900 ${
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      <img
        src={imageUrl}
        alt={altText || place?.name || 'Sonbhadra Attraction'}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover object-center ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 border border-amber-500/10 pointer-events-none" />
    </div>
  );
};
