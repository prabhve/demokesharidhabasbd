import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/restaurantData';

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Highway Traveler' | 'Family Dining' | 'Tourist'>('All');

  const filteredReviews = TESTIMONIALS.filter((rev) => {
    if (filter === 'All') return true;
    return rev.tripType === filter;
  });

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-28 bg-[#0c0907] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <span>Verified Diner Experiences · Google Reviews</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Glowing Words from <span className="text-gold-gradient italic">Travelers & Families</span>.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Real reviews from long-distance highway travelers, weekend tourists, and local Robertsganj families who trust Keshari Dhaba for authentic taste and cleanliness.
            </p>
          </div>

          {/* Google Reviews Trust Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-amber-500/30 flex items-center gap-3.5 sm:gap-4 shrink-0 shadow-xl self-start md:self-auto">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">
              4.0
            </div>
            <div className="space-y-0.5 sm:space-y-1 text-xs">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-amber-600'}`}
                  />
                ))}
              </div>
              <div className="font-semibold text-white text-[11px] sm:text-xs">Google Rating · 520+ Reviews</div>
              <div className="text-[10px] sm:text-[11px] text-stone-400">Robertsganj, Sonbhadra</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs with Animated Indicator - Touch Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {(['All', 'Highway Traveler', 'Family Dining', 'Tourist'] as const).map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 min-h-[38px] ${
                  isActive
                    ? 'text-stone-950 font-bold'
                    : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeReviewTab"
                    className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-950/60"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat === 'All' ? 'All Reviews' : cat}</span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid with Mobile Rhythm */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredReviews.map((item, idx) => (
              <motion.div
                key={item.id}
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
                className="p-5 sm:p-7 rounded-2xl bg-[#140f0c] border border-amber-900/30 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-400 relative group"
              >
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 bg-[#1e1712] px-2.5 py-1 rounded-md border border-amber-900/30">
                      {item.tripType}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light italic">
                    "{item.comment}"
                  </p>

                  {/* Recommended Dish */}
                  {item.dishRecommended && (
                    <div className="pt-1.5 sm:pt-2 text-xs">
                      <span className="text-amber-400/90 font-medium">Favorite Dish: </span>
                      <span className="text-stone-300">{item.dishRecommended}</span>
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="pt-4 sm:pt-6 mt-3.5 sm:mt-4 border-t border-amber-900/20 flex items-center justify-between">
                  <div>
                    <div className="font-serif text-xs sm:text-sm font-bold text-white">
                      {item.author}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-stone-400 font-light">
                      Traveler from {item.location}
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-stone-400 font-mono">
                    {item.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
