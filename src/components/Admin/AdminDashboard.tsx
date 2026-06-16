import React, { useState } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  RefreshCw, 
  Filter, 
  Star, 
  Clock, 
  ArrowLeftRight, 
  UploadCloud, 
  Check, 
  User, 
  Phone, 
  MapPin, 
  BarChart3,
  X
} from "lucide-react";
import { Product, Order, Language, Category } from "../../types";
import { TRANSLATIONS } from "../../data";

interface AdminDashboardProps {
  currentLang: Language;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function AdminDashboard({
  currentLang,
  onClose,
  products,
  setProducts,
  orders,
  setOrders
}: AdminDashboardProps) {
  const t = TRANSLATIONS[currentLang];

  // Forms block
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // New/editing product fields
  const [nameEn, setNameEn] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [priceEtb, setPriceEtb] = useState<number>(1000);
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAm, setDescriptionAm] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<Category>("clothing");
  const [stock, setStock] = useState<number>(10);
  const [isPopular, setIsPopular] = useState(false);

  // Filter orders by status
  const [orderFilter, setOrderFilter] = useState<string>("all");

  // Open form for adding new item
  const handleAddNew = () => {
    setEditingProduct(null);
    setNameEn("");
    setNameAm("");
    setPriceEtb(1500);
    setDescriptionEn("");
    setDescriptionAm("");
    setImage("https://images.unsplash.com/photo-15442005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600");
    setCategory("clothing");
    setStock(15);
    setIsPopular(false);
    setIsFormOpen(true);
  };

  // Open form to edit existing item
  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setNameEn(p.nameEn);
    setNameAm(p.nameAm);
    setPriceEtb(p.priceEtb);
    setDescriptionEn(p.descriptionEn);
    setDescriptionAm(p.descriptionAm);
    setImage(p.image);
    setCategory(p.category);
    setStock(p.stock);
    setIsPopular(!!p.isPopular);
    setIsFormOpen(true);
  };

  // Handle saving (creates or updates product)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !nameAm) {
      alert("Please fill in both English and Amharic names.");
      return;
    }

    if (editingProduct) {
      // Update existing
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        nameEn,
        nameAm,
        priceEtb: Number(priceEtb),
        descriptionEn,
        descriptionAm,
        image,
        category,
        stock: Number(stock),
        isPopular
      } : p));
    } else {
      // Create new
      const newProduct: Product = {
        id: `custom-prod-${Date.now()}`,
        nameEn,
        nameAm,
        priceEtb: Number(priceEtb),
        descriptionEn,
        descriptionAm,
        image,
        category,
        rating: 5.0,
        stock: Number(stock),
        isPopular,
        reviews: []
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Hard delete a product
  const handleDeleteProduct = (id: string) => {
    if (confirm(currentLang === 'en' ? "Are you sure you want to delete this listing?" : "ይህን ምርት ለማጥፋት እርግጠኛ ነዎት?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Toggle Order Status flow
  const handleUpdateOrderStatus = (orderId: string, currentStatus: string) => {
    const statuses: Array<'pending' | 'processing' | 'shipped' | 'delivered'> = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus as any);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // Toggle order payment status
  const handleTogglePaymentStatus = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      paymentStatus: o.paymentStatus === 'completed' ? 'pending' : 'completed'
    } : o));
  };

  // Summary statistics calculations
  const totalSalesVal = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((acc, o) => acc + o.total, 0);

  const completedOrdersCount = orders.length;
  const averageSales = completedOrdersCount > 0 ? Math.round(orders.reduce((acc, o) => acc + o.total, 0) / completedOrdersCount) : 0;
  const activeItemsCount = products.length;

  // Render a lovely custom sales chart with inline CSS & SVGs
  const maximumSalesValue = Math.max(...orders.map(o => o.total), 5000);

  return (
    <div className="bg-stone-50 min-h-screen py-8 pb-20 font-sans text-stone-900" id="admin-operations-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-600 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                {currentLang === 'en' ? "Secure Ledger Portal" : "ደህንነቱ የተጠበቀ መዝገብ"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900">
              {t.adminDashboardTitle}
            </h1>
            <p className="text-stone-500 text-sm max-w-2xl mt-1 leading-relaxed">
              {t.adminDashboardDesc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-white border border-stone-200 text-stone-800 hover:text-stone-900 hover:bg-stone-100 font-bold text-sm shadow-sm transition"
            id="admin-to-storefront-btn"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.backToStore}</span>
          </button>
        </div>

        {/* 4 Cards Stats Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 block tracking-wider uppercase mb-0.5">{t.totalRevenue}</span>
              <span className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                {totalSalesVal.toLocaleString()} <span className="text-xs text-stone-500 font-sans font-bold">ETB</span>
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-amber-50 text-amber-700 rounded-2xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 block tracking-wider uppercase mb-0.5">{t.totalOrders}</span>
              <span className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                {completedOrdersCount} <span className="text-xs text-stone-500 font-sans font-medium">Recorded</span>
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 block tracking-wider uppercase mb-0.5">{t.averageOrder}</span>
              <span className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                {averageSales.toLocaleString()} <span className="text-xs text-stone-500 font-sans font-bold">ETB</span>
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-purple-50 text-purple-700 rounded-2xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 block tracking-wider uppercase mb-0.5">{t.activeInventory}</span>
              <span className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                {activeItemsCount} <span className="text-xs text-stone-500 font-sans font-medium">Listed</span>
              </span>
            </div>
          </div>

        </div>

        {/* Dynamic Interactive Section Layout: Product Catalog on Left, Order Funnel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Grid: Product Catalog Registry */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6 gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-stone-900">
                  {currentLang === 'en' ? "Listed Collection Library" : "የቀረቡ እቃዎች ዝርዝር መዝገብ"}
                </h2>
                <p className="text-xs text-stone-500">
                  {currentLang === 'en' ? "Verify, expand and edit product parameters" : "የእቃዎችን ክምችት፣ ዋጋ እና ዝርዝር መግለጫ እዚህ ላይ ያስተካክሉ"}
                </p>
              </div>

              <button
                onClick={handleAddNew}
                className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
                id="admin-add-product-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addNewProductButton}</span>
              </button>
            </div>

            {/* Product Table List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">{currentLang === 'en' ? "Product" : "ምርት"}</th>
                    <th className="pb-3">{currentLang === 'en' ? "Category" : "ምድብ"}</th>
                    <th className="pb-3 text-right">{currentLang === 'en' ? "Price" : "ዋጋ"}</th>
                    <th className="pb-3 text-center">{currentLang === 'en' ? "Stock" : "ክምችት"}</th>
                    <th className="pb-3 text-right pr-2">{t.actionHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {products.map(p => {
                    const localName = currentLang === 'en' ? p.nameEn : p.nameAm;
                    return (
                      <tr key={p.id} className="hover:bg-stone-50/50 transition duration-155">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={localName}
                              className="w-10 h-10 object-cover rounded-lg border border-stone-200/80 shadow-sm"
                              referrerPolicy="no-referrer"
                            />
                            <div className="max-w-[150px] md:max-w-[200px]">
                              <p className="font-bold text-stone-900 truncate" title={localName}>
                                {localName}
                              </p>
                              {p.isPopular && (
                                <span className="inline-block bg-amber-500/10 text-amber-700 font-extrabold text-[9px] uppercase px-1.5 py-0.2 rounded mt-0.5">
                                  {currentLang === 'en' ? 'Promoted' : 'ልዩ'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 text-right font-medium font-mono text-stone-900">
                          {p.priceEtb.toLocaleString()} <span className="text-[10px] text-emerald-800 font-sans font-bold">ETB</span>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`inline-block w-8 text-center text-xs font-bold font-mono py-1 rounded-lg ${
                            p.stock <= 2 
                              ? "bg-rose-50 text-rose-700 border border-rose-200/40" 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                          }`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 text-right pr-2">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg transition"
                              title={t.editButton}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                              title={t.deleteButton}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Grid: Order Audits Ledger */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="border-b border-stone-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-stone-900">
                  {t.recentOrders}
                </h2>
                <p className="text-xs text-stone-500">
                  {currentLang === 'en' ? "Verify instant payment gateways and fulfillment" : "የባንክና ቴሌብር ክፍያዎችን እዚህ ጋር አረጋግጠው እቃዎችን ያጓጉዙ"}
                </p>
              </div>

              {/* Minimal filter tag */}
              <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg p-1">
                <Filter className="w-3 h-3 text-stone-400 mx-1.5" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-extrabold uppercase text-stone-600 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option value="all">{currentLang === 'en' ? 'ALL ORDERS' : 'ሁሉንም'}</option>
                  <option value="pending">{currentLang === 'en' ? 'PENDING' : 'ክፍያ ያልተቀበሉ'}</option>
                  <option value="completed">{currentLang === 'en' ? 'PAID' : 'የተከፈሉ'}</option>
                </select>
              </div>
            </div>

            {/* List of Orders cards */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <Clock className="w-8 h-8 mx-auto stroke-1 stroke-stone-300 mb-2" />
                  <p className="text-xs font-mono">{t.emptyOrdersAdmin}</p>
                </div>
              ) : (
                orders
                  .filter(o => orderFilter === 'all' ? true : (orderFilter === 'completed' ? o.paymentStatus === 'completed' : o.paymentStatus === 'pending'))
                  .map(order => {
                    return (
                      <div 
                        key={order.id} 
                        className="p-4 bg-stone-50 hover:bg-stone-50/80 rounded-2xl border border-stone-200 transition text-stone-800"
                        id={`admin-order-card-${order.id}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            {order.id}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono font-medium">
                            {order.date}
                          </span>
                        </div>

                        {/* Customer Information detail */}
                        <div className="space-y-1 mb-3 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-stone-900">
                            <User className="w-3 h-3 text-stone-400" />
                            <span>{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-stone-500">
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{order.phoneNumber}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-stone-500">
                            <MapPin className="w-3 h-3 text-stone-400 mt-0.5 shrink-0" />
                            <span className="truncate max-w-[280px]" title={order.address}>
                              {order.address}
                            </span>
                          </div>
                        </div>

                        {/* List items requested */}
                        <div className="border-t border-b border-stone-200/60 py-2.5 my-2.5 space-y-1.5">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs text-stone-700">
                              <span className="font-medium truncate max-w-[220px]">
                                {currentLang === 'en' ? it.productNameEn : it.productNameAm}
                                {it.selectedSize && <span className="text-[10px] font-bold text-pink-600 ml-1">({it.selectedSize})</span>}
                              </span>
                              <span className="font-mono font-semibold text-stone-500 shrink-0 select-none">
                                {it.quantity}x @ {it.price.toLocaleString()} ETB
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Pricing details and Gateway badges */}
                        <div className="flex items-center justify-between gap-2 mt-3">
                          <div>
                            <span className="text-[9px] text-stone-400 font-bold block uppercase tracking-wider">
                              {currentLang === 'en' ? "Method / Amount" : "ክፍያ / ጠቅላला"}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-extrabold uppercase text-stone-600 bg-stone-200/60 px-2 py-0.2 rounded font-mono">
                                {order.paymentMethod}
                              </span>
                              <span className="font-extrabold font-mono text-stone-950 text-xs">
                                {order.total.toLocaleString()} ETB
                              </span>
                            </div>
                          </div>

                          {/* Quick Audit Actions */}
                          <div className="flex items-center gap-1">
                            {/* Payment Toggle */}
                            <button
                              onClick={() => handleTogglePaymentStatus(order.id)}
                              className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border transition ${
                                order.paymentStatus === 'completed'
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-amber-50 text-amber-600 border-amber-200"
                              }`}
                              title="Click to toggle payment state"
                            >
                              {order.paymentStatus === 'completed' 
                                ? (currentLang === 'en' ? "PAID" : "ተከፍሏል") 
                                : (currentLang === 'en' ? "PENDING" : "ያልተከፈለ")
                              }
                            </button>

                            {/* Logistics State Rotator button */}
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                              className="flex items-center gap-1 text-[9.5px] font-black uppercase tracking-wider px-2 py-1 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-lg transition"
                              title="Advance delivery status step"
                            >
                              <span>{order.status}</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
              )}
            </div>
          </div>

        </div>

        {/* Dynamic dialog card for Registering/Editing a product */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
              
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-700 transition"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              <h3 className="text-xl font-extrabold text-stone-900 mb-2">
                {editingProduct ? t.editProductTitle : t.addProductTitle}
              </h3>
              <p className="text-stone-400 text-xs mb-6">
                {currentLang === 'en' ? "Populate fields carefully in English and Amharic languages to assure seamless user immersion." : "እባክዎ መረጃዎችን በእንግሊዝኛም በክብር አማርኛም በማስገባት የተሟላ ስራ ያቅርቡ።"}
              </p>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                
                {/* Product Name Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productNameEnLabel} *</label>
                    <input
                      type="text"
                      required
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="e.g. Traditional Handwoven Dress"
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productNameAmLabel} *</label>
                    <input
                      type="text"
                      required
                      value={nameAm}
                      onChange={(e) => setNameAm(e.target.value)}
                      placeholder="ምሳሌ፦ የሀር ባህላዊ የሀበሻ ቀሚስ"
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Details Textareas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productDescEnLabel}</label>
                    <textarea
                      rows={3}
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      placeholder="Enter premium product details brand values in English..."
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productDescAmLabel}</label>
                    <textarea
                      rows={3}
                      value={descriptionAm}
                      onChange={(e) => setDescriptionAm(e.target.value)}
                      placeholder="ዋና እሴቶችን፣ አሰራርና የሚጎሉ ዝርዝሮቹን በአማርኛ ይግለጹ..."
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Selling Price and Stocks matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productPriceLabel} (ETB) *</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={priceEtb}
                      onChange={(e) => setPriceEtb(Number(e.target.value))}
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productStockLabel} *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productCategoryLabel} *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-semibold text-stone-700 bg-white"
                    >
                      <option value="clothing">clothing (አልባሳት)</option>
                      <option value="coffee">coffee (ቡና)</option>
                      <option value="spices">spices (ቅመማ ቅመም)</option>
                      <option value="crafts">crafts (የእጅ ስራዎች)</option>
                    </select>
                  </div>
                </div>

                {/* Product Image URL Input */}
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{t.productImageLabel}</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-sm border border-stone-200 p-2.5 rounded-xl focus:border-emerald-600 focus:outline-none font-mono"
                  />
                  {image && (
                    <div className="mt-2.5 p-1 border border-stone-100 rounded-xl max-w-[120px]">
                      <img src={image} alt="Preview thumbnail" className="w-full h-16 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                {/* Boolean Featured Star Switch */}
                <div className="flex items-center gap-2 border-t border-stone-100 pt-4">
                  <input
                    type="checkbox"
                    id="popular-flag-box"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="w-4.5 h-4.5 accent-emerald-700 rounded cursor-pointer"
                  />
                  <label htmlFor="popular-flag-box" className="text-xs font-bold text-stone-700 cursor-pointer select-none uppercase tracking-wider">
                    {currentLang === 'en' ? "Promote this item as a special featured curation" : "ይህን እቃ በዋናው ገጽ ላይ በክብር ምርጦች ስር አድምቀው ያሳዩት"}
                  </label>
                </div>

                {/* Form submit buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm font-bold hover:bg-stone-50 transition"
                  >
                    {t.cancelingOrder}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-950 text-white text-sm font-extrabold transition shadow-md"
                  >
                    {t.saveProductButton}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
