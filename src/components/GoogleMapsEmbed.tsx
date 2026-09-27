import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const GoogleMapsEmbed: React.FC = () => {
  const embedUrl = `https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&hl=en&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-[#140f0c] shadow-2xl">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-950/80 via-[#18120e] to-stone-900 border-b border-amber-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span>Interactive Google Maps Location</span>
          </div>
          <div className="font-serif text-lg sm:text-2xl font-bold mt-1 text-white">
            Keshari Dhaba & Family Restaurant
          </div>
          <div className="text-xs text-stone-300 mt-1 font-light">
            {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}, UP - {RESTAURANT_INFO.pincode}
          </div>
        </div>

        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60 whitespace-nowrap cursor-pointer min-h-[44px]"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#1f1813] hover:bg-[#2c231c] text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-xl border border-amber-900/40 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[44px]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Profile</span>
          </a>
        </div>
      </div>

      {/* Map Embed Iframe */}
      <div className="relative w-full h-72 sm:h-96 bg-stone-950">
        <iframe
          title="Keshari Dhaba Google Maps Location"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Floating Landmark Helper - Compact on Mobile */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-4 sm:left-4 bg-[#140f0c]/95 text-white backdrop-blur-md p-3 sm:p-4 rounded-xl border border-amber-500/40 text-xs shadow-2xl max-w-sm pointer-events-none">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px] sm:text-[11px]">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            Highway Landmark Guide
          </div>
          <p className="mt-1 text-stone-300 text-[11px] sm:text-xs leading-relaxed font-light">
            Located in Amarati on the main highway road, directly in front of the DIET Office, Urmaura. Step-free wheelchair ramp and ample secure parking for vehicles.
          </p>
        </div>
      </div>
    </div>
  );
};
