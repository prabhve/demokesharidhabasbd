import React, { useState } from 'react';
import { MessageCircle, Users, Clock, Phone, Copy, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AnimatedSection } from './AnimatedSection';
import { Card3D } from './Card3D';

export const TableBookingSection: React.FC = () => {
  const { restaurantInfo, addTableBooking } = useAdminData();
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

  const formattedMessage = `Namaste Keshari Dhaba! 🙏
I would like to book a table:
• Name: ${name || '[Your Name]'}
• Phone: ${phone || '[Your Phone]'}
• Guests: ${guests} Persons
• Date: ${date}
• Time: ${timeSlot}
• Seating Preference: ${diningArea}
• Occasion: ${occasion}
${specialNotes ? `• Note: ${specialNotes}\n` : ''}Please confirm our reservation. Dhanyawad!`;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addTableBooking({
      name,
      phone,
      guests: parseInt(guests) || 2,
      date,
      timeSlot,
      diningArea,
      occasion,
      specialNotes,
    });

    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="booking" className="scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32 py-16 sm:py-20 lg:py-28 bg-[#0c0907] text-white border-b border-amber-900/30 relative overflow-hidden perspective-1200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <AnimatedSection direction="3d-rise" className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Direct WhatsApp Confirmation · Instant Table Hold</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Reserve Your Table at <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
            Fill out your dining details. Our system formats a polite WhatsApp reservation request ready to send directly to our restaurant manager for instant priority seating.
          </p>
        </AnimatedSection>

        {/* 2-Column Suite with Mobile Stacking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Form (7 cols) */}
          <AnimatedSection direction="3d-tilt-right" delay={100} className="lg:col-span-7 w-full">
            <form
              onSubmit={handleWhatsAppBooking}
              className="bg-[#140f0c] p-5 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-5 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Pratap Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                    WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>No. of Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 40].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Person' : 'Persons'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  >
                    {[
                      '08:00 AM (Breakfast)',
                      '09:30 AM (Breakfast)',
                      '12:30 PM (Lunch)',
                      '01:30 PM (Lunch)',
                      '02:30 PM (Lunch)',
                      '04:30 PM (Snacks & Tea)',
                      '07:00 PM (Dinner)',
                      '08:00 PM (Dinner)',
                      '09:00 PM (Dinner)',
                      '10:00 PM (Late Dinner)',
                      '11:00 PM (Highway Night)',
                    ].map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                    Dining Hall Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['AC Family Hall', 'Open Garden Dining'].map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setDiningArea(area)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer min-h-[44px] flex items-center justify-center ${
                          diningArea === area
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                            : 'bg-[#1b1511] text-stone-400 border-amber-900/30 hover:border-amber-700'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                    Dining Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 min-h-[44px]"
                  >
                    {[
                      'Highway Travel Pitstop',
                      'Family Dinner',
                      'Birthday Celebration',
                      'Friends Get-together',
                      'Tour Bus Group Meal',
                      'Business Meeting',
                    ].map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1.5 sm:mb-2">
                  Special Food or Seating Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need high chair for child, prepare less spicy Paneer, birthday dessert setup..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#1b1511] border border-amber-900/40 rounded-xl text-base sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Reservation on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-3 bg-[#1e1713] hover:bg-[#291f1a] text-stone-300 border border-amber-900/40 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-400 pt-1 gap-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Zero advance reservation deposit required</span>
                </div>
                <a
                  href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
                  className="text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto py-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Urgent? Call Manager Directly</span>
                </a>
              </div>
            </form>
          </AnimatedSection>

          {/* Right: Live Reservation Pass Preview (5 cols) */}
          <AnimatedSection direction="3d-tilt-left" delay={180} className="lg:col-span-5 w-full space-y-4 sm:space-y-5">
            <Card3D maxTilt={6} scale={1.02} glare={true} className="rounded-2xl">
              <div className="bg-[#140f0c] rounded-2xl border border-amber-500/30 p-5 sm:p-6 overflow-hidden shadow-2xl preserve-3d">
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30 text-xs text-stone-400 translate-z-2">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Live WhatsApp Message Preview
                  </span>
                  <span className="font-mono text-[11px] text-amber-400">Keshari Dhaba</span>
                </div>

                {/* Chat Bubble simulation */}
                <div className="mt-3.5 p-4 sm:p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-stone-200 text-xs sm:text-sm font-sans space-y-2 leading-relaxed whitespace-pre-line shadow-inner break-words translate-z-4">
                  {formattedMessage}
                </div>

                <div className="mt-4 pt-3.5 border-t border-amber-900/30 space-y-2 text-xs text-stone-300 translate-z-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct connection to dining hall manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Special arrangements for large tour bus groups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pure vegetarian food cooked in pure Desi Ghee</span>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Quick Call Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/80 to-[#1c140d] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Arriving in Next 15 Mins?</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Call directly to have your table set & ready</div>
              </div>
              <a
                href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shrink-0 shadow-md min-h-[40px] transition-transform hover:scale-105 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
