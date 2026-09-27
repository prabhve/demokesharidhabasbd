import React, { useRef } from 'react';
import { ArrowRight, Star, MapPin, MessageCircle, Utensils, ShieldCheck, Flame } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const signatureDish = MENU_ITEMS[0]; // Keshari Special Handi Dal Tadka
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#0c0907] text-white pt-12 pb-20 lg:py-28 border-b border-amber-500/20"
    >
      {/* Background Ambience Layer with subtle scroll parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-150 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0907] via-[#0c0907]/92 to-[#0c0907]/80" />
        <div className="absolute inset-0 bg-radial-[circle_at_20%_30%] from-amber-600/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0c0907] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Atmospheric Restaurant Brand Story (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Subtle Royal Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-xs shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Robertsganj · Sonbhadra, Uttar Pradesh</span>
            </motion.div>

            {/* Headline with Serif & Italic Golden Nuances */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.12]">
                Highway Culinary Heritage, <br />
                <span className="text-gold-gradient italic font-normal">Pure Desi Ghee</span> Delicacies.
              </h1>
              <p className="font-display text-lg sm:text-xl text-amber-200/80 italic tracking-wide">
                "शुद्ध देसी घी और पारंपरिक मिट्टी के तंदूर का असली ज़ायका"
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light"
            >
              Welcome to <strong className="text-amber-300 font-semibold">Keshari Dhaba & Family Restaurant</strong> at Amarati, Robertsganj. 
              Savor slow-simmered Handi Dal Tadka, rich Paneer Butter Masala, charred clay-tandoor rotis, and the grand Maharaja Thali. 
              Relax in our peaceful lush garden courtyard or climate-controlled AC family hall along your Sonbhadra journey.
            </motion.p>

            {/* Verified Diner Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-300 pt-1"
            >
              <div className="flex items-center gap-1.5 font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-600/30">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="tabular-nums font-bold text-sm">4.0 / 5.0</span>
                <span className="text-stone-400 font-normal text-[11px]">(520+ Reviews)</span>
              </div>
              <span className="text-amber-900">•</span>
              <span className="text-stone-300">100% Pure Desi Ghee</span>
              <span className="text-amber-900">•</span>
              <span className="text-stone-300">AC Hall & Garden Courtyard</span>
              <span className="text-amber-900">•</span>
              <span className="text-stone-300">Pure Vegetarian</span>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#menu"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-950/50 border border-amber-300/40 hover:scale-102 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>

              <a
                href="#booking"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-500/30 hover:scale-102 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Table Booking</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors flex items-center gap-2 hover:scale-102 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Directions</span>
              </a>
            </motion.div>

            {/* Quick Highway Traveler Spec Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-900/30 text-xs"
            >
              <div className="p-3 rounded-lg bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                <div className="text-stone-400 text-[11px] uppercase tracking-wider">Timings</div>
                <div className="font-semibold text-stone-100 mt-0.5">{RESTAURANT_INFO.hours}</div>
                <div className="text-amber-400/80 text-[11px]">Open All 7 Days</div>
              </div>

              <div className="p-3 rounded-lg bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                <div className="text-stone-400 text-[11px] uppercase tracking-wider">Average Meal</div>
                <div className="font-semibold text-stone-100 mt-0.5 tabular-nums">{RESTAURANT_INFO.avgCostForTwo}</div>
                <div className="text-stone-400 text-[11px]">For Two Persons</div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-[#140f0c] border border-amber-900/20 hover:border-amber-500/30 transition-colors">
                <div className="text-stone-400 text-[11px] uppercase tracking-wider">Highway Comfort</div>
                <div className="font-semibold text-stone-100 mt-0.5">AC Hall + Open Garden</div>
                <div className="text-emerald-400 text-[11px]">Free Parking & Wheelchair Ramp</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Culinary Masterpiece Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Golden Ambient Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-amber-700/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#140f0c] shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                {/* Genuine Appetizing Dish Photography */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={signatureDish.imageUrl}
                    alt={signatureDish.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/30 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-md">
                      <Flame className="w-3.5 h-3.5" />
                      Chef's Signature Dish
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 block mb-0.5">
                        CLAY HANDI · PURE DESI GHEE
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                        {signatureDish.name}
                      </h3>
                    </div>
                    <div className="font-serif text-2xl font-bold text-amber-300 tabular-nums drop-shadow-md">
                      ₹{signatureDish.price}
                    </div>
                  </div>
                </div>

                {/* Card Description & Details */}
                <div className="p-5 space-y-4 bg-[#140f0c] border-t border-amber-900/30">
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    {signatureDish.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-900/20 text-xs text-stone-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      100% Pure Desi Ghee
                    </span>
                    <span>Prep Time: ~15 mins</span>
                    <a
                      href="#menu"
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Order on Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
