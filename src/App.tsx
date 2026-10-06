import { useState } from 'react';
import { Phone, MessageCircle, Utensils, ShieldAlert } from 'lucide-react';
import { MenuItem } from './data/restaurantData';
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
import { OrderCalculatorDrawer, OrderType } from './components/OrderCalculatorDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { AdminSecurityModal } from './components/admin/AdminSecurityModal';
import { AdminPanelModal } from './components/admin/AdminPanelModal';

function MainApp() {
  const { restaurantInfo } = useAdminData();
  const [orderItems, setOrderItems] = useState<Record<string, number>>({});
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [drawerOrderType, setDrawerOrderType] = useState<OrderType>('Dine-in');

  // Admin Security Modal & Fullscreen Admin Console
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const handleOpenOrderDrawer = (type: OrderType = 'Dine-in') => {
    setDrawerOrderType(type);
    setIsOrderDrawerOpen(true);
  };

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
      {/* Scroll Progress Bar across the whole site */}
      <ScrollProgressBar />

      {/* Top Bar Navigation */}
      <Navbar
        orderCount={totalItemCount}
        onOpenOrderDrawer={() => handleOpenOrderDrawer('Dine-in')}
      />

      {/* Main Content Sections - Pure Static Rendering with Zero Animation Delays */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* Home / Hero Section */}
        <Hero />

        {/* About Us Section */}
        <AboutSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Food Menu & Dhaba Specialties */}
        <MenuSection
          orderItems={orderItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onOpenOrderDrawer={(type) => handleOpenOrderDrawer(type || 'Dine-in')}
        />

        {/* Table Booking */}
        <TableBookingSection />

        {/* Sonbhadra Famous Tourist Places with Navigation */}
        <TouristPlacesSection />

        {/* Testimonials & Verified Google Reviews */}
        <TestimonialsSection />

        {/* Contact Us & Integrated Google Maps Location */}
        <ContactSection />
      </main>

      {/* Footer with Dedicated 100-Layer Protected Admin Portal Trigger */}
      <Footer onOpenAdmin={() => setIsSecurityModalOpen(true)} />

      {/* Scroll To Top Button */}
      <ScrollToTop />

      {/* Order Bill Estimator Slide-Over Drawer */}
      <OrderCalculatorDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        orderItems={orderItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        initialOrderType={drawerOrderType}
      />

      {/* 100-Layer Internal Security Passcode Modal */}
      <AdminSecurityModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onSuccess={() => {
          setIsSecurityModalOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Full-Screen Dedicated Admin Command Center with Left Navigation */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* Sticky Mobile Quick Action Bar */}
      <aside
        aria-label="Quick Mobile Actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#120e0a] border-t border-amber-900/40 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl"
      >
        <a
          href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
          className="flex-1 py-3 px-3 bg-[#1c1612] hover:bg-[#282019] text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 border border-amber-900/30 min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call</span>
        </a>

        <a
          href="#menu"
          className="py-3 px-3.5 bg-[#1c1612] hover:bg-[#282019] text-amber-300 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 border border-amber-900/30 min-h-[44px]"
        >
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>Menu</span>
        </a>

        <button
          onClick={() => setIsSecurityModalOpen(true)}
          className="p-3 bg-[#1c1612] hover:bg-[#282019] text-amber-400 rounded-xl border border-amber-900/30 flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="Staff Portal"
          title="Staff Portal"
        >
          <ShieldAlert className="w-4 h-4" />
        </button>

        <a
          href="#booking"
          className="flex-1 py-3 px-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-md border border-emerald-400/30 min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-200" />
          <span>Book WhatsApp</span>
        </a>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <AdminDataProvider>
      <MainApp />
    </AdminDataProvider>
  );
}
