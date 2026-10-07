import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  TouristPlace,
  Testimonial,
  RESTAURANT_INFO,
  REC_SONBHADRA_INFO,
  MENU_ITEMS,
  TOURIST_PLACES,
  TESTIMONIALS,
} from '../data/restaurantData';
import { GalleryItem, GALLERY_ITEMS } from '../components/GallerySection';

export interface LiveOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'Dine-in' | 'Highway Takeaway' | 'REC Sonbhadra Delivery';
  items: Array<{ id: string; name: string; price: number; qty: number }>;
  dishesSubtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentStatus: 'PAID_ONLINE' | 'PAYMENT_PENDING';
  upiRef?: string;
  tableNumber?: string;
  pickupEta?: string;
  vehicleNumber?: string;
  hostelLocation?: string;
  roomNumber?: string;
  deliveryNotes?: string;
  summaryPoints?: string[];
  timestamp: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
}

export interface TableBookingRecord {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  timeSlot: string;
  diningArea: string;
  occasion: string;
  specialNotes?: string;
  timestamp: string;
  status: 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
}

export interface SiteAnnouncement {
  enabled: boolean;
  text: string;
  badge: string;
}

interface AdminDataContextType {
  restaurantInfo: typeof RESTAURANT_INFO;
  updateRestaurantInfo: (info: Partial<typeof RESTAURANT_INFO>) => void;

  recDeliveryInfo: typeof REC_SONBHADRA_INFO;
  updateRecDeliveryInfo: (info: Partial<typeof REC_SONBHADRA_INFO>) => void;

  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  galleryItems: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  touristPlaces: TouristPlace[];
  addTouristPlace: (place: TouristPlace) => void;
  updateTouristPlace: (id: string, place: Partial<TouristPlace>) => void;
  deleteTouristPlace: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  liveOrders: LiveOrder[];
  addLiveOrder: (order: Omit<LiveOrder, 'id' | 'status'>) => void;
  updateOrderStatus: (id: string, status: LiveOrder['status']) => void;
  deleteOrder: (id: string) => void;

  tableBookings: TableBookingRecord[];
  addTableBooking: (booking: Omit<TableBookingRecord, 'id' | 'status' | 'timestamp'> & { timestamp?: string }) => void;
  updateBookingStatus: (id: string, status: TableBookingRecord['status']) => void;
  deleteBooking: (id: string) => void;

  announcement: SiteAnnouncement;
  updateAnnouncement: (announcement: Partial<SiteAnnouncement>) => void;

  adminPasscode: string;
  updateAdminPasscode: (newPass: string) => void;

  resetToDefaults: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonStr: string) => boolean;
}

const STORAGE_KEYS = {
  RESTAURANT_INFO: 'keshari_restaurant_info_v1',
  REC_INFO: 'keshari_rec_info_v1',
  MENU: 'keshari_menu_items_v1',
  GALLERY: 'keshari_gallery_items_v1',
  TOURIST: 'keshari_tourist_places_v1',
  TESTIMONIALS: 'keshari_testimonials_v1',
  ORDERS: 'keshari_live_orders_v1',
  BOOKINGS: 'keshari_table_bookings_v1',
  ANNOUNCEMENT: 'keshari_announcement_v1',
  PASSCODE: 'keshari_admin_passcode_v1',
};

const INITIAL_ORDERS: LiveOrder[] = [
  {
    id: 'ord-101',
    orderId: 'REC-9481',
    customerName: 'Aman Verma',
    customerPhone: '+91 98391 12345',
    orderType: 'REC Sonbhadra Delivery',
    items: [
      { id: 'dish-1', name: 'Keshari Special Handi Dal Tadka', price: 180, qty: 1 },
      { id: 'dish-3', name: 'Keshari Desi Ghee Kadhai Paneer', price: 240, qty: 1 },
      { id: 'dish-12', name: 'Desi Ghee Tandoori Roti', price: 20, qty: 6 },
    ],
    dishesSubtotal: 540,
    deliveryCharge: 40,
    grandTotal: 580,
    paymentStatus: 'PAID_ONLINE',
    upiRef: 'UPI-AXIS-99281726',
    hostelLocation: 'Boys Hostel 2 (BH-2)',
    roomNumber: 'B-204',
    deliveryNotes: 'Call when reaching campus gate',
    timestamp: 'Today, 01:15 PM',
    status: 'Delivered',
  },
  {
    id: 'ord-102',
    orderId: 'REC-9482',
    customerName: 'Priya Srivastava',
    customerPhone: '+91 94512 88471',
    orderType: 'REC Sonbhadra Delivery',
    items: [
      { id: 'dish-8', name: 'Maharaja Kansa Royal Thali', price: 280, qty: 2 },
      { id: 'dish-15', name: 'Sonbhadra Special Kulhad Lassi', price: 80, qty: 2 },
    ],
    dishesSubtotal: 720,
    deliveryCharge: 40,
    grandTotal: 760,
    paymentStatus: 'PAYMENT_PENDING',
    hostelLocation: 'Girls Hostel (GH)',
    roomNumber: 'Wing A - 105',
    deliveryNotes: 'Please give hot rotis and extra napkins',
    timestamp: 'Today, 02:45 PM',
    status: 'Preparing',
  },
  {
    id: 'ord-103',
    orderId: 'TB-104',
    customerName: 'Dr. R. K. Mishra',
    customerPhone: '+91 91200 44556',
    orderType: 'Dine-in',
    tableNumber: 'Table T-4 (AC Hall)',
    items: [
      { id: 'dish-2', name: 'Dhaba Dal Makhani with White Butter', price: 210, qty: 2 },
      { id: 'dish-11', name: 'Charred Garlic Butter Naan', price: 60, qty: 4 },
      { id: 'dish-14', name: 'Vegetable Dum Biryani with Raita', price: 220, qty: 1 },
    ],
    dishesSubtotal: 880,
    deliveryCharge: 0,
    grandTotal: 880,
    paymentStatus: 'PAID_ONLINE',
    upiRef: 'UPI-HDFC-88291039',
    summaryPoints: [
      'Dine-in Table: Table T-4 (AC Hall)',
      'Customer: Dr. R. K. Mishra',
      'Contact: +91 91200 44556',
      'Total Bill: ₹880',
      'Payment: Paid Online via QR',
    ],
    timestamp: 'Today, 03:10 PM',
    status: 'Delivered',
  },
  {
    id: 'ord-104',
    orderId: 'HW-8201',
    customerName: 'Vikram Rajput',
    customerPhone: '+91 98380 91827',
    orderType: 'Highway Takeaway',
    pickupEta: 'In 20 mins (Passing Churk Toll)',
    vehicleNumber: 'UP 64 AB 9821',
    items: [
      { id: 'dish-1', name: 'Keshari Special Handi Dal Tadka', price: 180, qty: 2 },
      { id: 'dish-9', name: 'Amritsari Stuffed Paneer Kulcha', price: 90, qty: 4 },
      { id: 'dish-16', name: 'Special Masala Ginger Kulhad Chai', price: 25, qty: 4 },
    ],
    dishesSubtotal: 820,
    deliveryCharge: 0,
    grandTotal: 820,
    paymentStatus: 'PAID_ONLINE',
    upiRef: 'UPI-GPAY-77382910',
    summaryPoints: [
      'Order Mode: Highway Express Parcel',
      'Pickup Customer: Vikram Rajput',
      'Contact Phone: +91 98380 91827',
      'Pickup ETA: In 20 mins (Passing Churk Toll)',
      'Vehicle No.: UP 64 AB 9821',
      'Dishes: 2x Handi Dal Tadka, 4x Paneer Kulcha, 4x Kulhad Chai',
      'Total Amount: ₹820',
      'Payment Status: ✅ Paid Online via QR (UPI Ref: UPI-GPAY-77382910)',
    ],
    timestamp: 'Today, 04:20 PM',
    status: 'Preparing',
  },
];

const INITIAL_BOOKINGS: TableBookingRecord[] = [
  {
    id: 'book-1',
    name: 'Suresh Chandra Gupta',
    phone: '+91 94503 11223',
    guests: 6,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '08:30 PM',
    diningArea: 'AC Family Hall',
    occasion: 'Family Anniversary',
    specialNotes: 'Require corner sofa booth, 2 baby chairs',
    timestamp: 'Today, 11:20 AM',
    status: 'Confirmed',
  },
  {
    id: 'book-2',
    name: 'Varanasi Tourists Party (Mr. Sinha)',
    phone: '+91 98390 99887',
    guests: 12,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 PM',
    diningArea: 'Lush Garden Courtyard',
    occasion: 'Highway Road Trip Halt',
    specialNotes: 'Pre-order 12 Maharaja Thalis for immediate serving',
    timestamp: 'Today, 12:40 PM',
    status: 'Confirmed',
  },
];

const INITIAL_ANNOUNCEMENT: SiteAnnouncement = {
  enabled: true,
  badge: 'Special Announcement',
  text: 'Welcoming Highway Roadtrippers & REC Sonbhadra Students with Fresh Desi Ghee Feasts!',
};

const DEFAULT_ADMIN_PASSCODE = 'KESHARI@2026';

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurantInfo, setRestaurantInfo] = useState<typeof RESTAURANT_INFO>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANT_INFO);
      return saved ? JSON.parse(saved) : RESTAURANT_INFO;
    } catch {
      return RESTAURANT_INFO;
    }
  });

  const [recDeliveryInfo, setRecDeliveryInfo] = useState<typeof REC_SONBHADRA_INFO>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REC_INFO);
      return saved ? JSON.parse(saved) : REC_SONBHADRA_INFO;
    } catch {
      return REC_SONBHADRA_INFO;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : GALLERY_ITEMS;
    } catch {
      return GALLERY_ITEMS;
    }
  });

  const [touristPlaces, setTouristPlaces] = useState<TouristPlace[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOURIST);
      return saved ? JSON.parse(saved) : TOURIST_PLACES;
    } catch {
      return TOURIST_PLACES;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  const [liveOrders, setLiveOrders] = useState<LiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [tableBookings, setTableBookings] = useState<TableBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_ADMIN_PASSCODE;
    } catch {
      return DEFAULT_ADMIN_PASSCODE;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESTAURANT_INFO, JSON.stringify(restaurantInfo));
    } catch {
      // ignore
    }
  }, [restaurantInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REC_INFO, JSON.stringify(recDeliveryInfo));
    } catch {
      // ignore
    }
  }, [recDeliveryInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch {
      // ignore
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryItems));
    } catch {
      // ignore
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOURIST, JSON.stringify(touristPlaces));
    } catch {
      // ignore
    }
  }, [touristPlaces]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(liveOrders));
    } catch {
      // ignore
    }
  }, [liveOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(tableBookings));
    } catch {
      // ignore
    }
  }, [tableBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
    } catch {
      // ignore
    }
  }, [announcement]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PASSCODE, adminPasscode);
    } catch {
      // ignore
    }
  }, [adminPasscode]);

  // Actions
  const updateRestaurantInfo = (info: Partial<typeof RESTAURANT_INFO>) => {
    setRestaurantInfo((prev) => ({ ...prev, ...info }));
  };

  const updateRecDeliveryInfo = (info: Partial<typeof REC_SONBHADRA_INFO>) => {
    setRecDeliveryInfo((prev) => ({ ...prev, ...info }));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addTouristPlace = (place: TouristPlace) => {
    setTouristPlaces((prev) => [place, ...prev]);
  };

  const updateTouristPlace = (id: string, updated: Partial<TouristPlace>) => {
    setTouristPlaces((prev) =>
      prev.map((place) => (place.id === id ? { ...place, ...updated } : place))
    );
  };

  const deleteTouristPlace = (id: string) => {
    setTouristPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials((prev) => [testimonial, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const addLiveOrder = (orderData: Omit<LiveOrder, 'id' | 'status'>) => {
    const newOrder: LiveOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      status: 'Pending',
    };
    setLiveOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: LiveOrder['status']) => {
    setLiveOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (id: string) => {
    setLiveOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const addTableBooking = (bookingData: Omit<TableBookingRecord, 'id' | 'status' | 'timestamp'> & { timestamp?: string }) => {
    const newBooking: TableBookingRecord = {
      timestamp: bookingData.timestamp || `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      ...bookingData,
      id: `book-${Date.now()}`,
      status: 'Confirmed',
    };
    setTableBookings((prev) => [newBooking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: TableBookingRecord['status']) => {
    setTableBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setTableBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const updateAnnouncement = (partial: Partial<SiteAnnouncement>) => {
    setAnnouncement((prev) => ({ ...prev, ...partial }));
  };

  const updateAdminPasscode = (newPass: string) => {
    setAdminPasscode(newPass);
  };

  const resetToDefaults = () => {
    setRestaurantInfo(RESTAURANT_INFO);
    setRecDeliveryInfo(REC_SONBHADRA_INFO);
    setMenuItems(MENU_ITEMS);
    setGalleryItems(GALLERY_ITEMS);
    setTouristPlaces(TOURIST_PLACES);
    setTestimonials(TESTIMONIALS);
    setLiveOrders(INITIAL_ORDERS);
    setTableBookings(INITIAL_BOOKINGS);
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    setAdminPasscode(DEFAULT_ADMIN_PASSCODE);
    localStorage.clear();
  };

  const exportDatabaseJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      restaurantInfo,
      recDeliveryInfo,
      menuItems,
      galleryItems,
      touristPlaces,
      testimonials,
      liveOrders,
      tableBookings,
      announcement,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.restaurantInfo) setRestaurantInfo(data.restaurantInfo);
      if (data.recDeliveryInfo) setRecDeliveryInfo(data.recDeliveryInfo);
      if (Array.isArray(data.menuItems)) setMenuItems(data.menuItems);
      if (Array.isArray(data.galleryItems)) setGalleryItems(data.galleryItems);
      if (Array.isArray(data.touristPlaces)) setTouristPlaces(data.touristPlaces);
      if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
      if (Array.isArray(data.liveOrders)) setLiveOrders(data.liveOrders);
      if (Array.isArray(data.tableBookings)) setTableBookings(data.tableBookings);
      if (data.announcement) setAnnouncement(data.announcement);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
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
        updateTestimonial,
        deleteTestimonial,
        liveOrders,
        addLiveOrder,
        updateOrderStatus,
        deleteOrder,
        tableBookings,
        addTableBooking,
        updateBookingStatus,
        deleteBooking,
        announcement,
        updateAnnouncement,
        adminPasscode,
        updateAdminPasscode,
        resetToDefaults,
        exportDatabaseJson,
        importDatabaseJson,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
