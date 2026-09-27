import React, { useState } from 'react';
import { MessageCircle, Users, Clock, Phone, Copy, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const TableBookingSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:00 PM');
  const [diningArea, setDiningArea] = useState('AC Family Hall');
  const [occasion, setOccasion] = useState('Family Dinner');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate polite, clean WhatsApp reservation message
  const generateWhatsAppMessage = () => {
    return `Namaste Keshari Dhaba Team! 🙏

I would like to reserve a table at Keshari Dhaba, Robertsganj:
• Name: ${name.trim() || '[Your Name]'}
• Contact: ${phone.trim() || '[Your Phone]'}
• Guests: ${guests} ${parseInt(guests, 10) === 1 ? 'Person' : 'People'}
• Date: ${date}
• Time: ${timeSlot}
• Seating Preference: ${diningArea}
• Occasion: ${occasion}
${specialNotes.trim() ? `• Special Requests: ${specialNotes.trim()}\n` : ''}
Please confirm table availability. Thank you!`;
  };

  const formattedMessage = generateWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#0c0907] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Direct WhatsApp Confirmation · Instant Table Hold</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Reserve Your Table at <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Fill out your dining details. Our system formats a polite WhatsApp reservation request ready to send directly to our restaurant manager for instant priority seating.
          </p>
        </motion.div>

        {/* 2-Column Suite with Scroll-in Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Form (7 cols) */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleWhatsAppBooking}
            className="lg:col-span-7 bg-[#140f0c] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Pratap Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 94503 28111"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Date of Visit *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                >
                  <option value="12:30 PM">12:30 PM (Highway Lunch)</option>
                  <option value="01:30 PM">01:30 PM (Peak Lunch)</option>
                  <option value="02:30 PM">02:30 PM (Late Lunch)</option>
                  <option value="05:30 PM">05:30 PM (Evening Tea & Snacks)</option>
                  <option value="07:30 PM">07:30 PM (Early Dinner)</option>
                  <option value="08:30 PM">08:30 PM (Dinner Hour)</option>
                  <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                  <option value="10:30 PM">10:30 PM (Late Highway Halt)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Guests *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Guests (Couple Table)</option>
                  <option value="4">4 Guests (Family Table)</option>
                  <option value="6">6 Guests (Family Table)</option>
                  <option value="8">8 Guests (Large Group)</option>
                  <option value="12">12 Guests (Celebration Table)</option>
                  <option value="20">20+ Guests (Tour Bus Group)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Seating Area
                </label>
                <select
                  value={diningArea}
                  onChange={(e) => setDiningArea(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                >
                  <option value="AC Family Hall">Air-Conditioned Family Dining Hall</option>
                  <option value="Lush Garden Courtyard">Lush Garden Courtyard (Al Fresco)</option>
                  <option value="Highway Express Seating">Highway Express (Fast Turnaround)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                >
                  <option value="Family Dinner">Family Dinner</option>
                  <option value="Tourist Roadtrip Meal">Tourist Roadtrip Meal</option>
                  <option value="Birthday / Anniversary">Birthday / Anniversary Celebration</option>
                  <option value="Business Traveler Stop">Business Traveler Stop</option>
                  <option value="Casual Gathering">Casual Gathering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                Special Requests or Children High-Chair (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Mild spice for children, high chair needed, table ready on highway arrival..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 resize-none font-light transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer border border-emerald-400/30 hover:scale-101"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>Send Table Reservation on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="py-3.5 px-5 bg-[#1b1511] hover:bg-[#261e18] text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-xl border border-amber-900/40 transition-colors flex items-center justify-center gap-2 cursor-pointer hover:border-amber-400/40"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="text-[11px] text-stone-400 flex items-center justify-between pt-1">
              <span>* Zero reservation fee. Table kept reserved for 15 minutes.</span>
              <a
                href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Urgent? Call Manager Directly</span>
              </a>
            </div>
          </motion.form>

          {/* Right: Live Reservation Pass Preview (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="bg-[#140f0c] rounded-2xl border border-amber-500/30 p-6 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-amber-900/30 text-xs text-stone-400">
                <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live WhatsApp Message Preview
                </span>
                <span className="font-mono text-[11px] text-amber-400">Keshari Dhaba</span>
              </div>

              {/* Chat Bubble simulation */}
              <div className="mt-4 p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-stone-200 text-xs sm:text-sm font-sans space-y-2 leading-relaxed whitespace-pre-line shadow-inner">
                {formattedMessage}
              </div>

              <div className="mt-5 pt-4 border-t border-amber-900/30 space-y-2.5 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct connection to dining hall manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Special arrangements for large tour bus groups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pure vegetarian food cooked in pure Desi Ghee</span>
                </div>
              </div>
            </div>

            {/* Quick Call Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/80 to-[#1c140d] border border-amber-500/30 flex items-center justify-between gap-3 shadow-xl">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Arriving in Next 15 Mins?</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Call directly to have your table set & ready</div>
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-md hover:scale-102"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
