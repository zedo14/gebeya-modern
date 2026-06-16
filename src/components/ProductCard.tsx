import React from "react";
import { Star, ShoppingCart, HelpCircle, Inbox } from "lucide-react";
import { Product, Language } from "../types";
import { TRANSLATIONS } from "../data";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  currentLang: Language;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

export default function ProductCard({
  product,
  currentLang,
  onAddToCart,
  onViewDetails
}: ProductCardProps) {
  const t = TRANSLATIONS[currentLang];

  const localizedName = currentLang === "en" ? product.nameEn : product.nameAm;
  const localizedDesc = currentLang === "en" ? product.descriptionEn : product.descriptionAm;
  
  // Clean category tag
  const categoryLabel = t[`cat_${product.category}`] || product.category;

  const outOfStock = product.stock <= 0;

  return (
    <div 
      className="group flex flex-col justify-between overflow-hidden bg-white rounded-3xl border border-stone-200 hover:border-emerald-600/35 hover:shadow-xl transition-all duration-300"
      id={`product-card-${product.id}`}
    >
      
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={localizedName}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Popular Tag */}
        {product.isPopular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-10">
            {currentLang === "en" ? "Curated" : "የተመረጠ"}
          </div>
        )}

        {/* Category Label */}
        <div className="absolute bottom-3 left-3 bg-stone-900/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
          {categoryLabel}
        </div>

        {/* Fast Action Quick Add Button */}
        {!outOfStock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="absolute bottom-3 right-3 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 shadow-md transform hover:scale-105"
            title={t.addToCart}
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* Detail Copy Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1 mb-4">
          
          {/* Rating visual */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "fill-current" : "text-stone-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-stone-500 font-mono">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-stone-900 font-bold text-base leading-snug cursor-pointer hover:text-emerald-700 hover:underline decoration-emerald-800 line-clamp-1"
          >
            {localizedName}
          </h3>

          {/* Sub description snippet */}
          <p className="text-stone-500 text-xs line-clamp-2 md:line-clamp-3 leading-relaxed">
            {localizedDesc}
          </p>
        </div>

        {/* Price Tag & CTA Container */}
        <div>
          <div className="flex items-baseline justify-between gap-2 border-t border-stone-100 pt-3">
            <div>
              <span className="text-stone-400 text-[10px] block font-semibold uppercase leading-none mb-0.5">
                {currentLang === 'en' ? 'Price' : 'ዋጋ'}
              </span>
              <span className="text-stone-900 font-extrabold text-base tracking-tight font-mono">
                {product.priceEtb.toLocaleString()} <span className="text-xs font-bold text-emerald-800">{t.priceUnit}</span>
              </span>
            </div>

            {/* Availability */}
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
              outOfStock 
                ? "bg-stone-100 text-stone-400 border border-stone-200/50" 
                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}>
              {outOfStock ? t.outOfStock : t.stockText}
            </span>
          </div>

          {/* Direct CTA Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
            <button
              onClick={() => onViewDetails(product)}
              className="w-full text-center py-2 text-xs font-bold font-sans text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
            >
              {currentLang === "en" ? "View Details" : "ዝርዝር ሁኔታ"}
            </button>
            <button
              disabled={outOfStock}
              onClick={() => onAddToCart(product)}
              className={`w-full py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
                outOfStock
                  ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                  : "bg-emerald-800 hover:bg-emerald-950 text-white shadow-sm hover:shadow active:scale-[0.98]"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t.addToCart}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
