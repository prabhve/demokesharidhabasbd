import { useState } from 'react';
import { Phone, MessageCircle, Utensils } from 'lucide-react';
import { RESTAURANT_INFO, MenuItem } from './data/restaurantData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { MenuSection } from './components/MenuSection';
import { TableBookingSection } from './components/TableBookingSection';
import { TouristPlacesSection } from './components/TouristPlacesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderCalculatorDrawer } from './components/OrderCalculatorDrawer';
import { AnimatedSection } from './components/AnimatedSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [orderItems, setOrderItems] = useState<Record<string, number>>({});
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const current = prev[item.id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return {
        ...prev,
        [item.id]: current - 1,
      };
    });
  };

  const handleClearOrder = () => {
    setOrderItems({});
    setIsOrderDrawerOpen(false);
  };

  const totalItemCount = Object.values(orderItems).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-[#0c0907] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans antialiased overflow-x-hidden">
      {/* Real-time Golden Luxury Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Bar Navigation with Active Scrollspy */}
      <Navbar
        orderCount={totalItemCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Sections with Scroll-In Animations */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* Home / Hero Section with Parallax Background */}
        <Hero />

        {/* About Us Section */}
        <AnimatedSection direction="up" threshold={0.08}>
          <AboutSection />
        </AnimatedSection>

        {/* Gallery Section - Full-Width Masonry Grid */}
        <AnimatedSection direction="up" threshold={0.06}>
          <GallerySection />
        </AnimatedSection>

        {/* Food Menu & Dhaba Specialties */}
        <AnimatedSection direction="up" threshold={0.06}>
          <MenuSection
            orderItems={orderItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          />
        </AnimatedSection>

        {/* Table Booking through WhatsApp Direct Message */}
        <AnimatedSection direction="up" threshold={0.08}>
          <TableBookingSection />
        </AnimatedSection>

        {/* Sonbhadra Famous Tourist Places with Navigation */}
        <AnimatedSection direction="up" threshold={0.06}>
          <TouristPlacesSection />
        </AnimatedSection>

        {/* Testimonials & Verified Google Reviews */}
        <AnimatedSection direction="up" threshold={0.08}>
          <TestimonialsSection />
        </AnimatedSection>

        {/* Contact Us & Integrated Google Maps Location */}
        <AnimatedSection direction="up" threshold={0.06}>
          <ContactSection />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll To Top with SVG Progress Ring & Quick Actions */}
      <ScrollToTop />

      {/* Order Bill Estimator Slide-Over Drawer */}
      <OrderCalculatorDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        orderItems={orderItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />

      {/* Sticky Mobile Quick Action Bar with Touch Compliance (>= 44px touch targets) */}
      <aside
        aria-label="Quick Mobile Actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#120e0a]/95 backdrop-blur-md border-t border-amber-900/40 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl"
      >
        <a
          href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s+/g, '')}`}
          className="flex-1 py-3 px-3 bg-[#1c1612] hover:bg-[#282019] active:bg-[#282019] text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-amber-900/30 min-h-[44px] touch-manipulation"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call</span>
        </a>

        <a
          href="#menu"
          className="py-3 px-3.5 bg-[#1c1612] hover:bg-[#282019] active:bg-[#282019] text-amber-300 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-amber-900/30 min-h-[44px] touch-manipulation"
        >
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>Menu</span>
        </a>

        <a
          href="#booking"
          className="flex-1 py-3 px-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md border border-emerald-400/30 min-h-[44px] touch-manipulation"
        >
          <MessageCircle className="w-4 h-4 text-emerald-200" />
          <span>Book WhatsApp</span>
        </a>
      </aside>
    </div>
  );
}
