import React from "react";
import { Search, ShoppingBag, Settings, LogIn, Globe, HelpCircle } from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data";

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({
  currentLang,
  setLang,
  cartCount,
  onOpenCart,
  isAdminOpen,
  setIsAdminOpen,
  searchQuery,
  setSearchQuery
}: NavbarProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo and Title */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setIsAdminOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-700 via-green-600 to-amber-500 overflow-hidden text-white font-black text-lg shadow-sm border border-stone-100">
              G
              {/* Visual brand overlay */}
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-xl text-stone-900 block" id="navbar-brand-title">
                {t.logoTitle}
              </span>
              <span className="text-[10px] font-medium tracking-wide text-emerald-700 uppercase block -mt-1">
                {currentLang === 'en' ? 'Bilingual Premium' : 'የኢትዮጵያ ፕሪሚየም'}
              </span>
            </div>
          </div>

          {/* Center Search Input (hidden/compact on admin) */}
          {!isAdminOpen && (
            <div className="hidden md:flex relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-1.5 text-sm bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-800 rounded-full border border-stone-200 focus:border-emerald-600 focus:outline-none transition-all placeholder:text-stone-400"
                id="navbar-search-input"
              />
            </div>
          )}

          {/* Right Controls Container */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher Toggle Button */}
            <button
              onClick={() => setLang(currentLang === "en" ? "am" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200 shadow-sm"
              title={currentLang === "en" ? "ጨው አድርገው ወደ አማርኛ ቀይር" : "Switch user interface to English"}
              id="language-switcher-btn"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-700" />
              <span>{currentLang === "en" ? "አማርኛ" : "English"}</span>
            </button>

            {/* Admin Dashboard Page Toggle */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-sm ${
                isAdminOpen
                  ? "bg-stone-950 text-white border-stone-950 hover:bg-stone-800"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200/50"
              }`}
              id="toggle-admin-btn"
            >
              <Settings className={`h-3.5 w-3.5 ${isAdminOpen ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isAdminOpen 
                  ? (currentLang === 'en' ? "Exit Admin" : "ከአስተዳደር ውጣ") 
                  : (currentLang === 'en' ? "Admin Portal" : "የአስተዳደር ክፍል")
                }
              </span>
            </button>

            {/* Shopping Cart Button */}
            {!isAdminOpen && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-700 hover:text-emerald-700 rounded-full bg-stone-100 hover:bg-stone-200 transition-all border border-stone-200 shadow-sm"
                aria-label="View Cart"
                id="cart-trigger-btn"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-stone-950 animate-bounce shadow-sm border border-stone-100">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

          </div>
        </div>

        {/* Search Bar for Mobile Screens */}
        {!isAdminOpen && (
          <div className="md:hidden pb-4 px-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100/80 text-stone-800 rounded-full border border-stone-200 focus:border-emerald-600 focus:outline-none focus:bg-white"
                id="navbar-mobile-search"
              />
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
