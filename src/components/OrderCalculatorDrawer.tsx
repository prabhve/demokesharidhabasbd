import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Phone,
  GraduationCap,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { useAdminData } from '../context/AdminDataContext';

export type OrderType = 'Dine-in' | 'Highway Takeaway' | 'REC Sonbhadra Delivery';

interface OrderCalculatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: Record<string, number>;
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (item: MenuItem) => void;
  onClearOrder: () => void;
  initialOrderType?: OrderType;
}

export const OrderCalculatorDrawer: React.FC<OrderCalculatorDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onAddItem,
  onRemoveItem,
  onClearOrder,
  initialOrderType = 'Dine-in',
}) => {
  const { menuItems, restaurantInfo, recDeliveryInfo, addLiveOrder } = useAdminData();
  const [orderType, setOrderType] = useState<OrderType>(initialOrderType);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [hostelLocation, setHostelLocation] = useState(recDeliveryInfo.hostelLocations[0] || 'Boys Hostel 1');
  const [roomNumber, setRoomNumber] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'PAID_ONLINE' | 'PAY_ON_DELIVERY'>('PAY_ON_DELIVERY');
  const [upiRefNumber, setUpiRefNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Post-booking confirmation screen state
  const [isOrderBooked, setIsOrderBooked] = useState(false);
  const [bookedSummary, setBookedSummary] = useState<{
    orderId: string;
    totalAmount: number;
    dishesSubtotal: number;
    deliveryCharge: number;
    orderType: OrderType;
    paymentStatus: 'PAID_ONLINE' | 'PAY_ON_DELIVERY';
    customerName: string;
    customerPhone: string;
    hostelLocation?: string;
    roomNumber?: string;
    upiRef?: string;
    itemCount: number;
    timestamp: string;
    waUrl: string;
  } | null>(null);

  useEffect(() => {
    if (initialOrderType) {
      setOrderType(initialOrderType);
    }
  }, [initialOrderType]);

  if (!isOpen) return null;

  const itemDetails = Object.entries(orderItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = menuItems.find((d) => d.id === id);
      return { item, qty };
    })
    .filter((entry): entry is { item: MenuItem; qty: number } => entry.item !== undefined);

  const dishesSubtotal = itemDetails.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);
  const isRecDelivery = orderType === 'REC Sonbhadra Delivery';
  const deliveryCharge = isRecDelivery ? recDeliveryInfo.standardDeliveryCharge : 0;
  const grandTotal = dishesSubtotal + deliveryCharge;

  // UPI Dynamic URL
  const upiPayUrl = `upi://pay?pa=${recDeliveryInfo.upiId}&pn=${encodeURIComponent(
    recDeliveryInfo.merchantName
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent(
    `REC Sonbhadra Food Order - ${customerName || 'Student'}`
  )}`;

  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(
    upiPayUrl
  )}`;

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(recDeliveryInfo.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleBookOrder = () => {
    setValidationError(null);

    if (itemDetails.length === 0) {
      setValidationError('Please add at least one dish to your order.');
      return;
    }

    if (isRecDelivery) {
      if (!customerPhone.trim() || customerPhone.trim().length < 10) {
        setValidationError('Please enter a valid 10-digit mobile number for hostel delivery call.');
        return;
      }
      if (!customerName.trim()) {
        setValidationError('Please enter your name.');
        return;
      }
      if (!roomNumber.trim()) {
        setValidationError('Please enter your Room / Block / Flat number.');
        return;
      }
    }

    const orderId = `REC-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Construct detailed WhatsApp dispatch message
    let message = `*🔔 NEW ORDER - KESHARI DHABA, SONBHADRA*\n`;
    message += `*Order ID:* #${orderId}\n`;
    message += `*Time:* ${currentTime}\n\n`;

    if (isRecDelivery) {
      message += `*🎓 ORDER TYPE: REC SONBHADRA DELIVERY*\n`;
      message += `• *Campus:* Rajkiya Engineering College, Sonbhadra (Churk)\n`;
      message += `• *Student / Customer:* ${customerName.trim()}\n`;
      message += `• *Contact Phone:* ${customerPhone.trim()}\n`;
      message += `• *Delivery Point:* ${hostelLocation}\n`;
      message += `• *Room / Block:* ${roomNumber.trim()}\n`;
      if (deliveryNotes.trim()) {
        message += `• *Special Notes:* ${deliveryNotes.trim()}\n`;
      }
      message += `\n*💳 PAYMENT STATUS:*\n`;
      if (paymentStatus === 'PAID_ONLINE') {
        message += `• *Status:* ✅ PAID ONLINE VIA QR CODE\n`;
        message += `• *Amount Paid:* ₹${grandTotal}\n`;
        if (upiRefNumber.trim()) {
          message += `• *UPI Ref / UTR:* ${upiRefNumber.trim()}\n`;
        }
      } else {
        message += `• *Status:* ⏳ PAYMENT PENDING / CASH ON DELIVERY (At Hostel Gate)\n`;
        message += `• *Amount to Collect:* ₹${grandTotal}\n`;
      }
    } else {
      message += `*ORDER TYPE:* ${orderType}\n`;
      if (customerName.trim()) {
        message += `• *Guest Name:* ${customerName.trim()}\n`;
      }
      if (customerPhone.trim()) {
        message += `• *Contact Phone:* ${customerPhone.trim()}\n`;
      }
    }

    message += `\n*📋 ORDERED ITEMS:*\n`;
    itemDetails.forEach(({ item, qty }) => {
      message += `  - ${qty}x ${item.name} (${item.hindiName ? item.hindiName + ' ' : ''}) = ₹${
        item.price * qty
      }\n`;
    });

    message += `\n*💰 BILL BREAKDOWN:*\n`;
    message += `• Dishes Subtotal: ₹${dishesSubtotal}\n`;
    if (isRecDelivery) {
      message += `• REC Campus Delivery Fee: ₹${deliveryCharge}\n`;
    }
    message += `• *GRAND TOTAL: ₹${grandTotal}*\n\n`;
    message += `📞 *Customer has been requested to call +91 94503 28111 now for immediate kitchen confirmation!*`;

    // Save summary state with waUrl for optional WhatsApp sending
    const waUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;

    setBookedSummary({
      orderId,
      totalAmount: grandTotal,
      dishesSubtotal,
      deliveryCharge,
      orderType,
      paymentStatus,
      customerName: customerName.trim() || 'Guest',
      customerPhone: customerPhone.trim(),
      hostelLocation,
      roomNumber: roomNumber.trim(),
      upiRef: upiRefNumber.trim(),
      itemCount: itemDetails.reduce((sum, e) => sum + e.qty, 0),
      timestamp: currentTime,
      waUrl,
    });

    // Record order in live admin monitoring pipeline
    addLiveOrder({
      orderId,
      customerName: customerName.trim() || 'Guest',
      customerPhone: customerPhone.trim(),
      orderType,
      items: itemDetails.map((e) => ({
        id: e.item.id,
        name: e.item.name,
        price: e.item.price,
        qty: e.qty,
      })),
      dishesSubtotal,
      deliveryCharge: isRecDelivery ? deliveryCharge : 0,
      grandTotal,
      paymentStatus: paymentStatus === 'PAID_ONLINE' ? 'PAID_ONLINE' : 'PAYMENT_PENDING',
      upiRef: upiRefNumber.trim() || undefined,
      hostelLocation: isRecDelivery ? hostelLocation : undefined,
      roomNumber: isRecDelivery ? roomNumber.trim() : undefined,
      deliveryNotes: deliveryNotes.trim() || undefined,
      timestamp: currentTime,
    });

    setIsOrderBooked(true);
    // Note: Do not automatically switch to WhatsApp; student stays on confirmation screen with both Call and WhatsApp options.
  };

  const handleResetForNewOrder = () => {
    setIsOrderBooked(false);
    setBookedSummary(null);
    setValidationError(null);
    onClearOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#120e0a] border-l border-amber-500/30 text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* =================================================================== */}
        {/* DRAWER HEADER                                                      */}
        {/* =================================================================== */}
        <div className="p-4 sm:p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#16120e]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {isRecDelivery ? (
                <GraduationCap className="w-5 h-5 text-amber-300" />
              ) : (
                <ShoppingBag className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                {isOrderBooked
                  ? 'Order Booked - Call Confirmation'
                  : isRecDelivery
                  ? 'REC Sonbhadra Delivery & Bill'
                  : 'Table Order & Bill Estimator'}
              </h2>
              <div className="text-[11px] text-amber-400/80 flex items-center gap-1.5">
                <span>Keshari Dhaba, Robertsganj</span>
                {isRecDelivery && (
                  <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-semibold border border-amber-500/30">
                    Churk Campus
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close order drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* CASE 1: ORDER CONFIRMATION / BOOKED SCREEN (WITH DIRECT CALL BUTTON)*/}
        {/* =================================================================== */}
        {isOrderBooked && bookedSummary ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#0e0b08]">
            {/* Top Success Badge */}
            <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-[#14100c] border border-emerald-500/40 shadow-xl space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                Order Booked Successfully!
              </div>
              <div className="text-xs text-amber-300 font-mono">
                Order Reference: #{bookedSummary.orderId} • {bookedSummary.timestamp}
              </div>
              <p className="text-xs text-stone-300 font-light max-w-sm mx-auto">
                Your order details have been submitted. For instant preparation and kitchen dispatch, please call the restaurant directly below.
              </p>
            </div>

            {/* HIGH-PRIORITY DIRECT CALL & WHATSAPP CONFIRMATION ACTIONS */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-[#1f1711] to-amber-950 border-2 border-amber-400 shadow-2xl space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call ya WhatsApp se Confirm Karein</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-500/30">
                  Direct Response
                </span>
              </div>

              <div className="text-sm font-semibold text-white leading-snug">
                कृपया आर्डर कन्फर्म करने के लिए रेस्टोरेंट को अभी कॉल करें या व्हाट्सएप मैसेज भेजें:
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Hot food preparation begins immediately after confirmation. You can call directly or send details via WhatsApp below:
              </p>

              {/* Primary Call Button */}
              <a
                href={`tel:${restaurantInfo.phonePrimary.replace(/\s+/g, '')}`}
                className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-amber-950/70 min-h-[52px] cursor-pointer"
              >
                <Phone className="w-5 h-5 text-stone-950 fill-stone-950" />
                <span>Call Keshari Dhaba: {restaurantInfo.phonePrimary}</span>
              </a>

              {/* Dedicated WhatsApp Option Button (Customer can choose to send on WhatsApp as well) */}
              <a
                href={bookedSummary.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 min-h-[48px] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white fill-white" />
                <span>WhatsApp par Order Details Bhejein</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Secondary Alternate Call Button */}
              <a
                href={`tel:${restaurantInfo.phoneSecondary.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-3 bg-[#1e1610] hover:bg-[#2c2018] text-amber-300 text-xs font-semibold rounded-lg border border-amber-900/40 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Alternate Phone: {restaurantInfo.phoneSecondary}</span>
              </a>
            </div>

            {/* Order Summary Receipt Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#15100c] border border-amber-900/40 space-y-3 text-xs">
              <div className="font-serif text-sm font-bold text-white border-b border-amber-900/30 pb-2 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-amber-400 font-mono">{bookedSummary.itemCount} items</span>
              </div>

              {bookedSummary.orderType === 'REC Sonbhadra Delivery' && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#1b140f] border border-amber-900/30">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px] uppercase">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>REC Sonbhadra Campus Drop</span>
                  </div>
                  <div className="text-stone-300">
                    <strong>Drop Point:</strong> {bookedSummary.hostelLocation}
                  </div>
                  <div className="text-stone-300">
                    <strong>Room / Block:</strong> {bookedSummary.roomNumber}
                  </div>
                  <div className="text-stone-300">
                    <strong>Student Name:</strong> {bookedSummary.customerName} ({bookedSummary.customerPhone})
                  </div>
                  <div className="text-stone-300">
                    <strong>Payment Status:</strong>{' '}
                    {bookedSummary.paymentStatus === 'PAID_ONLINE' ? (
                      <span className="text-emerald-400 font-bold">
                        ✅ Paid Online via QR Code {bookedSummary.upiRef ? `(Ref: ${bookedSummary.upiRef})` : ''}
                      </span>
                    ) : (
                      <span className="text-amber-300 font-bold">
                        ⏳ Pay on Delivery (At Hostel Gate)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Items List in Receipt */}
              <div className="space-y-1.5 pt-1">
                {itemDetails.map(({ item, qty }) => (
                  <div key={item.id} className="flex justify-between text-stone-300">
                    <span>
                      {qty}x {item.name}
                    </span>
                    <span className="font-mono text-stone-400">₹{item.price * qty}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-amber-900/30 space-y-1 text-stone-300">
                <div className="flex justify-between">
                  <span>Dishes Subtotal:</span>
                  <span className="font-mono">₹{bookedSummary.dishesSubtotal}</span>
                </div>
                {bookedSummary.deliveryCharge > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>REC Delivery Charge:</span>
                    <span className="font-mono">+₹{bookedSummary.deliveryCharge}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-white pt-1 border-t border-amber-900/20">
                  <span>Total Amount:</span>
                  <span className="font-serif text-lg text-amber-400">₹{bookedSummary.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Action to Start New Order */}
            <div className="pt-2">
              <button
                onClick={handleResetForNewOrder}
                className="w-full py-3 px-4 bg-[#1f1813] hover:bg-[#2b211a] text-stone-300 text-xs font-semibold rounded-xl border border-amber-900/40 transition-colors"
              >
                Place Another Order / Clear Form
              </button>
            </div>
          </div>
        ) : (
          /* =================================================================== */
          /* CASE 2: REGULAR ORDER DRAWER VIEW & REC CUSTOMIZATION FORM          */
          /* =================================================================== */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
              {itemDetails.length === 0 ? (
                <div className="text-center py-16 sm:py-20 text-stone-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-stone-700 mx-auto" />
                  <p className="text-sm text-stone-400">Your table order estimate is currently empty.</p>
                  <p className="text-xs text-stone-500">
                    Tap "+" on any dish in the menu to build your order.
                  </p>
                </div>
              ) : (
                <>
                  {/* SELECT ORDER TYPE (With REC Sonbhadra Delivery as a dedicated option) */}
                  <div className="p-3 sm:p-3.5 bg-[#17120e] rounded-xl border border-amber-900/30 space-y-2.5">
                    <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                      <span>Select Order Type:</span>
                      {isRecDelivery && (
                        <span className="text-[10px] text-amber-400 font-mono">
                          +{recDeliveryInfo.standardDeliveryCharge} Delivery
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('Dine-in')}
                        className={`py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer min-h-[40px] flex items-center justify-center text-center ${
                          orderType === 'Dine-in'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                            : 'bg-[#1f1914] text-stone-400 border border-amber-900/30 hover:text-stone-200'
                        }`}
                      >
                        Dine-in Table
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType('Highway Takeaway')}
                        className={`py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer min-h-[40px] flex items-center justify-center text-center ${
                          orderType === 'Highway Takeaway'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                            : 'bg-[#1f1914] text-stone-400 border border-amber-900/30 hover:text-stone-200'
                        }`}
                      >
                        Highway Parcel
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType('REC Sonbhadra Delivery')}
                        className={`py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer min-h-[40px] flex items-center justify-center text-center relative ${
                          orderType === 'REC Sonbhadra Delivery'
                            ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-extrabold shadow-md'
                            : 'bg-[#1f1914] text-amber-300 border border-amber-500/30 hover:text-white'
                        }`}
                      >
                        <span>REC Campus</span>
                      </button>
                    </div>

                    {/* ============================================================== */}
                    {/* REC SONBHADRA CAMPUS DELIVERY SPECIAL DETAILS INPUTS           */}
                    {/* ============================================================== */}
                    {isRecDelivery ? (
                      <div className="pt-2 space-y-3 border-t border-amber-900/30">
                        {/* College Info Header */}
                        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-start gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-bold text-amber-300 block">
                              {recDeliveryInfo.collegeName} (Churk)
                            </span>
                            <span className="text-stone-300 font-light">
                              Direct hostel & campus delivery • Est. 30-45 mins • ₹{recDeliveryInfo.standardDeliveryCharge} delivery charge applied
                            </span>
                          </div>
                        </div>

                        {/* Student Name & Phone Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-400 font-medium uppercase mb-1 block">
                              Student Name *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Rahul Verma"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[38px]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-stone-400 font-medium uppercase mb-1 block">
                              Mobile Number * (For Gate Call)
                            </label>
                            <input
                              type="tel"
                              placeholder="10-digit Mobile No."
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[38px]"
                            />
                          </div>
                        </div>

                        {/* Hostel Selector */}
                        <div>
                          <label className="text-[10px] text-stone-400 font-medium uppercase mb-1 block">
                            Select Hostel / Drop Point *
                          </label>
                          <select
                            value={hostelLocation}
                            onChange={(e) => setHostelLocation(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 focus:outline-hidden focus:border-amber-400 min-h-[38px] cursor-pointer"
                          >
                            {recDeliveryInfo.hostelLocations.map((loc: string) => (
                              <option key={loc} value={loc} className="bg-[#120e0a] text-white">
                                {loc}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Room Number & Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-400 font-medium uppercase mb-1 block">
                              Room No. / Floor *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Room 214, 2nd Floor"
                              value={roomNumber}
                              onChange={(e) => setRoomNumber(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[38px]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-stone-400 font-medium uppercase mb-1 block">
                              Cooking Notes (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Extra spicy, extra onion"
                              value={deliveryNotes}
                              onChange={(e) => setDeliveryNotes(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[38px]"
                            />
                          </div>
                        </div>

                        {/* ============================================================== */}
                        {/* RESTAURANT UPI QR CODE & ONLINE PAYMENT SECTION                */}
                        {/* ============================================================== */}
                        <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-b from-[#1b140f] to-[#140e0a] border border-amber-500/40 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wide">
                              <QrCode className="w-4 h-4 text-amber-400" />
                              <span>Pay Online via Restaurant QR</span>
                            </div>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                              Instant UPI
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#110c08] p-3 rounded-lg border border-amber-900/30">
                            {/* QR Code Image */}
                            <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-md">
                              <img
                                src={upiQrImageUrl}
                                alt="Keshari Dhaba UPI QR Code"
                                className="w-28 h-28 object-contain"
                              />
                            </div>

                            {/* Payment Instructions & Copy ID */}
                            <div className="space-y-1.5 text-xs text-stone-300 flex-1">
                              <div>
                                <span className="text-[10px] text-stone-400 uppercase block">Total to Pay (Dishes + Delivery):</span>
                                <span className="font-serif text-lg font-bold text-amber-400">
                                  ₹{grandTotal}
                                </span>
                              </div>

                              <div className="text-[11px] text-stone-400">
                                <span>Scan with GPay, PhonePe, Paytm or BHIM</span>
                              </div>

                              {/* Copy UPI Button */}
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={handleCopyUpiId}
                                  className="px-2.5 py-1 bg-[#1e1712] hover:bg-[#2b211a] text-amber-300 text-[11px] rounded font-mono border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedUpi ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span>UPI Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-amber-400" />
                                      <span>{recDeliveryInfo.upiId}</span>
                                    </>
                                  )}
                                </button>

                                <a
                                  href={upiPayUrl}
                                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded flex items-center gap-1 transition-all"
                                >
                                  <span>Pay via App</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* ============================================================== */}
                          {/* MARK PAYMENT STATUS (AS SPECIFIED BY USER)                     */}
                          {/* ============================================================== */}
                          <div className="space-y-2 pt-1">
                            <label className="text-[11px] font-semibold text-white uppercase tracking-wider block">
                              Mark Payment Status:
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {/* Option 1: Paid Online */}
                              <button
                                type="button"
                                onClick={() => setPaymentStatus('PAID_ONLINE')}
                                className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                                  paymentStatus === 'PAID_ONLINE'
                                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 shadow-md font-semibold'
                                    : 'bg-[#150f0c] border-amber-900/30 text-stone-400 hover:text-stone-200'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 font-bold">
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 ${
                                      paymentStatus === 'PAID_ONLINE' ? 'text-emerald-400' : 'text-stone-500'
                                    }`}
                                  />
                                  <span>Pay Ho Gaya Hai</span>
                                </div>
                                <div className="text-[10px] text-stone-400 mt-0.5">
                                  Paid via QR scan / UPI App
                                </div>
                              </button>

                              {/* Option 2: Not Paid Yet / Pay on Delivery */}
                              <button
                                type="button"
                                onClick={() => setPaymentStatus('PAY_ON_DELIVERY')}
                                className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                                  paymentStatus === 'PAY_ON_DELIVERY'
                                    ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-md font-semibold'
                                    : 'bg-[#150f0c] border-amber-900/30 text-stone-400 hover:text-stone-200'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 font-bold">
                                  <Clock
                                    className={`w-3.5 h-3.5 ${
                                      paymentStatus === 'PAY_ON_DELIVERY' ? 'text-amber-400' : 'text-stone-500'
                                    }`}
                                  />
                                  <span>Nahi Kiya (Pay on Gate)</span>
                                </div>
                                <div className="text-[10px] text-stone-400 mt-0.5">
                                  Cash / UPI scan at hostel gate
                                </div>
                              </button>
                            </div>

                            {/* If Paid Online, show UTR Ref Input */}
                            {paymentStatus === 'PAID_ONLINE' && (
                              <div className="pt-1.5">
                                <label className="text-[10px] text-emerald-300 font-medium uppercase mb-1 block">
                                  UPI Reference / UTR Number (Optional):
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. 429381928371 (12-digit UTR)"
                                  value={upiRefNumber}
                                  onChange={(e) => setUpiRefNumber(e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs bg-[#19130e] border border-emerald-500/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-400"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Guest Name for Dine-in or Highway Parcel */
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder="Guest Name (Optional)"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 text-base sm:text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 min-h-[38px]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="space-y-2.5 sm:space-y-3 divide-y divide-amber-900/20">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      Selected Dishes:
                    </div>
                    {itemDetails.map(({ item, qty }) => (
                      <div key={item.id} className="pt-2.5 sm:pt-3 flex items-center justify-between gap-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs sm:text-sm text-stone-100 truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-amber-400/80 font-mono">
                            ₹{item.price} each
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-[#1a1410] border border-amber-500/40 rounded-lg p-0.5">
                            <button
                              onClick={() => onRemoveItem(item)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-800 rounded cursor-pointer touch-manipulation"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-amber-300 tabular-nums px-1.5 sm:px-2">
                              {qty}
                            </span>
                            <button
                              onClick={() => onAddItem(item)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer touch-manipulation"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-serif text-xs sm:text-sm font-bold text-amber-400 tabular-nums w-12 sm:w-14 text-right">
                            ₹{item.price * qty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* =================================================================== */}
            {/* DRAWER FOOTER WITH BILL BREAKDOWN & BOOKING ACTION BUTTON           */}
            {/* =================================================================== */}
            {itemDetails.length > 0 && (
              <div className="p-4 sm:p-5 bg-[#16120e] border-t border-amber-900/30 space-y-3 sm:space-y-4">
                {/* Bill Breakdown */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-stone-400">
                    <span>Dishes Subtotal ({itemDetails.reduce((sum, e) => sum + e.qty, 0)} items):</span>
                    <span className="font-mono font-semibold text-stone-200">₹{dishesSubtotal}</span>
                  </div>

                  {isRecDelivery && (
                    <div className="flex items-center justify-between text-amber-300">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                        <span>REC Campus Delivery Charge:</span>
                      </span>
                      <span className="font-mono font-bold">+₹{deliveryCharge}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm sm:text-base font-bold pt-1.5 border-t border-amber-900/30">
                    <span className="text-stone-100 font-serif">Estimated Bill Total:</span>
                    <span className="font-serif text-xl sm:text-2xl text-amber-400 tabular-nums">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                {/* Primary Booking Button */}
                <button
                  onClick={handleBookOrder}
                  className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px] ${
                    isRecDelivery
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 shadow-amber-950/60 font-extrabold'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-emerald-950/60'
                  }`}
                >
                  {isRecDelivery ? (
                    <>
                      <GraduationCap className="w-4 h-4 text-stone-950" />
                      <span>Book REC Order & Get Call Confirmation</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>Send Order on WhatsApp</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <button
                  onClick={onClearOrder}
                  className="w-full py-1.5 text-stone-500 hover:text-red-400 text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Current Order</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
