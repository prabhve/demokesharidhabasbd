import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ShoppingBag, Flame, Sparkles, X, Info, GraduationCap, ArrowRight } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { OrderType } from './OrderCalculatorDrawer';
import { useAdminData } from '../context/AdminDataContext';

interface MenuSectionProps {
  orderItems: Record<string, number>;
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (item: MenuItem) => void;
  onOpenOrderDrawer: (type?: OrderType) => void;
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
  const { menuItems, recDeliveryInfo } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindiName && item.hindiName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBestseller = onlyBestsellers ? (item.isBestseller || item.isChefSpecial) : true;

      return matchesCategory && matchesSearch && matchesBestseller;
    });
  }, [menuItems, selectedCategory, searchQuery, onlyBestsellers]);

  const totalOrderedItems = Object.values(orderItems).reduce((sum, count) => sum + count, 0);

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-28 bg-[#0f0c09] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
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
            <button
              onClick={() => onOpenOrderDrawer()}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 transition-colors cursor-pointer self-start md:self-auto min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Table Order ({totalOrderedItems})</span>
              <span className="bg-stone-950 text-amber-300 px-2 py-0.5 rounded text-[10px] sm:text-[11px]">View Bill</span>
            </button>
          )}
        </div>

        {/* REC Sonbhadra Students & Campus Delivery Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#1a140f] to-amber-950/80 border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                <span>Rajkiya Engineering College (REC) Sonbhadra Delivery</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold border border-amber-500/30">
                  Hostel Gate Drop · ₹{recDeliveryInfo.standardDeliveryCharge} Delivery
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-stone-300 font-light mt-0.5 leading-relaxed">
                Boys Hostels (BH-1, BH-2, BH-3), Girls Hostel & Faculty Quarters delivery. Pay via restaurant QR code and get instant phone call confirmation!
              </div>
            </div>
          </div>
          <button
            onClick={() => onOpenOrderDrawer('REC Sonbhadra Delivery')}
            className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer min-h-[42px] shrink-0"
          >
            <span>Order for REC Campus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500/70 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Dal Tadka, Paneer, Naan, Thali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-[#17120e] border border-amber-900/30 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 shadow-inner min-h-[44px]"
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
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer min-h-[44px] ${
                onlyBestsellers
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
                  : 'bg-[#17120e] text-stone-300 border-amber-900/30 hover:border-amber-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bestsellers & Specials Only</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {filteredItems.map((dish) => {
              const countInOrder = orderItems[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="group bg-[#140f0c] rounded-2xl border border-amber-900/30 overflow-hidden flex flex-col justify-between hover:border-amber-500/50"
                >
                  <div>
                    {/* Dish Photo */}
                    <div
                      onClick={() => setPreviewDish(dish)}
                      className="relative h-44 sm:h-48 overflow-hidden bg-stone-900 cursor-pointer"
                    >
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {dish.isBestseller && (
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                        {dish.isChefSpecial && (
                          <span className="px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/40 font-semibold text-[10px] uppercase tracking-wider">
                            Special
                          </span>
                        )}
                      </div>

                      {/* Pure Veg Badge */}
                      <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs p-1 rounded-sm border border-emerald-600/50 shadow-sm">
                        <div className="w-3 h-3 border border-emerald-500 flex items-center justify-center p-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-2.5 right-3 bg-stone-950/90 text-amber-400 font-serif font-bold text-sm sm:text-base px-2.5 py-0.5 rounded border border-amber-900/40">
                        ₹{dish.price}
                      </div>
                    </div>

                    {/* Dish Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            onClick={() => setPreviewDish(dish)}
                            className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 cursor-pointer leading-snug"
                          >
                            {dish.name}
                          </h3>
                          {dish.hindiName && (
                            <div className="text-xs text-amber-200/60 font-serif mt-0.5">
                              {dish.hindiName}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-stone-400 text-xs line-clamp-2 leading-relaxed font-light">
                        {dish.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {dish.tags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#1c1612] text-stone-300 border border-amber-900/30"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c1612] text-amber-400/80 border border-amber-900/30">
                          {dish.spiceLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-3.5 sm:p-4 bg-[#18130f] border-t border-amber-900/30 flex items-center justify-between gap-2">
                    {countInOrder === 0 ? (
                      <button
                        onClick={() => onAddItem(dish)}
                        className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Dish</span>
                      </button>
                    ) : (
                      <div className="flex-1 flex items-center justify-between bg-[#1f1914] border border-amber-500/50 rounded-xl p-1 min-h-[40px]">
                        <button
                          onClick={() => onRemoveItem(dish)}
                          className="w-8 h-8 rounded-lg bg-stone-900 text-stone-200 hover:bg-stone-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-xs">
                          <span>{countInOrder}</span>
                          <span className="text-[10px] text-stone-400">added</span>
                        </div>
                        <button
                          onClick={() => onAddItem(dish)}
                          className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 flex items-center justify-center font-bold text-sm cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setPreviewDish(dish)}
                      className="p-2 text-stone-400 hover:text-amber-400 min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title="View dish details"
                      aria-label="Dish information"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dish Preview Modal */}
      {previewDish && (
        <div
          onClick={() => setPreviewDish(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#140f0c] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={() => setPreviewDish(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-400 hover:text-white border border-stone-800 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
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
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Table Bill (₹{previewDish.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
