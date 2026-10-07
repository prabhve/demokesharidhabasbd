import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, UtensilsCrossed, GraduationCap, Sparkles } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface NavbarProps {
  orderCount?: number;
  onOpenOrderDrawer?: () => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#menu', label: 'Menu', id: 'menu' },
  { href: '#booking', label: 'Table Booking', id: 'booking' },
  { href: '#tourist-places', label: 'Sonbhadra Guide', id: 'tourist-places' },
  { href: '#testimonials', label: 'Reviews', id: 'testimonials' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ orderCount = 0, onOpenOrderDrawer }) => {
  const { restaurantInfo, announcement } = useAdminData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Handle smooth scroll navigation with sticky header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('');
        setMobileMenuOpen(false);
        return;
      }
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Sticky header height offset
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    }
  };

  // Active section scrollspy and detect when scrolled away from home
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // When user scrolls down more than 20px, hide the top notification popup
      setIsScrolled(scrollY > 20);

      const sectionElements = NAV_LINKS.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id),
      }));

      const scrollPos = scrollY + 160;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          const height = item.el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Special Notice Pop-up Bar - Automatically hides on scroll / when leaving home */}
      {announcement.enabled && announcement.text && (
        <div
          className={`bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 text-[11px] sm:text-xs text-center font-bold tracking-wide flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-12 py-1.5 px-3 opacity-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{announcement.text}</span>
        </div>
      )}

      {/* Top Contact & Location Ribbon - Automatically hides on scroll / when leaving home */}
      <div
        className={`bg-[#120e0a] text-amber-200/90 text-[10px] sm:text-xs border-b border-amber-900/30 overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled ? 'max-h-0 py-0 opacity-0 border-b-0 pointer-events-none' : 'max-h-16 py-1.5 px-3 sm:px-4 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <span className="flex items-center gap-1 text-stone-300 min-w-0">
              <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate max-w-[140px] xs:max-w-[190px] sm:max-w-none">
                {restaurantInfo.address}
              </span>
            </span>
            <span className="hidden md:inline-block text-amber-900">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Open Daily: {restaurantInfo.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-100 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold">{restaurantInfo.phonePrimary}</span>
            </a>
            <span className="text-amber-900/60 hidden sm:inline">|</span>
            <a
              href={restaurantInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="text-[11px] font-medium">WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Permanently Fixed and Visible */}
      <header
        className={`bg-[#0e0b08]/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? 'border-amber-500/30 shadow-2xl py-0'
            : 'border-amber-500/20 shadow-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Identity with Hindi Subscript */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-amber-950 flex items-center justify-center border border-amber-400/40 shadow-md group-hover:border-amber-300 transition-colors shrink-0">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
            </div>
            <div className="min-w-0">
              <div className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-100 leading-none group-hover:text-amber-300 transition-colors truncate">
                <span className="text-gold-gradient">Keshari</span> Dhaba
              </div>
              <div className="text-[9px] sm:text-[10px] text-amber-400/80 tracking-widest uppercase font-serif mt-0.5 sm:mt-1 truncate">
                केशरी ढाबा · सोनभद्र
              </div>
            </div>
          </a>

          {/* Navigation Links with Active Scrollspy Glow (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-stone-300">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 cursor-pointer transition-colors ${
                    isActive ? 'text-amber-400 font-bold' : 'hover:text-amber-300 text-stone-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-200 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Table Order Bill Tracker & Table Reservation */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenOrderDrawer && (
              <button
                onClick={onOpenOrderDrawer}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] sm:text-xs font-semibold text-amber-300 bg-[#1e1712] hover:bg-[#2a2019] rounded-lg border border-amber-500/30 whitespace-nowrap cursor-pointer shadow-sm transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>REC Delivery</span>
              </button>
            )}

            {orderCount > 0 && onOpenOrderDrawer && (
              <button
                onClick={onOpenOrderDrawer}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-amber-900 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap shadow-md cursor-pointer transition-colors"
              >
                <span>Bill ({orderCount})</span>
              </button>
            )}

            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 rounded-lg whitespace-nowrap shadow-lg shadow-amber-950/50 border border-amber-300/40 cursor-pointer transition-all"
            >
              Book Table
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg focus:outline-hidden min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#120e0a] border-b border-amber-900/40 px-4 sm:px-5 py-4 sm:py-5 space-y-4 overflow-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-1.5 text-xs font-semibold uppercase tracking-wider text-stone-300">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`py-3 px-3.5 rounded-xl flex items-center justify-between min-h-[44px] cursor-pointer transition-colors ${
                    activeSection === link.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                      : 'hover:bg-[#1a140f] text-stone-300 hover:text-white active:bg-amber-500/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-amber-900/30 flex flex-col gap-2.5">
              {onOpenOrderDrawer && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderDrawer();
                  }}
                  className="w-full py-3 bg-[#1e1712] text-amber-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-amber-500/30 min-h-[44px] cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>REC Sonbhadra Hostel Delivery</span>
                </button>
              )}
              <a
                href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
                className="w-full py-3 bg-[#1a140f] text-amber-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-amber-900/30 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {restaurantInfo.phonePrimary}</span>
              </a>
              <a
                href={restaurantInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Booking</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
