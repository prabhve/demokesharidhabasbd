import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ShoppingBag, Flame, Sparkles, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  orderItems: Record<string, number>;
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (item: MenuItem) => void;
  onOpenOrderDrawer: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Delicacies', icon: '🍲' },
  { id: 'signature', label: 'Dhaba Specials', icon: '🔥' },
  { id: 'paneer', label: 'Paneer Khazana', icon: '🧀' },
  { id: 'dal_curry', label: 'Dal & Curries', icon: '🥘' },
  { id: 'thali', label: 'Royal Thalis', icon: '👑' },
  { id: 'tandoor', label: 'Tandoor & Breads', icon: '🫓' },
  { id: 'rice', label: 'Rice & Biryani', icon: '🍚' },
  { id: 'beverages', label: 'Beverages & Sweets', icon: '☕' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  orderItems,
  onAddItem,
  onRemoveItem,
  onOpenOrderDrawer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindiName && item.hindiName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBestseller = onlyBestsellers ? (item.isBestseller || item.isChefSpecial) : true;

      return matchesCategory && matchesSearch && matchesBestseller;
    });
  }, [selectedCategory, searchQuery, onlyBestsellers]);

  const totalOrderedItems = Object.values(orderItems).reduce((sum, count) => sum + count, 0);

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-28 bg-[#0f0c09] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <span>Pure Ingredients & Desi Ghee</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              The Culinary Menu of <span className="text-gold-gradient italic">Keshari Dhaba</span>.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Explore our culinary creations — from double-tempered clay handi lentils and slow-dum curries to charcoal tandoori breads, thick kulhad lassi, and royal thalis.
            </p>
          </div>

          {/* Quick Floating Table Order Tracker */}
          {totalOrderedItems > 0 && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenOrderDrawer}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 transition-all cursor-pointer self-start md:self-auto min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Table Order ({totalOrderedItems})</span>
              <span className="bg-stone-950 text-amber-300 px-2 py-0.5 rounded text-[10px] sm:text-[11px]">View Bill</span>
            </motion.button>
          )}
        </motion.div>

        {/* Filter Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input - Mobile text-base to prevent iOS Safari auto-zoom */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500/70 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Dal Tadka, Paneer, Naan, Thali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-[#17120e] border border-amber-900/30 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors shadow-inner min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bestseller Filter Toggle */}
            <button
              onClick={() => setOnlyBestsellers(!onlyBestsellers)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer min-h-[44px] ${
                onlyBestsellers
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-950/60 font-bold'
                  : 'bg-[#17120e] text-stone-300 border-amber-900/30 hover:border-amber-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bestsellers & Specials Only</span>
            </button>
          </div>

          {/* Category Tabs with Animated Pill - Touch Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'text-stone-950 font-bold'
                      : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30 hover:border-amber-500/30'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMenuTab"
                      className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-950/60"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Menu Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#140f0c] rounded-2xl border border-amber-900/30">
            <p className="text-stone-400 text-sm">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyBestsellers(false);
              }}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider cursor-pointer min-h-[44px]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            <AnimatePresence>
              {filteredItems.map((dish, idx) => {
                const countInOrder = orderItems[dish.id] || 0;

                return (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.55,
                      delay: (idx % 3) * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="group bg-[#140f0c] rounded-2xl border border-amber-900/30 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-400"
                  >
                    <div>
                      {/* High-Quality Dish Photo */}
                      <div
                        onClick={() => setPreviewDish(dish)}
                        className="relative h-44 sm:h-48 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/25 to-transparent" />

                        {/* Tag Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {dish.isBestseller && (
                            <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              Bestseller
                            </span>
                          )}
                          {dish.isChefSpecial && !dish.isBestseller && (
                            <span className="bg-stone-950/90 text-amber-300 border border-amber-500/40 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md flex items-center gap-1 backdrop-blur-xs">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              Chef Special
                            </span>
                          )}
                        </div>

                        {/* Vegetarian Badge */}
                        <div className="absolute top-3 right-3 bg-stone-950/80 p-1 rounded-md border border-emerald-500/40 backdrop-blur-xs">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-emerald-950">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-100" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                          <span className="text-[10px] font-semibold text-amber-400/90 uppercase tracking-widest">
                            {dish.tags[0] || 'PURE DESI GHEE'}
                          </span>
                          <span className="font-mono text-[11px] text-stone-400">
                            ~{dish.prepTime}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div className="min-w-0">
                            <h3
                              onClick={() => setPreviewDish(dish)}
                              className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer leading-snug truncate"
                            >
                              {dish.name}
                            </h3>
                            {dish.hindiName && (
                              <div className="text-xs text-amber-200/60 font-serif mt-0.5 truncate">
                                {dish.hindiName}
                              </div>
                            )}
                          </div>
                          <div className="font-serif text-lg sm:text-xl font-bold text-amber-400 tabular-nums shrink-0">
                            ₹{dish.price}
                          </div>
                        </div>

                        <p className="mt-1.5 text-stone-400 text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 font-light">
                          {dish.description}
                        </p>

                        <div className="mt-3 pt-3 border-t border-amber-900/20 text-[11px] text-stone-400 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <span className="text-amber-500 font-medium">Spice:</span>
                            <span>{dish.spiceLevel}</span>
                          </span>
                          <span className="text-stone-600">•</span>
                          <span>Cooked Fresh</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom CTA with Mobile Touch Target */}
                    <div className="p-3.5 sm:p-4 bg-[#18130f] border-t border-amber-900/30 flex items-center justify-between">
                      <span className="text-xs text-stone-400">
                        {countInOrder > 0 ? (
                          <span className="text-amber-400 font-semibold">{countInOrder} on Bill</span>
                        ) : (
                          <span>₹{dish.price} / dish</span>
                        )}
                      </span>

                      <div className="flex items-center gap-2">
                        {countInOrder > 0 ? (
                          <div className="flex items-center gap-1.5 bg-[#221a14] rounded-lg p-1 border border-amber-900/40">
                            <button
                              onClick={() => onRemoveItem(dish)}
                              className="w-8 h-8 rounded bg-[#2c221a] hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-base cursor-pointer touch-manipulation"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-amber-300 tabular-nums">
                              {countInOrder}
                            </span>
                            <button
                              onClick={() => onAddItem(dish)}
                              className="w-8 h-8 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-base cursor-pointer touch-manipulation"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddItem(dish)}
                            className="px-3.5 py-2 bg-[#251c16] hover:bg-amber-500 text-stone-300 hover:text-stone-950 text-xs font-semibold rounded-lg border border-amber-900/40 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[38px] touch-manipulation"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        )}

                        <button
                          onClick={() => setPreviewDish(dish)}
                          className="p-2 text-stone-400 hover:text-amber-400 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                          title="View dish details"
                          aria-label="Dish information"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Dish Preview Modal - Mobile Responsive */}
      <AnimatePresence>
        {previewDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDish(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#140f0c] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewDish(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="relative h-52 sm:h-64 overflow-hidden">
                <img
                  src={previewDish.imageUrl}
                  alt={previewDish.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex items-end justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight truncate">
                      {previewDish.name}
                    </h3>
                    {previewDish.hindiName && (
                      <div className="text-xs sm:text-sm text-amber-200/70 font-serif">
                        {previewDish.hindiName}
                      </div>
                    )}
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-400 tabular-nums shrink-0">
                    ₹{previewDish.price}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                  {previewDish.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 bg-[#1b1510] rounded-xl border border-amber-900/30 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Spice Profile</span>
                    <span className="text-amber-300 font-medium">{previewDish.spiceLevel}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Cooking Medium</span>
                    <span className="text-emerald-400 font-medium">100% Desi Cow Ghee</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Preparation Time</span>
                    <span className="text-stone-300 font-medium">~{previewDish.prepTime}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Dietary Type</span>
                    <span className="text-emerald-400 font-medium">Pure Vegetarian</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddItem(previewDish);
                      setPreviewDish(null);
                    }}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Table Bill (₹{previewDish.price})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
