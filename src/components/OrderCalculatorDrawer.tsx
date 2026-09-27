import React, { useState } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem } from '../data/restaurantData';

interface OrderCalculatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: Record<string, number>;
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (item: MenuItem) => void;
  onClearOrder: () => void;
}

export const OrderCalculatorDrawer: React.FC<OrderCalculatorDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onAddItem,
  onRemoveItem,
  onClearOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'Dine-in' | 'Highway Takeaway'>('Dine-in');

  if (!isOpen) return null;

  const itemDetails = Object.entries(orderItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((d) => d.id === id);
      return { item, qty };
    })
    .filter((entry): entry is { item: MenuItem; qty: number } => entry.item !== undefined);

  const totalAmount = itemDetails.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  const handleSendOrderToWhatsApp = () => {
    let message = `Namaste Keshari Dhaba! 🙏\n\nI would like to place a ${orderType} order:\n`;
    if (customerName.trim()) {
      message += `• Customer: ${customerName.trim()}\n`;
    }
    message += `• Order Type: ${orderType}\n\nSelected Delicacies:\n`;

    itemDetails.forEach(({ item, qty }) => {
      message += `  - ${qty}x ${item.name} (₹${item.price * qty})\n`;
    });

    message += `\nEstimated Total: ₹${totalAmount}\n`;
    message += `Please confirm preparation readiness. Thank you!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#120e0a] border-l border-amber-500/30 text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#16120e]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white leading-tight">
                Table Order & Bill Estimator
              </h2>
              <div className="text-[11px] text-amber-400/80">Keshari Dhaba, Sonbhadra</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close order drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {itemDetails.length === 0 ? (
            <div className="text-center py-20 text-stone-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-700 mx-auto" />
              <p className="text-sm text-stone-400">Your table order estimate is currently empty.</p>
              <p className="text-xs text-stone-500">
                Tap "+" on any dish in the menu to build your table bill.
              </p>
            </div>
          ) : (
            <>
              {/* Dining Style Toggle */}
              <div className="p-3.5 bg-[#17120e] rounded-xl border border-amber-900/30 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Select Order Type:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('Dine-in')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      orderType === 'Dine-in'
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                        : 'bg-[#1f1914] text-stone-400 border border-amber-900/30'
                    }`}
                  >
                    Dine-in Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('Highway Takeaway')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      orderType === 'Highway Takeaway'
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                        : 'bg-[#1f1914] text-stone-400 border border-amber-900/30'
                    }`}
                  >
                    Highway Parcel
                  </button>
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Guest Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#1f1914] border border-amber-900/40 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-amber-900/20">
                {itemDetails.map(({ item, qty }) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-stone-100 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-amber-400/80 font-mono">
                        ₹{item.price} each
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1 bg-[#1a1410] border border-amber-500/40 rounded-lg p-0.5">
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-800 rounded cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums px-2">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAddItem(item)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-serif text-sm font-bold text-amber-400 tabular-nums w-14 text-right">
                        ₹{item.price * qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {itemDetails.length > 0 && (
          <div className="p-5 bg-[#16120e] border-t border-amber-900/30 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Total Dishes:</span>
              <span className="font-mono font-semibold text-stone-200">
                {itemDetails.reduce((sum, e) => sum + e.qty, 0)} items
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-bold">
              <span className="text-stone-200 font-serif">Estimated Bill Total:</span>
              <span className="font-serif text-2xl text-amber-400 tabular-nums">
                ₹{totalAmount}
              </span>
            </div>

            <button
              onClick={handleSendOrderToWhatsApp}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Send Order to Dhaba on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onClearOrder}
              className="w-full py-1 text-stone-500 hover:text-red-400 text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Current Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
