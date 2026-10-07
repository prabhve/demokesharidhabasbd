import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { GoogleMapsEmbed } from './GoogleMapsEmbed';
import { AnimatedSection } from './AnimatedSection';
import { Card3D } from './Card3D';

export const ContactSection: React.FC = () => {
  const { restaurantInfo } = useAdminData();
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderQuery, setSenderQuery] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const queryMessage = `Namaste Keshari Dhaba! 🙏\n\nI have a general inquiry:\n• Name: ${senderName}\n• Contact: ${senderPhone}\n• Message: ${senderQuery}`;
    window.open(`https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(queryMessage)}`, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section id="contact" className="scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32 py-16 sm:py-20 lg:py-28 bg-[#0f0c09] text-white border-b border-amber-900/30 relative overflow-hidden perspective-1200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection direction="3d-rise" className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Location & Direct Communication</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Visit & Connect with <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
            Planning a private celebration in our AC hall, bus tour catering, or quick highway meal? Reach out directly via WhatsApp, phone, or visit our restaurant in Amarati, Robertsganj.
          </p>
        </AnimatedSection>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Contact Details & Social Links (6 cols) */}
          <AnimatedSection direction="3d-tilt-right" delay={100} className="lg:col-span-6 w-full space-y-6">
            <Card3D maxTilt={5} scale={1.01} glare={true} className="rounded-2xl">
              <div className="p-5 sm:p-8 bg-[#140f0c] rounded-2xl border border-amber-500/30 shadow-2xl space-y-5 sm:space-y-6 preserve-3d">
                {/* Address */}
                <div className="flex items-start gap-3.5 sm:gap-4 translate-z-2">
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
                <div className="flex items-start gap-3.5 sm:gap-4 pt-4 sm:pt-5 border-t border-amber-900/30 translate-z-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Phone & WhatsApp Direct
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <a
                        href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
                        className="font-mono text-amber-300 hover:text-amber-200 font-bold"
                      >
                        {restaurantInfo.phonePrimary}
                      </a>
                      <span className="text-amber-900">•</span>
                      <a
                        href={`tel:${restaurantInfo.phoneSecondary.replace(/\s+/g, '')}`}
                        className="font-mono text-stone-300 hover:text-white"
                      >
                        {restaurantInfo.phoneSecondary}
                      </a>
                    </div>
                    <div className="mt-1 text-xs text-stone-400 font-light">
                      Open for table reservations, drive-through pre-orders, and large tour party bookings.
                    </div>
                  </div>
                </div>

                {/* Dining Hours */}
                <div className="flex items-start gap-3.5 sm:gap-4 pt-4 sm:pt-5 border-t border-amber-900/30 translate-z-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Dining Timings & Availability
                    </h3>
                    <div className="mt-1 font-semibold text-stone-200 text-xs sm:text-sm">
                      {restaurantInfo.hours} — <span className="text-emerald-400">{restaurantInfo.days}</span>
                    </div>
                    <div className="mt-1 text-xs text-stone-400 font-light">
                      Late night food available for highway commuters. Fresh rotis and hot Dal Tadka round the clock.
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Quick Direction Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#1a140f] to-amber-950/80 border border-amber-500/40 flex items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  Navigate via Google Maps
                </div>
                <div className="text-[11px] text-stone-300 mt-0.5 font-light">
                  Exact GPS pinpoint for Robertsganj Varanasi Highway
                </div>
              </div>
              <a
                href={restaurantInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[40px] transition-transform hover:scale-105 active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Maps</span>
              </a>
            </div>
          </AnimatedSection>

          {/* Quick Inquiry Form (6 cols) */}
          <AnimatedSection direction="3d-tilt-left" delay={180} className="lg:col-span-6 w-full">
            <Card3D maxTilt={5} scale={1.01} glare={true} className="rounded-2xl">
              <div className="bg-[#140f0c] p-5 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl preserve-3d">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 translate-z-2">
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
                      placeholder="e.g. Anand Jaiswal"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9450328111"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                      Inquiry Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us your date, group size, catering requirements, or questions..."
                      value={senderQuery}
                      onChange={(e) => setSenderQuery(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>

                  {sentSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>WhatsApp opened! We will respond promptly.</span>
                    </div>
                  )}
                </form>
              </div>
            </Card3D>
          </AnimatedSection>
        </div>

        {/* Interactive Google Maps Embed Component */}
        <AnimatedSection direction="3d-rise" delay={200}>
          <GoogleMapsEmbed />
        </AnimatedSection>
      </div>
    </section>
  );
};
