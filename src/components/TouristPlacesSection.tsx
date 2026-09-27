import React, { useState } from 'react';
import { Navigation, Compass, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOURIST_PLACES, RESTAURANT_INFO } from '../data/restaurantData';

export const TouristPlacesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearby' | 'waterfalls' | 'heritage'>('all');

  const filteredPlaces = TOURIST_PLACES.filter((place) => {
    if (activeFilter === 'nearby') return place.distanceKm <= 30;
    if (activeFilter === 'waterfalls') return place.category === 'Waterfall & Nature' || place.category === 'Scenic View';
    if (activeFilter === 'heritage') return place.category === 'Historical Fort' || place.category === 'Geological Wonder';
    return true;
  });

  return (
    <section id="tourist-places" className="py-16 sm:py-20 lg:py-28 bg-[#100d0a] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Sonbhadra Tourism Guide & Roadtrip Companion</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Explore Sonbhadra’s Wonders from <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
            Sonbhadra is Uttar Pradesh’s geological wonder and ancient heritage jewel. Centrally located on the highway in Robertsganj, Keshari Dhaba is your favorite highway pitstop to energize with hot parathas, dal tadka, and kulhad chai before or after visiting these legendary spots.
          </p>
        </motion.div>

        {/* Tourist Itinerary Banner - Mobile Stacked */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mb-8 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#18120e] to-stone-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 shadow-xl"
        >
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg font-bold text-white">
                Recommended 1-Day Sonbhadra Itinerary
              </div>
              <div className="text-xs sm:text-sm text-stone-300 font-light mt-1 leading-relaxed">
                Breakfast at Keshari Dhaba (08:00 AM) ➔ Salkhan Fossil Park (14 km) ➔ Vijaygarh Fort (30 km) ➔ Evening Dal Tadka & Tandoori Naan Dinner in Keshari Garden Courtyard.
              </div>
            </div>
          </div>
          <a
            href="#booking"
            className="w-full md:w-auto text-center px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md whitespace-nowrap hover:scale-102 min-h-[44px] flex items-center justify-center"
          >
            Pre-book Tour Lunch
          </a>
        </motion.div>

        {/* Filter Controls with Animated Active Pill - Touch Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: `All Wonders (${TOURIST_PLACES.length})` },
            { id: 'nearby', label: 'Nearby (Within 30 km)' },
            { id: 'waterfalls', label: 'Waterfalls & Nature' },
            { id: 'heritage', label: 'Heritage Forts & Fossils' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`relative px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 min-h-[38px] ${
                  isActive
                    ? 'text-stone-950 font-bold'
                    : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30 hover:border-amber-500/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTouristTab"
                    className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-950/60"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Attractions Grid with Mobile Rhythm */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredPlaces.map((place, idx) => (
              <motion.div
                key={place.id}
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
                className="group bg-[#140f0c] rounded-2xl border border-amber-900/30 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/50 transition-all duration-400"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/30 to-transparent" />

                    <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                      {place.category}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-stone-950/90 text-white text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded backdrop-blur-xs flex items-center gap-1.5 border border-stone-800">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>~{place.driveTimeMin} min drive</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {place.name}
                    </h3>
                    {place.hindiName && (
                      <div className="text-xs text-amber-200/60 font-serif mt-0.5">
                        {place.hindiName}
                      </div>
                    )}

                    <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl bg-[#1c1612] border border-amber-900/30 text-xs font-medium text-amber-300">
                      {place.highlight}
                    </div>

                    <p className="mt-2.5 text-stone-300 text-xs leading-relaxed line-clamp-3 font-light">
                      {place.description}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-amber-900/20 space-y-1.5 text-xs text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>{place.distanceKm} km</strong> from Keshari Dhaba</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>Best Season: {place.bestTimeToVisit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Action with Mobile Touch Target */}
                <div className="p-3.5 sm:p-4 bg-[#18130f] border-t border-amber-900/30">
                  <a
                    href={place.googleMapsNavUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer min-h-[44px]"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Start Navigation from Dhaba</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
