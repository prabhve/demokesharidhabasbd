import React from 'react';
import { MapPin, Phone, MessageCircle, Heart, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080605] text-stone-400 text-xs border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 pb-28 sm:pb-24 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: Brand & Heritage */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 flex items-center justify-center border border-amber-400/40">
                <UtensilsCrossed className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-serif text-xl font-bold text-white block">
                <span className="text-gold-gradient">Keshari</span> Dhaba
              </span>
            </div>

            <div className="text-amber-400/90 font-serif text-xs tracking-wider">
              केशरी ढाबा एवं फैमिली रेस्टोरेंट · सोनभद्र
            </div>

            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Celebrating genuine North Indian culinary traditions prepared in pure Desi Ghee in Amarati, Robertsganj. Air-conditioned family banquet hall, outdoor garden dining, and express parcel services for highway commuters.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors py-1 inline-block">Our Culinary Heritage</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors py-1 inline-block">Photo Gallery & Garden Dining</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors py-1 inline-block">Food Menu & Desi Ghee Curries</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-300 transition-colors py-1 inline-block">Reserve Table (WhatsApp Direct)</a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">Sonbhadra Tourism Guide</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-300 transition-colors py-1 inline-block">Verified Guest Reviews</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors py-1 inline-block">Location Map & Contacts</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sonbhadra Tourist Wonders */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Sonbhadra Attractions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Salkhan Fossil Park (14 km · Stromatolites)
                </a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Vijaygarh Fort (30 km · Chandrakanta Fame)
                </a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Lakhaniya Dari Waterfall (48 km)
                </a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Son View Point (6 km · 12 Min Drive)
                </a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Rajdari & Devdari Waterfalls (56 km)
                </a>
              </li>
              <li>
                <a href="#tourist-places" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Govind Ballabh Pant Sagar / Rihand (95 km)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Visit & Timings
            </h4>
            <div className="space-y-2 text-xs text-stone-300 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Amarati, In Front of DIET Office, Urmaura, Robertsganj, Sonbhadra, UP - 231216</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`} className="font-mono text-white font-semibold hover:text-amber-300">
                  {RESTAURANT_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium">WhatsApp Booking Active</span>
              </div>
              <div className="pt-1 text-stone-400">
                Operating Hours: <strong className="text-amber-300">{RESTAURANT_INFO.hours}</strong> (Open All 7 Days)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Keshari Dhaba & Family Restaurant. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Robertsganj & Sonbhadra highway roadtrippers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
