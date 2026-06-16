import React, { useState, useMemo } from "react";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageSquare,
  Sparkles,
  Award
} from "lucide-react";
import { Language, Product, CartItem, Order, Category } from "./types";
import { TRANSLATIONS, INITIAL_PRODUCTS, INITIAL_ORDERS } from "./data";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import AdminDashboard from "./components/Admin/AdminDashboard";

export default function App() {
  const [currentLang, setLang] = useState<Language>("en");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  
  // View states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Review fields inside product modal
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewCommentEn, setReviewCommentEn] = useState("");
  const [reviewCommentAm, setReviewCommentAm] = useState("");

  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutPayment, setCheckoutPayment] = useState<'telebirr' | 'chapa' | 'cbe' | 'cash'>("telebirr");
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>("standard");
  
  // Checkout process simulation
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const t = TRANSLATIONS[currentLang];

  // Calculate pricing values
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.priceEtb * item.quantity, 0);
  }, [cart]);

  const deliveryFee = deliverySpeed === 'standard' ? 150 : 350;
  
  const cartTotal = useMemo(() => {
    return cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0;
  }, [cartSubtotal, deliveryFee]);

  const cartTotalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Filter products by searching and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchSearch = 
        p.nameEn.toLowerCase().includes(lowerQuery) || 
        p.nameAm.includes(lowerQuery) ||
        p.descriptionEn.toLowerCase().includes(lowerQuery) ||
        p.descriptionAm.includes(lowerQuery);
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Add item helper
  const handleAddToCart = (product: Product, size?: string) => {
    if (product.stock <= 0) return;
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: Math.min(product.stock, item.quantity + 1) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1, selectedSize: size }];
    });
    // Open cart sidebar on quick addition
    setIsCartOpen(true);
  };

  // Adjust item quantity
  const handleUpdateCartQuantity = (productId: string, size: string | undefined, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: Math.min(item.product.stock, nextQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove item
  const handleRemoveFromCart = (productId: string, size: string | undefined) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  // Handle adding customer reviews dynamically
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewName || !reviewCommentEn || !reviewCommentAm) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      userName: reviewName,
      commentEn: reviewCommentEn,
      commentAm: reviewCommentAm,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === selectedProduct.id) {
          const updatedReviews = p.reviews ? [...p.reviews, newReview] : [newReview];
          // Recalculate rating
          const avgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating
          };
        }
        return p;
      });
    });

    // Update locally inspected product inside modal too!
    setSelectedProduct(prev => {
      if (!prev) return null;
      const updatedReviews = prev.reviews ? [...prev.reviews, newReview] : [newReview];
      const avgRating = Number(
        (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
      );
      return {
        ...prev,
        reviews: updatedReviews,
        rating: avgRating
      };
    });

    // Reset inputs
    setReviewName("");
    setReviewRating(5);
    setReviewCommentEn("");
    setReviewCommentAm("");
  };

  // Place order from modern Simulated Payment Gateway (Telebirr / Chapa / CBE)
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!checkoutName || !checkoutPhone || !checkoutAddress) {
      alert(currentLang === 'en' ? "Please complete all fields to secure your delivery route." : "እባክዎ የማጓጓዣ መረጃዎችን በሙሉ ያሙሉ።");
      return;
    }

    setIsPlacingOrder(true);

    const orderedItems = cart.map(item => ({
      productId: item.product.id,
      productNameEn: item.product.nameEn,
      productNameAm: item.product.nameAm,
      quantity: item.quantity,
      price: item.product.priceEtb,
      selectedSize: item.selectedSize
    }));

    // Deduct stock levels in local inventory
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const orderLine = cart.find(item => item.product.id === p.id);
        if (orderLine) {
          return { ...p, stock: Math.max(0, p.stock - orderLine.quantity) };
        }
        return p;
      });
    });

    // Build unique transaction reference (e.g., GB-8942)
    const orderId = `GB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName: checkoutName,
      phoneNumber: checkoutPhone,
      address: checkoutAddress,
      items: orderedItems,
      paymentMethod: checkoutPayment,
      paymentStatus: checkoutPayment === 'cash' ? 'pending' : 'completed',
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    // Simulate 1.5 seconds payment verification transition
    setTimeout(() => {
      setOrders(prev => [newOrder, ...prev]);
      setLastPlacedOrder(newOrder);
      setIsPlacingOrder(false);
      setCart([]); // Reset bag
    }, 1500);
  };

  // Close order feedback block
  const handleCloseSuccessModal = () => {
    setLastPlacedOrder(null);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 font-sans selection:bg-emerald-600 selection:text-white flex flex-col justify-between" id="applet-viewport">
      
      {/* Navigation Suite */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        cartCount={cartTotalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-grow">
        {isAdminOpen ? (
          
          /* Admin Ledger Controls Component */
          <AdminDashboard
            currentLang={currentLang}
            onClose={() => setIsAdminOpen(false)}
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
          />

        ) : (

          /* Buyer Catalog Viewport */
          <div className="space-y-12">
            
            {/* Elegant Cultural Backdrop Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-stone-100 py-16 md:py-24">
              
              {/* Golden circular design details in the margins */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="absolute top-10 right-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                  
                  {/* Local Heritage Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold tracking-wider uppercase mb-6 leading-none">
                    <Sparkles className="h-3 w-3" />
                    <span>{currentLang === 'en' ? 'Authentic Ethiopian Sourcing' : 'ቀጥታ ከአምራቾች ግዢ'}</span>
                  </div>

                  {/* Primary Heading */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight" id="hero-heading-eng-am">
                    {t.heroHeading}
                  </h1>

                  {/* Secondary descriptor */}
                  <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                    {t.heroSubheading}
                  </p>

                  {/* Hero buttons CTA */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        const target = document.getElementById("catalog-showcase-section");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm tracking-wide rounded-2xl shadow-lg transform active:scale-[0.98] transition-all flex items-center gap-2"
                      id="hero-cta-btn"
                    >
                      <span>{t.heroCta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-stone-300 text-xs">
                      <Award className="h-5 w-5 text-amber-400 shrink-0" />
                      <span className="font-semibold">{currentLang === 'en' ? 'Bilingual Support (EN / አማ)' : 'ባለሁለት ቋንቋ ድጋፍ'}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Catalog Showcases Block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16" id="catalog-showcase-section">
              
              {/* Category Segment Selectors */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-5 gap-4">
                
                {/* Visual Category switches */}
                <div className="flex flex-wrap gap-2">
                  {(["all", "clothing", "coffee", "spices", "crafts"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4.5 py-2 rounded-full text-xs font-extrabold transition-all border shadow-sm ${
                        selectedCategory === cat
                          ? "bg-emerald-900 border-emerald-950 text-white shadow-emerald-900/15"
                          : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                      }`}
                      id={`category-switch-${cat}`}
                    >
                      {cat === "all" ? t.allCategories : t[`cat_${cat}`] || cat}
                    </button>
                  ))}
                </div>

                {/* Subtitle count indicator */}
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest pl-1">
                  {filteredProducts.length} {currentLang === 'en' ? 'Products Listed' : 'ምርቶች ተገኝተዋል'}
                </span>
              </div>

              {/* Dynamic Empty State block */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-stone-200" id="empty-catalog-fallback">
                  <div className="max-w-md mx-auto space-y-4">
                    <span className="inline-block p-4 bg-stone-50 text-stone-400 rounded-full">
                      <ShoppingBag className="h-10 w-10 stroke-1" />
                    </span>
                    <h3 className="text-lg font-bold text-stone-800">
                      {currentLang === 'en' ? "No Matching Products Found" : "ምንም ዓይነት ምርት አልተገኘም"}
                    </h3>
                    <p className="text-xs text-stone-500 leading-normal">
                      {currentLang === 'en' 
                        ? "We couldn't find any products in this category matching your search terms. Let's try resetting categories."
                        : "በፈለጉት የፍለጋ ቃል መሰረት ምንም አይነት ውጤት አልተገኘም። እባክዎ በሌላ ቃል ይሞክሩ።"
                      }
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setSearchQuery("");
                      }}
                      className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                    >
                      {currentLang === 'en' ? "Reset Filter Set" : "ማጣሪያዎቹን አጽዳ"}
                    </button>
                  </div>
                </div>
              ) : (
                
                /* Dynamic Masonry Product Portfolio Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      currentLang={currentLang}
                      onAddToCart={(prod) => handleAddToCart(prod)}
                      onViewDetails={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              )}

              {/* Authenticity Pledge Ribbon */}
              <div className="bg-gradient-to-tr from-amber-50 to-emerald-50 rounded-3xl border border-stone-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <span className="p-3 bg-white border border-amber-200 text-amber-600 rounded-2xl shadow-sm">
                    <ShieldCheck className="h-7 w-7" />
                  </span>
                  <div>
                    <h4 className="text-stone-900 font-extrabold text-base leading-snug">
                      {t.artisanalGuaranteed}
                    </h4>
                    <p className="text-stone-500 text-xs mt-1 leading-relaxed max-w-xl">
                      {t.artisanalDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 divide-x divide-stone-200">
                  <div className="text-center px-4">
                    <span className="block text-xl font-extrabold text-stone-900 font-mono">100%</span>
                    <span className="text-[10px] text-stone-400 font-bold uppercase">{currentLang === 'en' ? 'Organic' : 'ኦርጋኒክ'}</span>
                  </div>
                  <div className="text-center px-4">
                    <span className="block text-xl font-extrabold text-stone-900 font-mono">Addis</span>
                    <span className="text-[10px] text-stone-400 font-bold uppercase">{currentLang === 'en' ? 'Fulfillment' : 'ማቅረቢያ'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-stone-800 pb-8 mb-8">
            <div>
              <span className="text-lg font-extrabold text-white block">
                {t.logoTitle}
              </span>
              <span className="text-xs text-stone-500 block mt-1">
                {t.tagline}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <span className="text-stone-500">{currentLang === 'en' ? 'Payment Gateways Connected' : 'የተገናኙ የክፍያ አማራጮች'}</span>
              <span className="bg-emerald-900/40 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800/50">Telebirr</span>
              <span className="bg-amber-900/40 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-800/50">Chapa</span>
              <span className="bg-blue-900/40 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-800/50">CBE Birr</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© 2026 Gebeya Modern. {currentLang === 'en' ? 'All rights reserved.' : 'መብቱ በህግ የተጠበቀ ነው።'}</p>
            <p>Made with Pride in Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </footer>

      {/* SHOPPING BAG SIDEBAR / CART SLIDEOVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/35 backdrop-blur-xs flex justify-end" id="shopping-cart-sidebar-container">
          
          {/* Main Sidebar form */}
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative animate-slide-in">
            
            {/* Header portion */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-800 font-bold" />
                <h3 className="text-stone-900 font-extrabold text-lg">
                  {t.cartTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List items scroll section */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4 text-stone-400">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 stroke-1 text-stone-300" />
                  </div>
                  <p className="text-xs max-w-[240px] mx-auto text-stone-500 leading-normal">
                    {t.cartEmpty}
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const localName = currentLang === 'en' ? item.product.nameEn : item.product.nameAm;
                  return (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/60 relative"
                      id={`cart-item-${item.product.id}`}
                    >
                      <img
                        src={item.product.image}
                        alt={localName}
                        className="w-16 h-16 object-cover rounded-xl border border-stone-200/80 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-stone-900 text-sm truncate" title={localName}>
                          {localName}
                        </h4>
                        
                        {/* Size tag optionally */}
                        {item.selectedSize && (
                          <span className="inline-block bg-pink-100 text-pink-700 text-[9.5px] font-black uppercase px-2 py-0.2 rounded-md tracking-wider mt-0.5">
                            {currentLang === 'en' ? 'Size' : 'መጠን'}: {item.selectedSize}
                          </span>
                        )}

                        <div className="flex items-center justify-between gap-2 mt-2">
                          <span className="font-mono text-xs font-bold text-stone-900">
                            {(item.product.priceEtb * item.quantity).toLocaleString()} ETB
                          </span>

                          {/* Up/down selector */}
                          <div className="flex items-center border border-stone-200 bg-white rounded-lg">
                            <button
                              onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, -1)}
                              className="p-1 hover:bg-stone-100 text-stone-600 rounded-l"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold font-mono text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, 1)}
                              className="p-1 hover:bg-stone-100 text-stone-600 rounded-r"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Explicit delete trashcan */}
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
                        className="absolute top-3 right-3 p-1 text-stone-400 hover:text-stone-700"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Subtotal and checkout triggers */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/80 space-y-4">
                
                {/* Delivery Fees configurations */}
                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between items-center text-sm">
                    <span>{t.cartSubtotal}</span>
                    <span className="font-mono font-bold text-stone-800">{cartSubtotal.toLocaleString()} ETB</span>
                  </div>

                  {/* Radio buttons to toggle Delivery Speed Option */}
                  <div className="border border-stone-200 rounded-2xl bg-white p-3.5 space-y-2.5">
                    <span className="font-bold text-stone-700 block text-[10px] uppercase tracking-wider">{t.deliveryFee}</span>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="delivery-std"
                          name="del-speed"
                          checked={deliverySpeed === 'standard'}
                          onChange={() => setDeliverySpeed('standard')}
                          className="w-4 h-4 accent-emerald-800"
                        />
                        <label htmlFor="delivery-std" className="text-xs font-semibold text-stone-700 cursor-pointer">
                          {t.standardDelivery}
                        </label>
                      </div>
                      <span className="font-mono font-bold text-stone-600 text-xs">150 ETB</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="delivery-expr"
                          name="del-speed"
                          checked={deliverySpeed === 'express'}
                          onChange={() => setDeliverySpeed('express')}
                          className="w-4 h-4 accent-emerald-800"
                        />
                        <label htmlFor="delivery-expr" className="text-xs font-semibold text-stone-700 cursor-pointer">
                          {t.expressDelivery}
                        </label>
                      </div>
                      <span className="font-mono font-bold text-stone-600 text-xs">350 ETB</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-stone-500 font-extrabold text-sm uppercase">{t.cartTotal}</span>
                  <span className="font-mono text-xl font-extrabold text-stone-950">
                    {cartTotal.toLocaleString()} <span className="text-xs text-emerald-800 font-sans font-black">ETB</span>
                  </span>
                </div>

                {isCheckoutOpen ? (
                  
                  /* Secure Checkout Form Panel */
                  <form onSubmit={handlePlaceOrder} className="space-y-3.5 border-t border-stone-200 pt-4" id="checkout-form-gateways">
                    
                    <h4 className="font-black text-stone-900 text-sm">
                      {t.checkoutTitle}
                    </h4>

                    {/* Customer details Inputs */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder={t.fullNameLabel}
                        className="w-full text-xs p-2.5 border border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                      <input
                        type="tel"
                        required
                        pattern="^(09|07)\d{8}$"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full text-xs p-2.5 border border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none font-mono"
                        title="Enter valid local phone: e.g. 0912345678"
                      />
                      <input
                        type="text"
                        required
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        placeholder={t.addressPlaceholder}
                        className="w-full text-xs p-2.5 border border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    {/* Highly authentic Ethiopian gateway switches */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">{t.paymentMethodLabel}</span>
                      <div className="grid grid-cols-2 gap-2">
                        
                        {/* Telebirr trigger */}
                        <div
                          onClick={() => setCheckoutPayment("telebirr")}
                          className={`p-2 rounded-xl border-2 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
                            checkoutPayment === "telebirr"
                              ? "bg-rose-50 border-rose-500 text-rose-700"
                              : "bg-white border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <span className="text-xs font-black tracking-widest text-[#E31E24]">telebirr</span>
                          <span className="text-[8px] text-stone-400 mt-1">E-Money 🔴</span>
                        </div>

                        {/* Chapa integration */}
                        <div
                          onClick={() => setCheckoutPayment("chapa")}
                          className={`p-2 rounded-xl border-2 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
                            checkoutPayment === "chapa"
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                              : "bg-white border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <span className="text-xs font-black text-emerald-700 tracking-tight">CHAPA</span>
                          <span className="text-[8px] text-stone-400 mt-1">Local/Global Debit 🟢</span>
                        </div>

                        {/* CBE Direct bank */}
                        <div
                          onClick={() => setCheckoutPayment("cbe")}
                          className={`p-2 rounded-xl border-2 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
                            checkoutPayment === "cbe"
                              ? "bg-blue-50 border-blue-600 text-blue-700"
                              : "bg-white border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <span className="text-xs font-extrabold tracking-wide text-blue-800">CBE Birr</span>
                          <span className="text-[8px] text-stone-400 mt-1">Direct Transfer 🔵</span>
                        </div>

                        {/* Cash on delivery */}
                        <div
                          onClick={() => setCheckoutPayment("cash")}
                          className={`p-2 rounded-xl border-2 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
                            checkoutPayment === "cash"
                              ? "bg-stone-100 border-stone-600 text-stone-800"
                              : "bg-white border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <span className="text-xs font-bold text-stone-700 uppercase tracking-tight">On Delivery</span>
                          <span className="text-[8px] text-stone-400 mt-1">Cash in hand</span>
                        </div>

                      </div>
                    </div>

                    {/* Actions: submit order */}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="w-1/3 py-2.5 text-xs text-stone-500 border border-stone-200 hover:bg-stone-50 font-bold rounded-xl transition"
                      >
                        {t.cancelingOrder}
                      </button>
                      <button
                        type="submit"
                        disabled={isPlacingOrder}
                        className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-extrabold rounded-xl transition shadow flex items-center justify-center gap-2"
                        id="complete-checkout-btn"
                      >
                        {isPlacingOrder ? (
                          <>
                            <span className="animate-spin text-sm">⌛</span>
                            <span>{currentLang === 'en' ? "Verifying..." : "በማጣራት ላይ..."}</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>{t.placeOrderButton}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>

                ) : (

                  /* Primary trigger button to open checkout forms */
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 bg-stone-950 hover:bg-black text-white font-black text-sm rounded-xl tracking-wide transition shadow active:scale-[0.98] flex items-center justify-center gap-2"
                    id="checkout-trigger-btn"
                  >
                    <span>{t.checkoutButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* DYNAMIC SUCCESS FEEDBACK OVERLAY SCREEN */}
      {lastPlacedOrder && (
        <div className="fixed inset-0 z-55 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center max-w-md w-full shadow-2xl relative space-y-5 animate-scale-up" id="success-receipt-modal">
            
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-xl md:text-2xl font-black text-stone-900 leading-tight">
              {t.orderSuccessHero}
            </h3>

            <p className="text-stone-600 text-xs leading-relaxed">
              {t.orderSuccessDesc} <strong className="text-stone-800 font-mono text-xs">{checkoutPhone}</strong>.
            </p>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-left text-xs text-stone-700">
              <div className="flex justify-between font-bold text-stone-900">
                <span>{currentLang === 'en' ? 'Receipt ID:' : 'ደረሰኝ መለያ፦'}</span>
                <span className="font-mono">{lastPlacedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLang === 'en' ? 'Method:' : 'ክፍያ አማራጭ፦'}</span>
                <span className="uppercase font-mono font-bold text-emerald-800">{lastPlacedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLang === 'en' ? 'Estimated Delivery:' : 'ማድረሻ ጊዜ፦'}</span>
                <span className="font-mono font-semibold">{lastPlacedOrder.date}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200/60 pt-2 font-black text-stone-950">
                <span>{currentLang === 'en' ? 'Grand Total:' : 'ጠቅላላ ሂሳብ፦'}</span>
                <span className="font-mono">{lastPlacedOrder.total.toLocaleString()} ETB</span>
              </div>
            </div>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full py-3 bg-stone-950 hover:bg-black text-white font-extrabold text-xs rounded-xl transition"
              id="close-success-dialog-btn"
            >
              {t.closeButton}
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILED DETAILS MODAL VIEW */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" id="product-detail-modal">
            
            {/* Close modal */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 z-10 p-2 text-stone-300 hover:text-stone-900 hover:bg-stone-100 rounded-full transition"
            >
              <X className="w-5 h-5 font-bold" />
            </button>

            {/* Layout grid halves */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Product Visual Area */}
              <div className="relative aspect-square md:h-full bg-stone-100">
                <img
                  src={selectedProduct.image}
                  alt={currentLang === 'en' ? selectedProduct.nameEn : selectedProduct.nameAm}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {selectedProduct.isPopular && (
                  <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                    {currentLang === 'en' ? 'Curated' : 'የተመረጠ'}
                  </span>
                )}
              </div>

              {/* Product Info copy and reviews segment */}
              <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  {/* Category and ratings */}
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(selectedProduct.rating) ? "fill-current" : "text-stone-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-500 font-mono">
                        {selectedProduct.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic translated Title */}
                  <h3 className="text-2xl font-black text-stone-900 leading-tight">
                    {currentLang === 'en' ? selectedProduct.nameEn : selectedProduct.nameAm}
                  </h3>

                  {/* Price Block */}
                  <div className="text-stone-900 font-extrabold text-xl font-mono tracking-tight">
                    {selectedProduct.priceEtb.toLocaleString()} <span className="text-xs text-stone-500 font-sans font-bold">ETB</span>
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-widest">{t.productDetails}</span>
                    <p className="text-stone-600 text-xs leading-relaxed md:text-sm">
                      {currentLang === 'en' ? selectedProduct.descriptionEn : selectedProduct.descriptionAm}
                    </p>
                  </div>

                  {/* Sizes (only for garments) */}
                  {selectedProduct.sizes && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-widest">{t.sizesText}</span>
                      <div className="flex gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleAddToCart(selectedProduct, sz)}
                            className="w-10 h-10 border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-xs font-bold font-mono rounded-lg flex items-center justify-center transition active:scale-95 text-stone-800"
                            title={`Add and select size ${sz}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Origin Tag */}
                  <div className="border-t border-stone-100 pt-4 flex gap-6 text-xs text-stone-500 font-sans">
                    <div>
                      <span className="font-bold text-stone-400 block uppercase tracking-wider text-[9px] mb-0.5">{t.originText}</span>
                      <span className="font-semibold text-stone-800">{t.ethiopia}</span>
                    </div>
                    <div>
                      <span className="font-bold text-stone-400 block uppercase tracking-wider text-[9px] mb-0.5">{currentLang === 'en' ? 'Stock Level' : 'እቃዎች ክምችት'}</span>
                      <span className="font-semibold font-mono text-stone-800">
                        {selectedProduct.stock > 0 ? `${selectedProduct.stock} units` : "Sold Out"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC REVIEWS CHATFEED */}
                <div className="border-t border-stone-100 pt-6 space-y-4">
                  <h4 className="text-xs font-black uppercase text-stone-900 tracking-wider">
                    {t.reviewsTitle}
                  </h4>

                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    {!selectedProduct.reviews || selectedProduct.reviews.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">
                        {t.noReviews}
                      </p>
                    ) : (
                      selectedProduct.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-150 text-xs text-stone-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-stone-800">{rev.userName}</span>
                            <div className="flex items-center gap-1 font-mono text-[10px] text-amber-500 font-bold">
                              <span>★</span>
                              <span>{rev.rating}</span>
                              <span className="text-stone-400 font-normal">| {rev.date}</span>
                            </div>
                          </div>
                          <p className="text-stone-600">
                            {currentLang === 'en' ? rev.commentEn : rev.commentAm}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* USER INTERACTIVE COMMENT/REVIEW FORM */}
                  <form onSubmit={handleAddReview} className="space-y-2.5 bg-stone-50 hover:bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200">
                    <span className="text-[9.5px] font-extrabold text-stone-400 block uppercase tracking-wider">
                      {currentLang === 'en' ? "Write Your Review" : "የእቃውን ጥራት ይገምግሙ / አስተያየት ይጻፉ"}
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder={currentLang === 'en' ? "Your Name" : "የእርስዎ ስም"}
                        className="p-2 border border-stone-200 rounded-xl text-xs bg-white focus:outline-none"
                      />
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="p-2 border border-stone-200 rounded-xl text-xs bg-white text-amber-600 font-bold focus:outline-none"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                        <option value={3}>⭐⭐⭐ (3/5)</option>
                        <option value={2}>⭐⭐ (2/5)</option>
                        <option value={1}>⭐ (1/5)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={reviewCommentEn}
                        onChange={(e) => setReviewCommentEn(e.target.value)}
                        placeholder="Review (English)..."
                        className="p-2 border border-stone-200 rounded-xl text-xs bg-white focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={reviewCommentAm}
                        onChange={(e) => setReviewCommentAm(e.target.value)}
                        placeholder="አስተያየት (አማርኛ)..."
                        className="p-2 border border-stone-200 rounded-xl text-xs bg-white focus:outline-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-[10px] rounded-xl tracking-wider transition uppercase"
                    >
                      {currentLang === 'en' ? "Post Review Link" : "አስተያየቱን ላክ"}
                    </button>
                  </form>
                </div>

                {/* Overall Primary Modal CTA */}
                <div className="flex gap-3 border-t border-stone-100 pt-6">
                  <button
                    disabled={selectedProduct.stock <= 0}
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className={`w-full py-3 text-xs font-black rounded-xl tracking-wide transition shadow-sm ${
                      selectedProduct.stock <= 0
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-emerald-800 hover:bg-emerald-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    {selectedProduct.stock <= 0 ? t.outOfStock : `${t.addToCart} (${selectedProduct.priceEtb.toLocaleString()} ETB)`}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
