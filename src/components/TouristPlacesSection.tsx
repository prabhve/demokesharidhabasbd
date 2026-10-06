import React, { useState } from 'react';
import {
  Navigation,
  Compass,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Map as MapIcon,
  Footprints,
  Car,
  Ticket,
  Sparkles,
  Info,
  Check,
  Plus,
  Route,
  ChevronDown,
  ChevronUp,
  Share2,
  X,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { TouristPlace } from '../data/restaurantData';
import { useAdminData } from '../context/AdminDataContext';

export const TouristPlacesSection: React.FC = () => {
  const { touristPlaces, restaurantInfo } = useAdminData();
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearby' | 'waterfalls' | 'heritage' | 'sacred'>('all');
  const [expandedMapId, setExpandedMapId] = useState<string | null>(null);
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState<TouristPlace | null>(null);
  const [selectedTripIds, setSelectedTripIds] = useState<string[]>([
    'salkhan-fossil-park',
    'vijaygarh-fort',
    'son-view-point',
  ]);
  const [activeViewMode, setActiveViewMode] = useState<'cards' | 'circuit-map'>('cards');
  const [activeCircuitPlaceId, setActiveCircuitPlaceId] = useState<string>('salkhan-fossil-park');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Filter logic
  const filteredPlaces = touristPlaces.filter((place) => {
    if (activeFilter === 'nearby') return place.distanceKm <= 30;
    if (activeFilter === 'waterfalls') return place.category === 'Waterfall & Nature' || place.category === 'Scenic View';
    if (activeFilter === 'heritage') return place.category === 'Historical Fort' || place.category === 'Geological Wonder';
    if (activeFilter === 'sacred') return place.category === 'Sacred Heritage';
    return true;
  });

  // Trip planner calculations
  const tripPlaces = touristPlaces.filter((p) => selectedTripIds.includes(p.id));
  const totalTripKm = tripPlaces.reduce((sum, p) => sum + p.distanceKm * 2, 0); // approximate return km
  const totalTripDriveTime = tripPlaces.reduce((sum, p) => sum + p.driveTimeMin * 2, 0);

  const toggleTripSelection = (id: string) => {
    setSelectedTripIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShareRoute = (place: TouristPlace) => {
    if (navigator.share) {
      navigator.share({
        title: `${place.name} - Sonbhadra Tourist Attraction`,
        text: `Check out ${place.name} (${place.distanceKm} km from Keshari Dhaba, Robertsganj). Plan your trip:`,
        url: place.googleMapsNavUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(place.googleMapsNavUrl);
      setCopiedLink(place.id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const activeCircuitPlace = touristPlaces.find((p) => p.id === activeCircuitPlaceId) || touristPlaces[0];

  // WhatsApp link for trekking picnic parcel
  const getWhatsAppParcelMessage = () => {
    const listNames = tripPlaces.map((p) => p.name).join(', ');
    const text = encodeURIComponent(
      `Hello Keshari Dhaba! 🚗 We are planning a Sonbhadra trip to visit: ${listNames}. We would like to pre-order packed food boxes (Thali/Parathas/Water/Kulhad Chai) for our journey. Please share parcel menu & timings.`
    );
    return `https://wa.me/${restaurantInfo.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="tourist-places" className="py-16 sm:py-24 lg:py-32 bg-[#0d0a08] text-white border-b border-amber-900/30 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Sonbhadra Tourism Guide & Highway Pitstop</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance leading-tight">
            Explore Sonbhadra’s Wonders from <span className="text-gold-gradient italic">Keshari Dhaba</span>.
          </h2>
          <p className="mt-3 text-stone-300 text-xs sm:text-base leading-relaxed font-light">
            Sonbhadra is Uttar Pradesh’s geological crown and ancient heritage jewel. Centrally located on the main highway in Robertsganj, Keshari Dhaba serves as your ideal tourism basecamp — energize with pure desi ghee parathas and hot chai before your adventure, or return for an evening handi dal feast.
          </p>
        </div>

        {/* View Mode & Quick Metric Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-900/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveViewMode('cards')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeViewMode === 'cards'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-[#18130f] text-stone-300 hover:text-white border border-amber-900/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Attraction Cards & Embeds</span>
            </button>
            <button
              onClick={() => setActiveViewMode('circuit-map')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeViewMode === 'circuit-map'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-[#18130f] text-stone-300 hover:text-white border border-amber-900/30'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Interactive Circuit Hub</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400 font-mono overflow-x-auto">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <strong>{touristPlaces.length}</strong> Famous Spots
            </span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong>6 km – 95 km</strong> Distance Range
            </span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Interactive Map Embeds Included
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE TRIP PLANNER DRAWER / ACCORDION BANNER            */}
        {/* ============================================================== */}
        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-950/80 via-[#18120e] to-stone-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Route className="w-4 h-4 text-amber-400" />
                <span>Interactive Roadtrip Circuit Planner</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Customize Your Sonbhadra Day-Tour from Keshari Dhaba
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Select places to auto-calculate your highway driving route. Pre-order hygienic packed meals for your trek where remote sights offer zero food facilities.
              </p>

              {/* Quick Checklist of spots */}
              <div className="flex flex-wrap gap-2 pt-2">
                {touristPlaces.map((p) => {
                  const isSelected = selectedTripIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleTripSelection(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border border-amber-500 text-amber-300 font-semibold'
                          : 'bg-[#150f0c] border border-amber-900/30 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 text-amber-400" />
                      ) : (
                        <Plus className="w-3 h-3 text-stone-500" />
                      )}
                      <span>{p.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-stone-500">({p.distanceKm} km)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trip Stats and CTA */}
            <div className="bg-[#120d0a] p-4 sm:p-5 rounded-xl border border-amber-900/40 flex flex-col justify-between gap-4 lg:min-w-[280px]">
              <div>
                <div className="text-[11px] font-semibold uppercase text-stone-400 tracking-wider">
                  Tour Route Summary ({tripPlaces.length} Selected)
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#1a1410] border border-amber-900/20">
                    <div className="text-[10px] text-stone-400 uppercase">Est. Circuit Distance</div>
                    <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                      ~{totalTripKm} km
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#1a1410] border border-amber-900/20">
                    <div className="text-[10px] text-stone-400 uppercase">Driving Time</div>
                    <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                      ~{Math.round(totalTripDriveTime / 60 * 10) / 10} hrs
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Breakfast 08:00 AM & Dinner 08:00 PM at Keshari Dhaba</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={getWhatsAppParcelMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-center shadow-md min-h-[42px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pre-Order Trek Food Parcel</span>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${restaurantInfo.coordinates.lat},${restaurantInfo.coordinates.lng}&destination=${encodeURIComponent(
                    tripPlaces[0]?.name || 'Salkhan Fossil Park Sonbhadra'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#1e1712] hover:bg-[#2c221a] text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5 text-center min-h-[38px]"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Start Multi-Stop GPS Route</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 1: INTERACTIVE CIRCUIT MASTER MAP                   */}
        {/* ============================================================== */}
        {activeViewMode === 'circuit-map' && (
          <div className="mb-12 rounded-2xl bg-[#140f0c] border border-amber-500/40 overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-950/80 via-[#18120e] to-stone-900 border-b border-amber-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Master Circuit Map Embed & Waypoint Navigator</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Active Focus: {activeCircuitPlace.name}
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  <strong>{activeCircuitPlace.distanceKm} km</strong> from Keshari Dhaba (Robertsganj) • ~{activeCircuitPlace.driveTimeMin} mins drive
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={activeCircuitPlace.googleMapsNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md min-h-[42px]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate in Google Maps</span>
                </a>
                <button
                  onClick={() => setSelectedPlaceForModal(activeCircuitPlace)}
                  className="px-3.5 py-2.5 bg-[#1f1813] hover:bg-[#2e231c] text-stone-200 text-xs font-semibold rounded-xl border border-amber-900/40 transition-colors flex items-center gap-1.5 min-h-[42px]"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Full Guide</span>
                </button>
              </div>
            </div>

            {/* Split Screen: Selector on left, Map on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Attraction list selector */}
              <div className="lg:col-span-5 p-4 sm:p-5 bg-[#110d0a] border-b lg:border-b-0 lg:border-r border-amber-900/30 max-h-[540px] overflow-y-auto scrollbar-thin">
                <div className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider mb-3">
                  Select Attraction to View Map & Directions:
                </div>
                <div className="space-y-2.5">
                  {touristPlaces.map((place) => {
                    const isSelected = place.id === activeCircuitPlace.id;
                    return (
                      <div
                        key={place.id}
                        onClick={() => setActiveCircuitPlaceId(place.id)}
                        className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 shadow-lg text-white'
                            : 'bg-[#17120e] border-amber-900/20 text-stone-300 hover:bg-[#1e1713] hover:border-amber-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={place.imageUrl}
                            alt={place.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-amber-900/40"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate text-white">{place.name}</div>
                            <div className="text-[11px] text-amber-300/80 truncate">{place.highlight}</div>
                            <div className="text-[10px] text-stone-400 flex items-center gap-2 mt-0.5">
                              <span>{place.distanceKm} km</span>
                              <span>•</span>
                              <span>~{place.driveTimeMin} min drive</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Google Maps Iframe */}
              <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-auto bg-stone-950">
                <iframe
                  title={`${activeCircuitPlace.name} Google Map Embed`}
                  src={activeCircuitPlace.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating overlay with travel route advice */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#140f0c]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-amber-500/40 text-xs shadow-2xl">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Footprints className="w-3.5 h-3.5" />
                        Terrain: {activeCircuitPlace.trekDifficulty} • Duration: {activeCircuitPlace.recommendedDuration}
                      </div>
                      <p className="mt-1 text-stone-300 text-[11px] leading-relaxed">
                        {activeCircuitPlace.travelerTip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FILTER BUTTONS                                                 */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: `All Wonders (${touristPlaces.length})` },
            { id: 'nearby', label: 'Nearby (Within 30 km)' },
            { id: 'waterfalls', label: 'Waterfalls & Scenic Views' },
            { id: 'heritage', label: 'Forts & 1.4B Yr Fossils' },
            { id: 'sacred', label: 'Sacred Shrines' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`relative px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 min-h-[38px] ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-[#17120e] text-stone-300 hover:text-white border border-amber-900/30'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* ATTRACTIONS GRID WITH IN-CARD INTERACTIVE MAP EMBEDS          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlaces.map((place) => {
            const isMapExpanded = expandedMapId === place.id;
            const isSelectedForTrip = selectedTripIds.includes(place.id);

            return (
              <div
                key={place.id}
                className="group bg-[#140f0c] rounded-2xl border border-amber-900/30 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/50"
              >
                <div>
                  {/* Photo with Overlay & Badges */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-900">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/30 to-transparent" />

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-xs text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                      {place.category}
                    </div>

                    {/* Drive time badge */}
                    <div className="absolute bottom-3 right-3 bg-stone-950/90 text-white text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded backdrop-blur-xs flex items-center gap-1.5 border border-stone-800">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>~{place.driveTimeMin} min drive</span>
                    </div>

                    {/* Distance from Dhaba badge */}
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 font-bold text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded flex items-center gap-1 shadow-md">
                      <MapPin className="w-3 h-3 text-stone-950" />
                      <span>{place.distanceKm} km from Dhaba</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 leading-snug">
                        {place.name}
                      </h3>
                      <button
                        onClick={() => handleShareRoute(place)}
                        title="Share directions link"
                        className="text-stone-400 hover:text-amber-400 p-1 rounded-md transition-colors shrink-0"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {place.hindiName && (
                      <div className="text-xs text-amber-200/60 font-serif mt-0.5">
                        {place.hindiName}
                      </div>
                    )}

                    {/* Highlight Banner */}
                    <div className="mt-2.5 p-2.5 rounded-xl bg-[#1c1612] border border-amber-900/30 text-xs font-medium text-amber-300">
                      {place.highlight}
                    </div>

                    {/* Description */}
                    <p className="mt-2.5 text-stone-300 text-xs leading-relaxed line-clamp-3 font-light">
                      {place.description}
                    </p>

                    {/* Travel Specs Grid */}
                    <div className="mt-3.5 pt-3 border-t border-amber-900/20 grid grid-cols-2 gap-2 text-[11px] text-stone-300">
                      <div className="flex items-center gap-1.5">
                        <Footprints className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Trek: <strong>{place.trekDifficulty}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Time: <strong>{place.recommendedDuration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 text-stone-400 text-[10px]">
                        <Calendar className="w-3 h-3 text-stone-500 shrink-0" />
                        <span>Best: {place.bestTimeToVisit} ({place.bestTimeOfDay})</span>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed">
                      <span className="font-bold text-amber-400">💡 Traveler Tip: </span>
                      {place.travelerTip}
                    </div>
                  </div>

                  {/* IN-CARD TOGGLEABLE GOOGLE MAP EMBED */}
                  <div className="px-4 sm:px-5 pb-3">
                    <button
                      onClick={() => setExpandedMapId(isMapExpanded ? null : place.id)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isMapExpanded
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'bg-[#1b1511] text-stone-300 hover:text-white border border-amber-900/30'
                      }`}
                    >
                      <MapIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMapExpanded ? 'Hide Interactive Map' : 'View Live Map Embed'}</span>
                      {isMapExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>

                    {isMapExpanded && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-amber-500/40 bg-stone-950">
                        <div className="relative w-full h-52 sm:h-60">
                          <iframe
                            title={`${place.name} Map Embed`}
                            src={place.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="p-2.5 bg-[#17120e] text-[10px] text-stone-400 flex items-center justify-between border-t border-amber-900/30">
                          <span>GPS: {place.coordinates.lat}, {place.coordinates.lng}</span>
                          <a
                            href={place.googleMapsNavUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Open Fullscreen</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="p-3.5 sm:p-4 bg-[#18130f] border-t border-amber-900/30 space-y-2">
                  <a
                    href={place.googleMapsNavUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 sm:py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Start Navigation from Dhaba</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleTripSelection(place.id)}
                      className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px] ${
                        isSelectedForTrip
                          ? 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
                          : 'bg-[#1e1713] border border-amber-900/20 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {isSelectedForTrip ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>In Itinerary</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-stone-400" />
                          <span>Add to Tour</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedPlaceForModal(place)}
                      className="px-3 py-2 bg-[#1e1713] hover:bg-[#281f19] text-stone-300 text-[11px] font-semibold rounded-xl border border-amber-900/20 transition-colors flex items-center justify-center gap-1 min-h-[38px]"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>Guide</span>
                    </button>
                  </div>

                  {copiedLink === place.id && (
                    <div className="text-center text-[11px] text-amber-400 font-medium">
                      ✓ Directions link copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* WHY KESHARI DHABA IS YOUR TOURIST BASECAMP                     */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-24 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#17110d] via-[#1c1510] to-[#17110d] border border-amber-500/30">
          <div className="max-w-3xl mb-6">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              Highway Traveler & Tourist Amenities
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-white mt-1">
              Why Keshari Dhaba is Robertsganj’s #1 Tourist Gateway
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Located directly on the Varanasi-Shaktinagar state corridor in Robertsganj, our facilities are crafted to ensure a stress-free journey through Sonbhadra’s natural wonders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-4 rounded-xl bg-[#120d0a] border border-amber-900/30">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3">
                <Car className="w-4 h-4" />
              </div>
              <div className="font-serif font-bold text-sm text-white">Secure Highway Parking</div>
              <div className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Spacious on-premises parking for tourist SUVs, tempo travelers, and tour buses with 24/7 CCTV vigilance.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#120d0a] border border-amber-900/30">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-serif font-bold text-sm text-white">Sparkling Clean Restrooms</div>
              <div className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Regularly sanitized washrooms and dedicated family facilities to refresh after remote hill climbs and waterfall treks.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#120d0a] border border-amber-900/30">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-serif font-bold text-sm text-white">Early Breakfast from 07:00 AM</div>
              <div className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Start early to beat peak afternoon heat with steaming ginger-cardamom chai, hot butter parathas, and curd.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#120d0a] border border-amber-900/30">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3">
                <Ticket className="w-4 h-4" />
              </div>
              <div className="font-serif font-bold text-sm text-white">Trek Lunch Parcel Packs</div>
              <div className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                Fort Vijaygarh and deep waterfalls have zero food stalls. We pack hot, spill-proof poori-sabzi and paneer boxes for your bag.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DETAILED ATTRACTION MODAL                                       */}
      {/* ============================================================== */}
      {selectedPlaceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#140f0c] border border-amber-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedPlaceForModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center border border-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedPlaceForModal.imageUrl}
                alt={selectedPlaceForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {selectedPlaceForModal.category}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  {selectedPlaceForModal.name}
                </h3>
                {selectedPlaceForModal.hindiName && (
                  <div className="text-xs text-amber-200/70 font-serif">
                    {selectedPlaceForModal.hindiName}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Highlight */}
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-medium">
                {selectedPlaceForModal.highlight}
              </div>

              {/* Description */}
              <p className="text-stone-300 leading-relaxed font-light text-sm">
                {selectedPlaceForModal.description}
              </p>

              {/* Key Facts Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#1a1410] border border-amber-900/30">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase">Distance from Keshari Dhaba</div>
                  <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                    {selectedPlaceForModal.distanceKm} km (~{selectedPlaceForModal.driveTimeMin} mins)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase">Trek Difficulty</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedPlaceForModal.trekDifficulty}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase">Recommended Duration</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedPlaceForModal.recommendedDuration}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase">Entry Fee</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedPlaceForModal.entryFee}
                  </div>
                </div>
              </div>

              {/* Road Condition & Best Time */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#17120e] border border-amber-900/20">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" />
                    <span>Road & Accessibility:</span>
                  </div>
                  <p className="text-stone-300 font-light">{selectedPlaceForModal.roadCondition}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#17120e] border border-amber-900/20">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Best Time to Visit & Ideal Hours:</span>
                  </div>
                  <p className="text-stone-300 font-light">
                    {selectedPlaceForModal.bestTimeToVisit} • {selectedPlaceForModal.bestTimeOfDay}
                  </p>
                </div>
              </div>

              {/* Packing List */}
              <div>
                <div className="font-bold text-amber-400 mb-2">🎒 Essential Things to Carry:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedPlaceForModal.mustCarry.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#1f1813] border border-amber-900/40 text-stone-300 text-[11px]"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map Embed Iframe in Modal */}
              <div>
                <div className="font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Live Map Location Embed:</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-amber-500/40 h-52 bg-stone-950">
                  <iframe
                    title={`${selectedPlaceForModal.name} Modal Map Embed`}
                    src={selectedPlaceForModal.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedPlaceForModal.googleMapsNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start GPS Navigation</span>
                </a>
                <a
                  href={`https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Keshari Dhaba! We are visiting ${selectedPlaceForModal.name} and would like to order lunch parcels / book table at the Dhaba.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pre-Book Meals on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
