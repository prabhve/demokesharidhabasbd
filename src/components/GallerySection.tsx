import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Trees, UtensilsCrossed, Flame, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface GalleryItem {
  id: string;
  title: string;
  hindiTitle?: string;
  category: 'garden' | 'kitchen' | 'dishes' | 'hall';
  categoryLabel: string;
  imageUrl: string;
  aspectRatioClass: string;
  caption: string;
  highlightTag: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Evening Garden Courtyard Dining',
    hindiTitle: 'ओपन गार्डन डाइनिंग',
    category: 'garden',
    categoryLabel: 'Garden Seating',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[4/5]',
    caption: 'Lush open-air garden seating illuminated by warm hanging fairy lanterns. Enjoy your meal with the crisp evening breeze of Robertsganj.',
    highlightTag: 'Al Fresco Ambience',
  },
  {
    id: 'gal-2',
    title: 'Clay Tandoor Master Baking',
    hindiTitle: 'पारंपरिक मिट्टी का तंदूर',
    category: 'kitchen',
    categoryLabel: 'Live Kitchen & Tandoor',
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[16/11]',
    caption: 'Handcrafted naans and missi rotis slapped directly against the red-hot clay walls of our wood-and-charcoal fired tandoor.',
    highlightTag: 'Live Charcoal Oven',
  },
  {
    id: 'gal-3',
    title: 'The Royal Maharaja Kansa Thali',
    hindiTitle: 'केशरी महाराजा थाली',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[4/5]',
    caption: 'Nine regal bowls featuring Kadhai Paneer, Dal Makhani, seasonal dry subzi, tandoori rotis, fragrant basmati rice, raita, and hot gulab jamun.',
    highlightTag: 'Chef Special Feasts',
  },
  {
    id: 'gal-4',
    title: 'Air-Conditioned Family Dining Hall',
    hindiTitle: 'एसी फैमिली डाइनिंग हॉल',
    category: 'hall',
    categoryLabel: 'Family AC Hall',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[16/10]',
    caption: 'Quiet, climate-controlled family dining space with comfortable seating, high chairs for toddlers, and attentive hospitality.',
    highlightTag: 'Climate Controlled',
  },
  {
    id: 'gal-5',
    title: 'Handi Dal Makhani with Pure White Makhan',
    hindiTitle: 'दाल मखनी मक्खन मार के',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-square',
    caption: 'Black urad lentils and kidney beans slow-simmered for 12 hours over embers, topped with farm-fresh white butter.',
    highlightTag: '12-Hour Slow Dum',
  },
  {
    id: 'gal-6',
    title: 'Live Desi Ghee Tadka Sizzle',
    hindiTitle: 'शुद्ध देसी घी तड़का',
    category: 'kitchen',
    categoryLabel: 'Live Kitchen & Tandoor',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[16/10]',
    caption: 'Double tempering with pure cow ghee, roasted cumin, crushed garlic, and whole Kashmiri chillies right before serving.',
    highlightTag: '100% Desi Cow Ghee',
  },
  {
    id: 'gal-7',
    title: 'Charcoal Smoked Paneer Tikka on Skewers',
    hindiTitle: 'तंदूरी पनीर टिक्का',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[4/5]',
    caption: 'Plump malai paneer cubes marinated with Kashmiri deghi mirch, mustard oil, and roasted besan, grilled golden over coal.',
    highlightTag: 'Charcoal Grilled',
  },
  {
    id: 'gal-8',
    title: 'Garden Lawn Pavilion at Twilight',
    hindiTitle: 'गार्डन लॉन पवेलियन',
    category: 'garden',
    categoryLabel: 'Garden Seating',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[16/11]',
    caption: 'Peaceful garden seating framed by greenery, creating an idyllic retreat for families visiting Sonbhadra’s waterfalls.',
    highlightTag: 'Scenic Highway Oasis',
  },
  {
    id: 'gal-9',
    title: 'Charred Garlic Butter Naan in Basket',
    hindiTitle: 'गार्लिक बटर नान',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[16/10]',
    caption: 'Crisp, blistered tandoori flatbread brushed with garlic butter and fresh coriander, served piping hot at the table.',
    highlightTag: 'Clay Oven Fresh',
  },
  {
    id: 'gal-10',
    title: 'Chilled Rabdi Kulhad Lassi',
    hindiTitle: 'स्पेशल कुल्हड़ लस्सी',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    aspectRatioClass: 'aspect-[3/4]',
    caption: 'Thick, hand-churned sweet curd in an authentic earthen kulhad, crowned with a thick layer of clotted malai and rose syrup.',
    highlightTag: 'Earthen Clay Kulhad',
  },
  {
    id: 'gal-11',
    title: 'Kadhai Paneer in Hammered Copper Kadai',
    hindiTitle: 'कड़ाही पनीर देसी घी',
    category: 'dishes',
    categoryLabel: 'Signature Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=85',
    aspectRatioClass: 'aspect-[4/3]',
    caption: 'Fresh paneer tossed with crunchy bell peppers, whole coriander seeds, and caramelized tomato onion gravy.',
    highlightTag: 'Farm Fresh Paneer',
  },
  {
    id: 'gal-12',
    title: 'Adrak Masala Kulhad Chai on Garden Patio',
    hindiTitle: 'अदरक कुल्हड़ चाय',
    category: 'garden',
    categoryLabel: 'Garden Seating',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85',
    aspectRatioClass: 'aspect-[3/4]',
    caption: 'Steaming clay cup chai spiced with fresh mountain ginger and green cardamom, the quintessential highway refreshment.',
    highlightTag: 'Highway Must-Have',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Showcase', icon: Sparkles },
  { id: 'garden', label: 'Garden Seating', icon: Trees },
  { id: 'kitchen', label: 'Live Kitchen & Tandoor', icon: Flame },
  { id: 'dishes', label: 'Signature Dishes', icon: UtensilsCrossed },
  { id: 'hall', label: 'AC Family Hall', icon: Wind },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedItem(filteredItems[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, filteredItems]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-[#0c0907] text-white border-b border-amber-900/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 sm:w-96 h-80 sm:h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Journey · Dhaba Moments & Culinary Craft</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              The <span className="text-gold-gradient italic">Keshari Dhaba</span> Visual Gallery.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
              Glimpse into our lush garden courtyard, live charcoal clay tandoors, pure desi ghee curries, and serene AC family hall in Robertsganj.
            </p>
          </div>

          <div className="text-[11px] sm:text-xs text-amber-300/80 font-mono flex items-center gap-2 bg-[#16120e] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-amber-900/30 shrink-0 self-start md:self-auto">
            <span>Showing {filteredItems.length} Photographs</span>
          </div>
        </motion.div>

        {/* Category Tabs with Animated Pill - Touch Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 min-h-[38px] ${
                  isActive
                    ? 'text-stone-950 font-bold'
                    : 'bg-[#16120e] text-stone-300 hover:text-white border border-amber-900/30 hover:border-amber-500/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-950/60"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry Grid Layout with Mobile Gap & Rhythm */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 4) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedItem(item)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-[#140f0c] border border-amber-900/30 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/50 transition-all duration-500 cursor-pointer"
              >
                {/* Full-width Image with natural aspect ratios */}
                <div className={`relative w-full ${item.aspectRatioClass} overflow-hidden`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Atmospheric Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30 shadow-sm">
                      {item.highlightTag}
                    </span>
                  </div>

                  {/* Expand Icon on Hover / Always accessible on tap */}
                  <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-950/80 backdrop-blur-md flex items-center justify-center text-amber-300 border border-amber-500/30 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Caption / Title info at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 transform transition-transform duration-300">
                    <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.hindiTitle && (
                      <div className="text-xs text-amber-200/70 font-serif mt-0.5">
                        {item.hindiTitle}
                      </div>
                    )}

                    <p className="mt-1.5 text-stone-300 text-xs line-clamp-2 font-light leading-relaxed block sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal for High-Quality Fullscreen Experience - Fully Mobile Responsive */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
          >
            {/* Main Lightbox Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#140f0c] rounded-2xl border border-amber-500/40 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-stone-950/90 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/3 sm:top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-amber-300 hover:text-white border border-amber-500/30 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/3 sm:top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-amber-300 hover:text-white border border-amber-500/30 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Full-width Image Area */}
              <div className="flex-1 bg-black flex items-center justify-center relative min-h-[220px] sm:min-h-[320px] lg:min-h-[500px] max-h-[45vh] lg:max-h-[none]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="max-h-[40vh] sm:max-h-[50vh] lg:max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Informative Side Panel */}
              <div className="w-full lg:w-80 bg-[#16120e] p-5 sm:p-6 lg:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-900/30">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {selectedItem.categoryLabel}
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-white leading-tight">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.hindiTitle && (
                      <div className="text-xs sm:text-sm text-amber-200/80 font-serif mt-1">
                        {selectedItem.hindiTitle}
                      </div>
                    )}
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    {selectedItem.caption}
                  </p>

                  <div className="pt-2 text-[11px] text-stone-400 space-y-1 font-mono">
                    <div>Tag: <span className="text-amber-400">{selectedItem.highlightTag}</span></div>
                    <div>Location: Robertsganj, Sonbhadra</div>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-5 mt-4 border-t border-amber-900/30 space-y-2">
                  <a
                    href="#booking"
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]"
                  >
                    <span>Reserve Table to Visit</span>
                  </a>
                  <p className="text-[10px] text-stone-400 text-center">
                    Swipe or use arrows to navigate gallery
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
