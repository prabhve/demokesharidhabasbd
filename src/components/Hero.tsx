import React from 'react';
import { ArrowRight, Star, MapPin, MessageCircle, Utensils, ShieldCheck, Flame } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AnimatedSection } from './AnimatedSection';

export const Hero: React.FC = () => {
  const { restaurantInfo, menuItems } = useAdminData();
  const signatureDish = menuItems[0];

  return (
    <section className="relative overflow-hidden bg-[#0c0907] text-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:py-28 border-b border-amber-500/20">
      {/* Background Ambience Layer with subtle parallax warmth */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-150 brightness-75 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0907] via-[#0c0907]/92 to-[#0c0907]/80" />
        <div className="absolute inset-0 bg-radial-[circle_at_20%_30%] from-amber-600/20 via-transparent to-transparent animate-pulse-glow" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0c0907] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* Left Column: Atmospheric Restaurant Brand Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <AnimatedSection direction="up" delay={50}>
              {/* Subtle Royal Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-300 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Robertsganj · Sonbhadra, Uttar Pradesh</span>
              </div>
            </AnimatedSection>

            {/* Headline with Serif & Italic Golden Nuances */}
            <AnimatedSection direction="up" delay={150}>
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.18]">
                  Highway Culinary Heritage, <br />
                  <span className="text-gold-gradient italic font-normal">Pure Desi Ghee</span> Delicacies.
                </h1>
                <p className="font-display text-base sm:text-xl text-amber-200/80 italic tracking-wide">
                  "शुद्ध देसी घी और पारंपरिक मिट्टी के तंदूर का असली ज़ायका"
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={250}>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl font-light">
                Welcome to <strong className="text-amber-300 font-semibold">{restaurantInfo.name}</strong> at Amarati, Robertsganj. 
                Savor slow-simmered Handi Dal Tadka, rich Paneer Butter Masala, charred clay-tandoor rotis, and the grand Maharaja Thali. 
                Relax in our peaceful lush garden courtyard or climate-controlled AC family hall along your Sonbhadra journey.
              </p>
            </AnimatedSection>

            {/* Verified Diner Trust Bar */}
            <AnimatedSection direction="up" delay={320}>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs text-stone-300 pt-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-600/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums font-bold text-xs sm:text-sm">4.0 / 5.0</span>
                  <span className="text-stone-400 font-normal text-[10px] sm:text-[11px]">(520+ Reviews)</span>
                </div>
                <span className="text-amber-900">•</span>
                <span className="text-stone-300 text-[11px] sm:text-xs">100% Desi Ghee</span>
                <span className="text-amber-900">•</span>
                <span className="text-stone-300 text-[11px] sm:text-xs">AC Hall & Garden</span>
                <span className="text-amber-900">•</span>
                <span className="text-stone-300 text-[11px] sm:text-xs">Pure Vegetarian</span>
              </div>
            </AnimatedSection>

            {/* Primary Action Buttons */}
            <AnimatedSection direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#menu"
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 border border-amber-300/40 cursor-pointer min-h-[44px] transition-all duration-200 hover:scale-[1.02] active:scale-98"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Explore Full Menu</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </a>

                <a
                  href="#booking"
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer min-h-[44px] transition-all duration-200 hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Booking</span>
                </a>

                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-amber-900/40 rounded-xl flex items-center justify-center gap-2 cursor-pointer min-h-[44px] transition-all duration-200 hover:border-amber-400/50"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Directions</span>
                </a>
              </div>
            </AnimatedSection>

            {/* Quick Highway Traveler Spec Bar */}
            <AnimatedSection direction="up" delay={480}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-amber-900/30 text-xs">
                <div className="p-3 rounded-xl bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                  <div className="text-stone-400 text-[10px] sm:text-[11px] uppercase tracking-wider">Timings</div>
                  <div className="font-semibold text-stone-100 text-xs sm:text-sm mt-0.5">{restaurantInfo.hours}</div>
                  <div className="text-amber-400/80 text-[10px] sm:text-[11px]">Open All 7 Days</div>
                </div>

                <div className="p-3 rounded-xl bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                  <div className="text-stone-400 text-[10px] sm:text-[11px] uppercase tracking-wider">Average Meal</div>
                  <div className="font-semibold text-stone-100 text-xs sm:text-sm mt-0.5 tabular-nums">{restaurantInfo.avgCostForTwo}</div>
                  <div className="text-stone-400 text-[10px] sm:text-[11px]">For Two Persons</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                  <div className="text-stone-400 text-[10px] sm:text-[11px] uppercase tracking-wider">Highway Comfort</div>
                  <div className="font-semibold text-stone-100 text-xs sm:text-sm mt-0.5">AC Hall + Open Garden</div>
                  <div className="text-emerald-400 text-[10px] sm:text-[11px]">Free Parking & Wheelchair Ramp</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Culinary Masterpiece Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatedSection direction="left" delay={250}>
              <div className="relative group">
                {/* Golden Ambient Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-amber-700/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#140f0c] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Genuine Appetizing Dish Photography */}
                  <div className="relative h-60 sm:h-80 overflow-hidden">
                    <img
                      src={signatureDish.imageUrl}
                      alt={signatureDish.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/30 to-transparent" />

                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-stone-950 font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-md shadow-md">
                        <Flame className="w-3.5 h-3.5" />
                        Chef's Signature Dish
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 block mb-0.5">
                          CLAY HANDI · PURE DESI GHEE
                        </span>
                        <h3 className="font-serif text-lg sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                          {signatureDish.name}
                        </h3>
                      </div>
                      <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300 tabular-nums drop-shadow-md">
                        ₹{signatureDish.price}
                      </div>
                    </div>
                  </div>

                  {/* Card Description & Details */}
                  <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-[#140f0c] border-t border-amber-900/30">
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                      {signatureDish.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-amber-900/20 text-[11px] sm:text-xs text-stone-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        100% Desi Ghee
                      </span>
                      <span>Prep: ~15 mins</span>
                      <a
                        href="#menu"
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Order on Table</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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

