import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { GoogleMapsEmbed } from './GoogleMapsEmbed';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderQuery, setSenderQuery] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const queryMessage = `Namaste Keshari Dhaba! 🙏\n\nI have a general inquiry:\n• Name: ${senderName}\n• Contact: ${senderPhone}\n• Message: ${senderQuery}`;
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(queryMessage)}`, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-[#0f0c09] text-white border-b border-amber-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Location & Direct Communication</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Visit & Connect with <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
            Planning a private celebration in our AC hall, bus tour catering, or quick highway meal? Reach out directly via WhatsApp, phone, or visit our restaurant in Amarati, Robertsganj.
          </p>
        </motion.div>

        {/* 2-Column Split with Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Contact Details & Social Links (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-5 sm:p-8 bg-[#140f0c] rounded-2xl border border-amber-500/30 shadow-2xl space-y-5 sm:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Restaurant Address
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed font-light">
                    Keshari Dhaba & Family Restaurant<br />
                    Amarati, In Front of DIET Office, Urmaura<br />
                    Robertsganj, Sonbhadra, Uttar Pradesh — 231216
                  </p>
                  <div className="mt-2 text-xs font-semibold text-amber-400">
                    Landmark: Directly In Front of DIET Office
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5 sm:gap-4 pt-4 sm:pt-5 border-t border-amber-900/30">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Phone & WhatsApp Direct
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <a
                      href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                      className="font-mono text-amber-300 hover:text-amber-200 font-bold"
                    >
                      {RESTAURANT_INFO.phonePrimary}
                    </a>
                    <span className="text-amber-900">•</span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                      className="font-mono text-stone-300 hover:text-white"
                    >
                      {RESTAURANT_INFO.phoneSecondary}
                    </a>
                  </div>
                  <div className="mt-1 text-xs text-stone-400 font-light">
                    Open for table reservations, drive-through pre-orders, and large tour party bookings.
                  </div>
                </div>
              </div>

              {/* Dining Hours */}
              <div className="flex items-start gap-3.5 sm:gap-4 pt-4 sm:pt-5 border-t border-amber-900/30">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Service Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300 mt-1 font-semibold">
                    {RESTAURANT_INFO.hours}
                  </p>
                  <div className="text-xs text-stone-400 font-light mt-0.5">
                    Open all 7 days of the week including national & festival holidays.
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Directory */}
            <div className="p-5 sm:p-7 bg-[#140f0c] rounded-2xl border border-amber-500/30 shadow-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Online Directory & Social Media</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <a
                  href={RESTAURANT_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-emerald-950/60 border border-amber-900/30 hover:border-emerald-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-emerald-300 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={RESTAURANT_INFO.socialLinks.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-amber-950/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-amber-300 min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={RESTAURANT_INFO.socialLinks.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-amber-950/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-amber-300 min-h-[44px]"
                >
                  <span className="font-bold text-amber-400 shrink-0">JD</span>
                  <span>Justdial</span>
                </a>

                <a
                  href={RESTAURANT_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-blue-950/60 border border-amber-900/30 hover:border-blue-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-blue-300 min-h-[44px]"
                >
                  <span className="font-bold text-blue-400 shrink-0">FB</span>
                  <span>Facebook</span>
                </a>

                <a
                  href={RESTAURANT_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-pink-950/60 border border-amber-900/30 hover:border-pink-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-pink-300 min-h-[44px]"
                >
                  <span className="font-bold text-pink-400 shrink-0">IG</span>
                  <span>Instagram</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#1a1410] hover:bg-amber-950/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-amber-300 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Inquiry Form (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-[#140f0c] p-5 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              Send an Instant Inquiry or Event Query
            </h3>
            <p className="text-xs text-stone-400 mb-5 sm:mb-6 font-light">
              Questions regarding birthday bookings, customized family thali menus, or large tour bus lunch halt? Send a message and our manager will reply immediately on WhatsApp.
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Kumar"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 font-mono transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                  Message / Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We are a family of 12 stopping in Robertsganj en route from Varanasi. Could you have Maharaja Thalis ready by 1:30 PM?"
                  value={senderQuery}
                  onChange={(e) => setSenderQuery(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 resize-none font-light transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/60 hover:scale-101 min-h-[48px]"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp Direct</span>
              </button>

              {sentSuccess && (
                <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inquiry prepared! Opening WhatsApp to send directly to manager.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Integrated Google Maps Location Block with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GoogleMapsEmbed />
        </motion.div>
      </div>
    </section>
  );
};
