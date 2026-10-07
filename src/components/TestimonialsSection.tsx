import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AnimatedSection } from './AnimatedSection';
import { Card3D } from './Card3D';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useAdminData();
  const [filter, setFilter] = useState<'All' | 'Highway Traveler' | 'Family Dining' | 'Tourist'>('All');

  const filteredReviews = testimonials.filter((rev) => {
    if (filter === 'All') return true;
    return rev.tripType === filter;
  });

  return (
    <section id="testimonials" className="scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32 py-16 sm:py-20 lg:py-28 bg-[#0c0907] text-white border-b border-amber-900/30 relative overflow-hidden perspective-1200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection direction="3d-rise" className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
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
          <Card3D maxTilt={6} scale={1.03} glare={true} className="rounded-2xl">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-amber-500/30 flex items-center gap-3.5 sm:gap-4 shrink-0 shadow-xl self-start md:self-auto hover:border-amber-400/60 preserve-3d">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums translate-z-4">
                4.0
              </div>
              <div className="space-y-0.5 sm:space-y-1 text-xs translate-z-2">
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
          </Card3D>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection direction="up" delay={80}>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {(['All', 'Highway Traveler', 'Family Dining', 'Tourist'] as const).map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl whitespace-nowrap cursor-pointer shrink-0 min-h-[38px] transition-transform hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-950/60'
                      : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Reviews' : cat}</span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((item, index) => (
            <AnimatedSection
              key={item.id}
              direction="3d-rise"
              delay={(index % 3) * 70}
              className="h-full"
            >
              <Card3D maxTilt={5} scale={1.02} glare={true} className="h-full rounded-2xl">
                <div className="p-5 sm:p-7 rounded-2xl bg-[#140f0c] border border-amber-900/30 flex flex-col justify-between hover:border-amber-500/50 shadow-xl relative h-full preserve-3d">
                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between translate-z-2">
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
                      <div className="pt-1.5 sm:pt-2 text-xs translate-z-2">
                        <span className="text-amber-400/90 font-medium">Favorite Dish: </span>
                        <span className="text-stone-300">{item.dishRecommended}</span>
                      </div>
                    )}
                  </div>

                  {/* Author / Origin */}
                  <div className="pt-4 mt-4 border-t border-amber-900/20 flex items-center justify-between text-xs translate-z-4">
                    <div>
                      <div className="font-serif font-bold text-stone-100 text-sm">{item.author}</div>
                      <div className="text-[11px] text-stone-400">{item.location}</div>
                    </div>
                    <div className="text-[11px] font-mono text-amber-400/70">{item.date}</div>
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
