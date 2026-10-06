import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  Utensils,
  Building2,
  Image as ImageIcon,
  Compass,
  Calendar,
  Star,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Phone,
  MessageCircle,
  DollarSign,
  Download,
  Upload,
  RotateCcw,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  Eye,
  Film,
} from 'lucide-react';
import { useAdminData, LiveOrder, TableBookingRecord } from '../../context/AdminDataContext';
import { MenuItem, TouristPlace, Testimonial } from '../../data/restaurantData';
import { GalleryItem } from '../GallerySection';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | 'monitoring'
  | 'orders'
  | 'menu'
  | 'restaurant'
  | 'gallery'
  | 'tourism'
  | 'reservations'
  | 'reviews'
  | 'security';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    restaurantInfo,
    updateRestaurantInfo,
    recDeliveryInfo,
    updateRecDeliveryInfo,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    touristPlaces,
    addTouristPlace,
    updateTouristPlace,
    deleteTouristPlace,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    liveOrders,
    updateOrderStatus,
    deleteOrder,
    tableBookings,
    updateBookingStatus,
    deleteBooking,
    announcement,
    updateAnnouncement,
    adminPasscode,
    updateAdminPasscode,
    resetToDefaults,
    exportDatabaseJson,
    importDatabaseJson,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<AdminTab>('monitoring');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Search states
  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilterCat, setMenuFilterCat] = useState<string>('all');

  // Modals for adding/editing items
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [isAddingTourist, setIsAddingTourist] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  // New Dish Form State
  const [dishForm, setDishForm] = useState<Partial<MenuItem>>({
    name: '',
    hindiName: '',
    category: 'paneer',
    price: 150,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isBestseller: false,
    isChefSpecial: false,
    spiceLevel: 'Medium',
    prepTime: '15 mins',
    tags: ['Pure Desi Ghee'],
  });

  // Media Gallery Form State
  const [mediaForm, setMediaForm] = useState<Partial<GalleryItem>>({
    title: '',
    hindiTitle: '',
    category: 'garden',
    categoryLabel: 'Garden Seating',
    imageUrl: '',
    aspectRatioClass: 'aspect-[4/3]',
    caption: '',
    highlightTag: 'Al Fresco Ambience',
  });

  // Tourist Form State
  const [touristForm, setTouristForm] = useState<Partial<TouristPlace>>({
    name: '',
    hindiName: '',
    category: 'Geological Wonder',
    distanceKm: 15,
    driveTimeMin: 25,
    highlight: '',
    description: '',
    imageUrl: '',
    bestTimeToVisit: 'October - March',
    bestTimeOfDay: 'Morning / Afternoon',
    googleMapsNavUrl: 'https://maps.google.com',
    mapEmbedUrl: 'https://maps.google.com',
    coordinates: { lat: 24.6, lng: 83.0 },
    recommendedDuration: '2 - 3 Hours',
    trekDifficulty: 'Easy Walk',
    roadCondition: 'Good Paved Highway',
    entryFee: 'Free',
    travelerTip: '',
    mustCarry: ['Water Bottle', 'Comfortable Shoes'],
    tags: ['Local Wonder'],
  });

  // Testimonial Form State
  const [reviewForm, setReviewForm] = useState<Partial<Testimonial>>({
    author: '',
    location: '',
    rating: 5,
    date: 'Recently',
    comment: '',
    dishRecommended: 'Keshari Special Handi Dal Tadka',
    tripType: 'Highway Traveler',
  });

  // Passcode change
  const [newPasscode, setNewPasscode] = useState('');
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Calculations for Monitoring Dashboard
  const totalRevenue = liveOrders.reduce((sum, ord) => sum + ord.grandTotal, 0);
  const recOrdersCount = liveOrders.filter((ord) => ord.orderType === 'REC Sonbhadra Delivery').length;
  const pendingOrdersCount = liveOrders.filter((ord) => ord.status === 'Pending' || ord.status === 'Preparing').length;
  const activeBookingsCount = tableBookings.filter((b) => b.status === 'Confirmed').length;

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishForm.name || !dishForm.price) return;

    if (editingDish) {
      updateMenuItem(editingDish.id, dishForm);
      triggerToast(`Dish "${dishForm.name}" updated successfully!`);
      setEditingDish(null);
    } else {
      const newDish: MenuItem = {
        id: `dish-${Date.now()}`,
        name: dishForm.name,
        hindiName: dishForm.hindiName || '',
        category: (dishForm.category as MenuItem['category']) || 'signature',
        price: Number(dishForm.price),
        description: dishForm.description || '',
        imageUrl: dishForm.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        isVeg: Boolean(dishForm.isVeg),
        isBestseller: Boolean(dishForm.isBestseller),
        isChefSpecial: Boolean(dishForm.isChefSpecial),
        spiceLevel: dishForm.spiceLevel || 'Medium',
        prepTime: dishForm.prepTime || '15 mins',
        tags: dishForm.tags || ['Desi Ghee'],
      };
      addMenuItem(newDish);
      triggerToast(`New dish "${newDish.name}" added to menu!`);
    }

    setIsAddingDish(false);
    setDishForm({
      name: '',
      hindiName: '',
      category: 'paneer',
      price: 150,
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isBestseller: false,
      isChefSpecial: false,
      spiceLevel: 'Medium',
      prepTime: '15 mins',
      tags: ['Pure Desi Ghee'],
    });
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title || !mediaForm.imageUrl) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: mediaForm.title,
      hindiTitle: mediaForm.hindiTitle || '',
      category: (mediaForm.category as GalleryItem['category']) || 'garden',
      categoryLabel: mediaForm.categoryLabel || 'Photo Gallery',
      imageUrl: mediaForm.imageUrl,
      aspectRatioClass: mediaForm.aspectRatioClass || 'aspect-[4/3]',
      caption: mediaForm.caption || '',
      highlightTag: mediaForm.highlightTag || 'Ambience',
    };

    addGalleryItem(newItem);
    setIsAddingGallery(false);
    triggerToast(`Gallery item "${newItem.title}" published!`);
    setMediaForm({
      title: '',
      hindiTitle: '',
      category: 'garden',
      categoryLabel: 'Garden Seating',
      imageUrl: '',
      aspectRatioClass: 'aspect-[4/3]',
      caption: '',
      highlightTag: 'Al Fresco Ambience',
    });
  };

  const handleSaveTourist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!touristForm.name) return;

    const newPlace: TouristPlace = {
      id: `tourist-${Date.now()}`,
      name: touristForm.name,
      hindiName: touristForm.hindiName || '',
      category: touristForm.category || 'Geological Wonder',
      distanceKm: Number(touristForm.distanceKm) || 10,
      driveTimeMin: Number(touristForm.driveTimeMin) || 15,
      highlight: touristForm.highlight || '',
      description: touristForm.description || '',
      imageUrl: touristForm.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      bestTimeToVisit: touristForm.bestTimeToVisit || 'October - March',
      bestTimeOfDay: touristForm.bestTimeOfDay || 'Morning',
      googleMapsNavUrl: touristForm.googleMapsNavUrl || 'https://maps.google.com',
      mapEmbedUrl: touristForm.mapEmbedUrl || 'https://maps.google.com',
      coordinates: touristForm.coordinates || { lat: 24.6, lng: 83.0 },
      recommendedDuration: touristForm.recommendedDuration || '2 Hours',
      trekDifficulty: touristForm.trekDifficulty || 'Easy Walk',
      roadCondition: touristForm.roadCondition || 'Paved Road',
      entryFee: touristForm.entryFee || 'Free',
      travelerTip: touristForm.travelerTip || '',
      mustCarry: touristForm.mustCarry || ['Water'],
      tags: touristForm.tags || ['Sonbhadra'],
    };

    addTouristPlace(newPlace);
    setIsAddingTourist(false);
    triggerToast(`Tourist spot "${newPlace.name}" added to guide!`);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.comment) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      author: reviewForm.author,
      location: reviewForm.location || 'Robertsganj',
      rating: Number(reviewForm.rating) || 5,
      date: reviewForm.date || 'Today',
      comment: reviewForm.comment,
      dishRecommended: reviewForm.dishRecommended || 'Handi Dal Tadka',
      tripType: reviewForm.tripType || 'Highway Traveler',
    };

    addTestimonial(newRev);
    setIsAddingReview(false);
    triggerToast(`Customer review for "${newRev.author}" added!`);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keshari-dhaba-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Database backup downloaded successfully!');
  };

  const handleRestoreBackup = () => {
    if (!importJsonText.trim()) return;
    const ok = importDatabaseJson(importJsonText);
    if (ok) {
      triggerToast('Database restored successfully from JSON!');
      setImportJsonText('');
    } else {
      alert('Invalid JSON backup file. Please verify schema.');
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = menuFilterCat === 'all' || item.category === menuFilterCat;
    const matchesSearch =
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(menuSearch));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#090706] text-stone-100 flex flex-col w-screen h-screen overflow-hidden">
      {/* =================================================================== */}
      {/* TOP COMMAND HEADER                                                  */}
      {/* =================================================================== */}
      <header className="h-14 sm:h-16 px-4 sm:px-6 bg-[#120e0b] border-b border-amber-900/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-800 flex items-center justify-center font-serif font-bold text-white shadow-md text-sm border border-amber-400/30">
            KD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
                Keshari Dhaba Command Center
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Systems Active
              </span>
            </div>
            <div className="text-[11px] text-amber-400/80 font-mono hidden xs:block">
              Full-Stack CMS · Monitoring · Menu · Media · Sonbhadra Operations
            </div>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {saveToast && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs rounded-lg font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveToast}</span>
            </div>
          )}

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="px-3 py-1.5 rounded-lg bg-[#1e1712] hover:bg-[#2b211a] border border-amber-900/40 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View Website</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Exit admin panel"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Console</span>
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MAIN BODY: LEFT SIDEBAR + CONTENT VIEWPORT                          */}
      {/* =================================================================== */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* ----------------------------------------------------------------- */}
        {/* LEFT SIDEBAR: ALL FEATURES NAVIGATION                             */}
        {/* ----------------------------------------------------------------- */}
        <aside className="w-full md:w-64 lg:w-72 bg-[#0e0b08] border-b md:border-b-0 md:border-r border-amber-900/40 shrink-0 flex md:flex-col overflow-x-auto md:overflow-y-auto p-2 sm:p-3 space-x-1 md:space-x-0 md:space-y-1.5 scrollbar-none">
          <div className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Management & CMS Suite
          </div>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'monitoring'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard & Monitoring</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>REC Sonbhadra Orders</span>
            </div>
            {pendingOrdersCount > 0 && (
              <span
                className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                  activeTab === 'orders' ? 'bg-stone-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Utensils className="w-4 h-4 shrink-0" />
              <span>Menu & Dishes CMS</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                activeTab === 'menu' ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              {menuItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('restaurant')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'restaurant'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Restaurant Info & Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Photos & Videos CMS</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                activeTab === 'gallery' ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              {galleryItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tourism')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'tourism'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Sonbhadra Tourism CMS</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                activeTab === 'tourism' ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              {touristPlaces.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'reservations'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Table Reservations</span>
            </div>
            {activeBookingsCount > 0 && (
              <span
                className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                  activeTab === 'reservations' ? 'bg-stone-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'reviews'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 shrink-0" />
              <span>Diner Reviews CMS</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                activeTab === 'reviews' ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-colors w-full ${
              activeTab === 'security'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:bg-[#19130e] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Security & Backup</span>
          </button>
        </aside>

        {/* ----------------------------------------------------------------- */}
        {/* RIGHT VIEWPORT: ACTIVE FEATURE PANEL                              */}
        {/* ----------------------------------------------------------------- */}
        <main className="flex-1 bg-[#090706] p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* =============================================================== */}
          {/* TAB 1: MONITORING & DASHBOARD                                   */}
          {/* =============================================================== */}
          {activeTab === 'monitoring' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Real-Time Restaurant & Delivery Monitoring
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Live metrics, active online order pipeline, and quick operational status controls.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-1">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>Today's Total Orders</span>
                    <Utensils className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {liveOrders.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    {pendingOrdersCount} in active kitchen prep
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-1">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>REC Sonbhadra Orders</span>
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">
                    {recOrdersCount}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Hostel drops · ₹{recDeliveryInfo.standardDeliveryCharge} fee
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-1">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>Estimated Sales Total</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    ₹{totalRevenue}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    Cash & UPI Combined
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-1">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>Table Reservations</span>
                    <Calendar className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {tableBookings.length}
                  </div>
                  <div className="text-[11px] text-amber-300/80">
                    {activeBookingsCount} confirmed bookings
                  </div>
                </div>
              </div>

              {/* Quick Operational Status Controls */}
              <div className="p-5 rounded-2xl bg-[#140f0c] border border-amber-500/30 space-y-4">
                <div className="font-serif text-sm sm:text-base font-bold text-white flex items-center justify-between">
                  <span>Fast Operational Toggles</span>
                  <span className="text-[11px] text-amber-400 font-mono">Instant Live Effect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#1c1510] border border-amber-900/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Top Alert Ribbon</div>
                      <div className="text-[10px] text-stone-400">
                        {announcement.enabled ? 'Shown on top' : 'Hidden'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        updateAnnouncement({ enabled: !announcement.enabled });
                        triggerToast(`Announcement ribbon ${!announcement.enabled ? 'enabled' : 'hidden'}`);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        announcement.enabled ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {announcement.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c1510] border border-amber-900/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">REC Delivery Standard Fee</div>
                      <div className="text-[10px] text-stone-400">Current: ₹{recDeliveryInfo.standardDeliveryCharge}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const newFee = Math.max(0, recDeliveryInfo.standardDeliveryCharge - 10);
                          updateRecDeliveryInfo({ standardDeliveryCharge: newFee });
                          triggerToast(`Delivery fee updated to ₹${newFee}`);
                        }}
                        className="w-7 h-7 bg-stone-800 rounded font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-amber-400 px-1 text-xs">
                        ₹{recDeliveryInfo.standardDeliveryCharge}
                      </span>
                      <button
                        onClick={() => {
                          const newFee = recDeliveryInfo.standardDeliveryCharge + 10;
                          updateRecDeliveryInfo({ standardDeliveryCharge: newFee });
                          triggerToast(`Delivery fee updated to ₹${newFee}`);
                        }}
                        className="w-7 h-7 bg-amber-500 text-stone-950 rounded font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c1510] border border-amber-900/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">UPI QR Payments</div>
                      <div className="text-[10px] text-stone-400 font-mono">{recDeliveryInfo.upiId}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Stream */}
              <div className="p-5 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-serif text-sm sm:text-base font-bold text-white">
                    Live Incoming Orders Stream
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {liveOrders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 rounded-xl bg-[#1a1410] border border-amber-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">#{order.orderId}</span>
                          <span className="text-stone-300 font-semibold">{order.customerName}</span>
                          <span className="text-stone-500">({order.customerPhone})</span>
                        </div>
                        <div className="text-stone-400 text-[11px]">
                          {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                        </div>
                        {order.hostelLocation && (
                          <div className="text-amber-300 text-[11px]">
                            🎓 Drop: {order.hostelLocation} {order.roomNumber ? `(${order.roomNumber})` : ''}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="font-serif text-sm font-bold text-amber-300">
                            ₹{order.grandTotal}
                          </div>
                          <div className="text-[10px] text-stone-400">{order.timestamp}</div>
                        </div>

                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value as LiveOrder['status']);
                            triggerToast(`Order #${order.orderId} set to ${e.target.value}`);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : order.status === 'Preparing'
                              ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                              : order.status === 'Out for Delivery'
                              ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                              : 'bg-stone-900 text-stone-300 border-stone-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 2: REC SONBHADRA DELIVERY ORDERS                            */}
          {/* =============================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-amber-400" />
                    <span>REC Sonbhadra Campus Deliveries & Orders</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Live orders placed by college students with hostel room locations, UPI status, and phone numbers.
                  </p>
                </div>
              </div>

              {/* Delivery Fee & Settings Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-stone-400 text-[11px] uppercase tracking-wider mb-1 font-semibold">
                    Campus Delivery Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={recDeliveryInfo.standardDeliveryCharge}
                    onChange={(e) => updateRecDeliveryInfo({ standardDeliveryCharge: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-[11px] uppercase tracking-wider mb-1 font-semibold">
                    Restaurant UPI ID for Payments
                  </label>
                  <input
                    type="text"
                    value={recDeliveryInfo.upiId}
                    onChange={(e) => updateRecDeliveryInfo({ upiId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-[11px] uppercase tracking-wider mb-1 font-semibold">
                    Estimated Time (e.g. 30 - 45 mins)
                  </label>
                  <input
                    type="text"
                    value={recDeliveryInfo.estimatedDeliveryTime}
                    onChange={(e) => updateRecDeliveryInfo({ estimatedDeliveryTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-3.5">
                {liveOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/30 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sm text-amber-400">
                          #{order.orderId}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#201812] text-amber-300 border border-amber-900/40">
                          {order.orderType}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          {order.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value as LiveOrder['status']);
                            triggerToast(`Order #${order.orderId} updated to ${e.target.value}`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : order.status === 'Preparing'
                              ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                              : order.status === 'Out for Delivery'
                              ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                              : 'bg-stone-900 text-stone-300 border-stone-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing in Kitchen</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete order #${order.orderId}?`)) {
                              deleteOrder(order.id);
                              triggerToast('Order deleted');
                            }
                          }}
                          className="p-1.5 text-stone-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-stone-500 font-semibold uppercase text-[10px]">Customer / Student</div>
                        <div className="text-stone-200 font-bold text-sm mt-0.5">{order.customerName}</div>
                        <a
                          href={`tel:${order.customerPhone.replace(/\s+/g, '')}`}
                          className="text-amber-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{order.customerPhone}</span>
                        </a>
                      </div>

                      {order.hostelLocation && (
                        <div>
                          <div className="text-stone-500 font-semibold uppercase text-[10px]">Campus Drop Point</div>
                          <div className="text-amber-300 font-semibold mt-0.5">{order.hostelLocation}</div>
                          {order.roomNumber && (
                            <div className="text-stone-300">Room / Wing: {order.roomNumber}</div>
                          )}
                        </div>
                      )}

                      <div>
                        <div className="text-stone-500 font-semibold uppercase text-[10px]">Payment Status</div>
                        <div className="mt-0.5">
                          {order.paymentStatus === 'PAID_ONLINE' ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Paid Online via QR</span>
                            </span>
                          ) : (
                            <span className="text-amber-300 font-bold flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Pay at Hostel Gate</span>
                            </span>
                          )}
                          {order.upiRef && (
                            <div className="text-[10px] text-stone-400 font-mono">Ref: {order.upiRef}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-stone-500 font-semibold uppercase text-[10px]">Total Bill</div>
                        <div className="font-serif text-lg font-bold text-white mt-0.5">
                          ₹{order.grandTotal}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          Dishes: ₹{order.dishesSubtotal} | Delivery: ₹{order.deliveryCharge}
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="pt-2 border-t border-amber-900/20 text-xs">
                      <div className="text-stone-400 font-semibold text-[11px] mb-1">Ordered Dishes:</div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#1a130f] border border-amber-900/30 text-stone-300"
                          >
                            <strong>{item.qty}x</strong> {item.name} (₹{item.price * item.qty})
                          </span>
                        ))}
                      </div>
                      {order.deliveryNotes && (
                        <div className="mt-2 text-[11px] text-stone-400 italic">
                          Special Note: "{order.deliveryNotes}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 3: MENU & DISHES CMS                                        */}
          {/* =============================================================== */}
          {activeTab === 'menu' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Menu & Dishes Catalog CMS
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Add new dishes, update prices, change descriptions, set chef specials, and upload food images.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingDish(null);
                    setDishForm({
                      name: '',
                      hindiName: '',
                      category: 'paneer',
                      price: 180,
                      description: '',
                      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
                      isVeg: true,
                      isBestseller: false,
                      isChefSpecial: false,
                      spiceLevel: 'Medium',
                      prepTime: '15 mins',
                      tags: ['Pure Desi Ghee'],
                    });
                    setIsAddingDish(true);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search dishes by English or Hindi name..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#140f0c] border border-amber-900/40 rounded-xl text-xs text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <select
                  value={menuFilterCat}
                  onChange={(e) => setMenuFilterCat(e.target.value)}
                  className="px-3 py-2 bg-[#140f0c] border border-amber-900/40 rounded-xl text-xs text-stone-200 focus:outline-hidden focus:border-amber-400 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="signature">Signature Dal & Handis</option>
                  <option value="paneer">Desi Ghee Paneer</option>
                  <option value="thali">Maharaja Thalis</option>
                  <option value="tandoor">Clay Tandoor Rotis</option>
                  <option value="rice">Rice & Biryani</option>
                  <option value="snacks">Starters & Snacks</option>
                  <option value="beverages">Lassi & Beverages</option>
                </select>
              </div>

              {/* Dish Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/30 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-stone-900 border border-amber-900/30">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {item.isBestseller && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500 text-stone-950">
                              Bestseller
                            </span>
                          )}
                          {item.isChefSpecial && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-red-600 text-white">
                              Chef Special
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded font-serif font-bold text-amber-300 text-xs">
                          ₹{item.price}
                        </div>
                      </div>

                      <div>
                        <div className="font-serif font-bold text-sm text-white">{item.name}</div>
                        {item.hindiName && (
                          <div className="text-[11px] text-amber-400/80 font-serif">{item.hindiName}</div>
                        )}
                        <p className="text-xs text-stone-400 line-clamp-2 mt-1 font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400 capitalize">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingDish(item);
                            setDishForm(item);
                            setIsAddingDish(true);
                          }}
                          className="p-1.5 text-stone-300 hover:text-amber-400 cursor-pointer flex items-center gap-1 text-xs"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${item.name}" from menu?`)) {
                              deleteMenuItem(item.id);
                              triggerToast(`Deleted ${item.name}`);
                            }
                          }}
                          className="p-1.5 text-stone-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Dish Modal Dialog */}
              {isAddingDish && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                  <div className="w-full max-w-lg bg-[#140f0c] border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white">
                        {editingDish ? 'Edit Dish Details' : 'Add New Dish to Menu'}
                      </h3>
                      <button
                        onClick={() => setIsAddingDish(false)}
                        className="text-stone-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveDish} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                          Dish Name (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={dishForm.name}
                          onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                          Hindi Name (e.g. केशरी स्पेशल दाल)
                        </label>
                        <input
                          type="text"
                          value={dishForm.hindiName}
                          onChange={(e) => setDishForm({ ...dishForm, hindiName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-serif"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                            Price (₹) *
                          </label>
                          <input
                            type="number"
                            required
                            value={dishForm.price}
                            onChange={(e) => setDishForm({ ...dishForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                            Category
                          </label>
                          <select
                            value={dishForm.category}
                            onChange={(e) =>
                              setDishForm({ ...dishForm, category: e.target.value as MenuItem['category'] })
                            }
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                          >
                            <option value="signature">Signature</option>
                            <option value="paneer">Paneer</option>
                            <option value="thali">Thali</option>
                            <option value="tandoor">Tandoor</option>
                            <option value="rice">Rice</option>
                            <option value="snacks">Snacks</option>
                            <option value="beverages">Beverages</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                          Image URL (Unsplash or direct image link)
                        </label>
                        <input
                          type="url"
                          value={dishForm.imageUrl}
                          onChange={(e) => setDishForm({ ...dishForm, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold uppercase text-[11px] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={dishForm.description}
                          onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer text-stone-300">
                          <input
                            type="checkbox"
                            checked={dishForm.isBestseller}
                            onChange={(e) => setDishForm({ ...dishForm, isBestseller: e.target.checked })}
                            className="rounded"
                          />
                          <span>Bestseller Tag</span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer text-stone-300">
                          <input
                            type="checkbox"
                            checked={dishForm.isChefSpecial}
                            onChange={(e) => setDishForm({ ...dishForm, isChefSpecial: e.target.checked })}
                            className="rounded"
                          />
                          <span>Chef Special Tag</span>
                        </label>
                      </div>

                      <div className="pt-3 flex items-center justify-end gap-2 border-t border-amber-900/30">
                        <button
                          type="button"
                          onClick={() => setIsAddingDish(false)}
                          className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                        >
                          {editingDish ? 'Save Changes' : 'Create Dish'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 4: RESTAURANT INFO & TIMINGS CMS                            */}
          {/* =============================================================== */}
          {activeTab === 'restaurant' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Restaurant Information & Timings CMS
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Update primary phone, WhatsApp, address, opening timings, and top announcement banner.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-4 text-xs">
                {/* Announcement Banner CMS */}
                <div className="p-4 rounded-xl bg-[#1b1510] border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-white">
                      Top Announcement Ribbon
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={announcement.enabled}
                        onChange={(e) => updateAnnouncement({ enabled: e.target.checked })}
                      />
                      <span className="text-amber-300 font-semibold">Enable Banner</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Banner Announcement Text</label>
                    <input
                      type="text"
                      value={announcement.text}
                      onChange={(e) => updateAnnouncement({ text: e.target.value })}
                      className="w-full px-3 py-2 bg-[#140f0c] border border-amber-900/50 rounded-lg text-white"
                    />
                  </div>
                </div>

                {/* Primary Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.name}
                      onChange={(e) => updateRestaurantInfo({ name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      Hindi Name
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.hindiName}
                      onChange={(e) => updateRestaurantInfo({ hindiName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.phonePrimary}
                      onChange={(e) => updateRestaurantInfo({ phonePrimary: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      Secondary Alternate Phone
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.phoneSecondary}
                      onChange={(e) => updateRestaurantInfo({ phoneSecondary: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      WhatsApp Number (Format: 919450328111)
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.whatsappNumber}
                      onChange={(e) => updateRestaurantInfo({ whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                      Service Timings
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.hours}
                      onChange={(e) => updateRestaurantInfo({ hours: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                    Street Address & Landmark
                  </label>
                  <input
                    type="text"
                    value={restaurantInfo.address}
                    onChange={(e) => updateRestaurantInfo({ address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 text-[11px] uppercase font-semibold mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={restaurantInfo.googleMapsUrl}
                    onChange={(e) => updateRestaurantInfo({ googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => triggerToast('Restaurant information updated live!')}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Restaurant Information</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 5: PHOTOS & VIDEOS GALLERY CMS                              */}
          {/* =============================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Film className="w-6 h-6 text-amber-400" />
                    <span>Photos & Videos Media Gallery CMS</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Manage ambiance pictures, garden dining photography, clay tandoor cooking photos, and clips.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingGallery(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload / Add Media</span>
                </button>
              </div>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-[#140f0c] border border-amber-900/40 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-44 bg-stone-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="font-serif font-bold text-sm text-white">{item.title}</div>
                      {item.hindiTitle && (
                        <div className="text-[11px] text-amber-400 font-serif">{item.hindiTitle}</div>
                      )}
                      <p className="text-xs text-stone-400 line-clamp-2 font-light">{item.caption}</p>

                      <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-stone-500 font-mono">{item.highlightTag}</span>
                        <button
                          onClick={() => {
                            if (confirm(`Remove image "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                              triggerToast('Photo deleted from gallery');
                            }
                          }}
                          className="p-1.5 text-stone-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Media Modal */}
              {isAddingGallery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                  <div className="w-full max-w-lg bg-[#140f0c] border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white">Add Photo or Media</h3>
                      <button
                        onClick={() => setIsAddingGallery(false)}
                        className="text-stone-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveMedia} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={mediaForm.title}
                          onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Hindi Title</label>
                        <input
                          type="text"
                          value={mediaForm.hindiTitle}
                          onChange={(e) => setMediaForm({ ...mediaForm, hindiTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-serif"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Category</label>
                          <select
                            value={mediaForm.category}
                            onChange={(e) =>
                              setMediaForm({
                                ...mediaForm,
                                category: e.target.value as GalleryItem['category'],
                                categoryLabel: e.target.options[e.target.selectedIndex].text,
                              })
                            }
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                          >
                            <option value="garden">Garden Seating</option>
                            <option value="hall">Family AC Hall</option>
                            <option value="kitchen">Tandoor & Kitchen</option>
                            <option value="dishes">Signature Dishes</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Highlight Badge</label>
                          <input
                            type="text"
                            value={mediaForm.highlightTag}
                            onChange={(e) => setMediaForm({ ...mediaForm, highlightTag: e.target.value })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Image / Media URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://..."
                          value={mediaForm.imageUrl}
                          onChange={(e) => setMediaForm({ ...mediaForm, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Caption / Description</label>
                        <textarea
                          rows={2}
                          value={mediaForm.caption}
                          onChange={(e) => setMediaForm({ ...mediaForm, caption: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-amber-900/30">
                        <button
                          type="button"
                          onClick={() => setIsAddingGallery(false)}
                          className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                        >
                          Publish to Gallery
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 6: SONBHADRA TOURISM GUIDE CMS                              */}
          {/* =============================================================== */}
          {activeTab === 'tourism' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Compass className="w-6 h-6 text-amber-400" />
                    <span>Sonbhadra Tourism Guide CMS</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Manage attractions (Fossil Park, Vijaygarh Fort, Waterfalls, Dams), distances, driving time, and traveler tips.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingTourist(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tourist Attraction</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {touristPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-stone-900">
                        <img
                          src={place.imageUrl}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-amber-300 font-mono font-bold">
                          {place.distanceKm} km · {place.driveTimeMin} min drive
                        </div>
                      </div>

                      <div>
                        <div className="font-serif font-bold text-sm text-white">{place.name}</div>
                        <div className="text-[11px] text-amber-400 font-serif">{place.hindiName}</div>
                        <p className="text-xs text-stone-400 line-clamp-2 mt-1 font-light">
                          {place.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-stone-400">{place.trekDifficulty}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${place.name}" from tourist guide?`)) {
                            deleteTouristPlace(place.id);
                            triggerToast('Tourist spot deleted');
                          }
                        }}
                        className="p-1.5 text-stone-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Tourist Spot Modal */}
              {isAddingTourist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                  <div className="w-full max-w-lg bg-[#140f0c] border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white">Add Tourist Place</h3>
                      <button
                        onClick={() => setIsAddingTourist(false)}
                        className="text-stone-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveTourist} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Place Name *</label>
                        <input
                          type="text"
                          required
                          value={touristForm.name}
                          onChange={(e) => setTouristForm({ ...touristForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Distance (km)</label>
                          <input
                            type="number"
                            value={touristForm.distanceKm}
                            onChange={(e) => setTouristForm({ ...touristForm, distanceKm: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Drive Time (mins)</label>
                          <input
                            type="number"
                            value={touristForm.driveTimeMin}
                            onChange={(e) => setTouristForm({ ...touristForm, driveTimeMin: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Photo Image URL</label>
                        <input
                          type="url"
                          value={touristForm.imageUrl}
                          onChange={(e) => setTouristForm({ ...touristForm, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={touristForm.description}
                          onChange={(e) => setTouristForm({ ...touristForm, description: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-amber-900/30">
                        <button
                          type="button"
                          onClick={() => setIsAddingTourist(false)}
                          className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                        >
                          Save Place
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 7: TABLE RESERVATIONS                                       */}
          {/* =============================================================== */}
          {activeTab === 'reservations' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-amber-400" />
                  <span>Table Reservations & Banquet Log</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Manage reservations for the AC Family Banquet Hall and Outdoor Garden Courtyard.
                </p>
              </div>

              <div className="space-y-3.5">
                {tableBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#140f0c] border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-white">{b.name}</span>
                        <a
                          href={`tel:${b.phone.replace(/\s+/g, '')}`}
                          className="text-amber-400 hover:underline font-mono"
                        >
                          {b.phone}
                        </a>
                      </div>
                      <div className="text-stone-300">
                        <strong>{b.guests} Guests</strong> · {b.date} at <strong>{b.timeSlot}</strong>
                      </div>
                      <div className="text-amber-300 text-[11px]">
                        Area: {b.diningArea} | Occasion: {b.occasion}
                      </div>
                      {b.specialNotes && (
                        <div className="text-stone-400 italic text-[11px]">
                          Note: "{b.specialNotes}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={b.status}
                        onChange={(e) => {
                          updateBookingStatus(b.id, e.target.value as TableBookingRecord['status']);
                          triggerToast(`Booking for ${b.name} marked as ${e.target.value}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : b.status === 'Seated'
                            ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                            : 'bg-stone-900 text-stone-300 border-stone-700'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Seated">Seated</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Delete reservation for ${b.name}?`)) {
                            deleteBooking(b.id);
                            triggerToast('Reservation deleted');
                          }
                        }}
                        className="p-1.5 text-stone-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 8: REVIEWS & TESTIMONIALS CMS                              */}
          {/* =============================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    <span>Customer Reviews & Testimonials CMS</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Verified Google and traveler feedback published on the website.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingReview(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-2 text-xs flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-amber-300 font-mono">{rev.tripType}</span>
                      </div>
                      <p className="text-stone-300 italic font-light">"{rev.comment}"</p>
                      {rev.dishRecommended && (
                        <div className="text-[11px] text-amber-400/90 font-medium">
                          Favorite: {rev.dishRecommended}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-stone-400">
                      <div>
                        <strong className="text-white">{rev.author}</strong> ({rev.location})
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review from ${rev.author}?`)) {
                            deleteTestimonial(rev.id);
                            triggerToast('Review deleted');
                          }
                        }}
                        className="text-stone-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Review Modal */}
              {isAddingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                  <div className="w-full max-w-md bg-[#140f0c] border border-amber-500/40 rounded-2xl p-5 space-y-3.5 text-xs">
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
                      <h3 className="font-serif text-base font-bold text-white">Add Diner Review</h3>
                      <button onClick={() => setIsAddingReview(false)}>
                        <X className="w-5 h-5 text-stone-400" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveReview} className="space-y-3">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Reviewer Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewForm.author}
                          onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Location</label>
                          <input
                            type="text"
                            value={reviewForm.location}
                            onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Rating (1-5)</label>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Comment / Feedback *</label>
                        <textarea
                          rows={3}
                          required
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Recommended Dish</label>
                        <input
                          type="text"
                          value={reviewForm.dishRecommended}
                          onChange={(e) => setReviewForm({ ...reviewForm, dishRecommended: e.target.value })}
                          className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-amber-900/30">
                        <button
                          type="button"
                          onClick={() => setIsAddingReview(false)}
                          className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                        >
                          Save Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 9: SECURITY & BACKUP                                        */}
          {/* =============================================================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                  <span>Security & Database Backup Console</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Update your 100-layer internal passcode, export database backups, or reset to original configurations.
                </p>
              </div>

              {/* Update Passcode Card */}
              <div className="p-5 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-white">
                  Update Master Security Passcode
                </div>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="Enter new master passcode..."
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#1b1510] border border-amber-900/50 rounded-lg text-white font-mono"
                  />
                  <button
                    onClick={() => {
                      if (!newPasscode.trim()) return;
                      updateAdminPasscode(newPasscode.trim());
                      triggerToast(`Master passcode changed to: ${newPasscode.trim()}`);
                      setNewPasscode('');
                    }}
                    className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg uppercase tracking-wider cursor-pointer"
                  >
                    Update Passcode
                  </button>
                </div>
                <div className="text-[11px] text-stone-400">
                  Current Master Passcode:{' '}
                  <code className="text-amber-400 font-mono font-bold">{adminPasscode}</code>
                </div>
              </div>

              {/* JSON Backup & Restore Card */}
              <div className="p-5 rounded-2xl bg-[#140f0c] border border-amber-900/40 space-y-4 text-xs">
                <div className="font-serif font-bold text-sm text-white">
                  Site Database JSON Export & Import
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadBackup}
                    className="px-4 py-2.5 bg-[#1f1712] hover:bg-[#2c211a] border border-amber-500/40 text-amber-300 font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Backup JSON</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-amber-900/30 space-y-2">
                  <label className="block text-stone-400 text-[11px] font-semibold">
                    Paste JSON Backup to Restore Website State:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Paste database JSON here..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1c1510] border border-amber-900/50 rounded-lg text-white font-mono text-[11px]"
                  />
                  <button
                    onClick={handleRestoreBackup}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Restore Database from JSON
                  </button>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3 text-xs">
                <div className="font-serif font-bold text-sm text-red-300 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <span>Factory Reset to Default Website Data</span>
                </div>
                <p className="text-stone-400 font-light">
                  This will reset all customized menu items, phone numbers, tourist spots, and gallery photos back to their fresh initial values.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all website data to initial defaults?')) {
                      resetToDefaults();
                      triggerToast('Website reset to default data.');
                    }
                  }}
                  className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-300 border border-red-500/50 font-bold rounded-xl cursor-pointer"
                >
                  Reset All to Defaults
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
