import React from 'react';
import { Flame, Sparkles, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AnimatedSection } from './AnimatedSection';

const PILLARS = [
  {
    icon: Flame,
    title: 'Clay Tandoor & Charcoal Embers',
    description: 'Our rotis, missi rotis, and stuffed kulchas are slapped against fiery clay oven walls for that irreplaceable smoky aroma and golden blistered crust.',
  },
  {
    icon: Sparkles,
    title: '100% Pure Desi Cow Ghee',
    description: 'From our signature Handi Dal Tadka to Kadhai Paneer and warm Gulab Jamuns, every preparation uses pure desi ghee without artificial colors or flavor chemicals.',
  },
  {
    icon: HeartHandshake,
    title: 'Highway Comfort & Family Privacy',
    description: 'Whether hosting a family celebration in our air-conditioned banquet hall or taking an outdoor garden breather, our staff ensures genuine Awadhi warmth.',
  },
  {
    icon: ShieldCheck,
    title: 'Sanitized & Hygienic Standards',
    description: 'Spotless stainless steel workstations, RO drinking water, sanitized cutlery, and impeccably maintained restrooms designed specifically for highway road-trippers.',
  },
];

export const AboutSection: React.FC = () => {
  const { menuItems, restaurantInfo } = useAdminData();
  const maharajaThali = menuItems.find((m) => m.id === 'dish-8') || menuItems[7] || menuItems[0];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 bg-[#100d0a] text-stone-200 border-b border-amber-900/30 relative overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <AnimatedSection direction="up" delay={50}>
          <div className="max-w-3xl mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2.5 sm:mb-3">
              <span>Our Culinary Legacy · Robertsganj, Sonbhadra</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance leading-tight">
              Rooted in Authentic Flavors, Crafted with <span className="text-gold-gradient italic">Pure Desi Ghee</span>.
            </h2>
            <p className="mt-3 sm:mt-4 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
              Founded with a passion for authentic highway dhaba culinary heritage, <strong className="text-amber-300 font-medium">{restaurantInfo.name}</strong> has become a celebrated culinary haven for travelers traversing between Varanasi, Renukoot, and Singrauli, as well as local families in Sonbhadra. We never compromise on time-tested Indian methods: clay tandoors fired with wood and charcoal, aromatic handis slow-simmered for hours, and dairy procured fresh from regional farms.
            </p>
          </div>
        </AnimatedSection>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* Left: 4 Pillars of Excellence (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <AnimatedSection key={pillar.title} direction="up" delay={100 + idx * 90}>
                    <div className="p-5 sm:p-6 rounded-xl bg-[#16120e] border border-amber-900/30 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group">
                      <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3.5 sm:mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Cultural Hospitality Quote Bar */}
            <AnimatedSection direction="up" delay={450}>
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/90 to-[#1c140d] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xl">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 sm:mt-0">🪔</span>
                  <div>
                    <div className="font-serif text-sm sm:text-lg font-bold text-amber-200">
                      "अतिथि देवो भव:" — True Sonbhadra Hospitality
                    </div>
                    <div className="text-[11px] sm:text-xs text-amber-300/80 font-light mt-0.5">
                      Proudly welcoming travelers visiting Salkhan Fossil Park, Vijaygarh Fort, and Varanasi road.
                    </div>
                  </div>
                </div>
                <a
                  href="#menu"
                  className="self-start sm:self-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap cursor-pointer min-h-[38px] flex items-center transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  View Menu
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Royal Maharaja Thali Feature (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatedSection direction="left" delay={200}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-700/20 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity" />

                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#16120e] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="relative h-60 sm:h-80 overflow-hidden">
                    <img
                      src={maharajaThali.imageUrl}
                      alt={maharajaThali.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2.5 sm:px-3 py-1 bg-amber-500 text-stone-950 font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-md shadow-md">
                        Chef's Royal Assemblage
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                          THE COMPLETE BANQUET FEAST
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                          {maharajaThali.name}
                        </h3>
                      </div>
                      <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300 tabular-nums drop-shadow-md">
                        ₹{maharajaThali.price}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                      {maharajaThali.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-amber-900/30 text-xs">
                      <div className="flex items-center gap-2 text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Includes: Dal Makhani, Paneer, Mixed Subzi, Raita & Salad</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Choice of 4 Butter Rotis or 2 Stuffed Naans + Fragrant Pulao</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Complimentary hot Gulab Jamun & roasted Papad</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#booking"
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px] transition-all duration-200 hover:scale-[1.02] active:scale-98"
                      >
                        <span>Reserve Maharaja Thali Table</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
