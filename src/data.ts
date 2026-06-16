import { Product, Language } from "./types";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    logoTitle: "Gebeya Modern",
    tagline: "Premium Modern Ethiopian Marketplace",
    heroHeading: "Discover Authentic Ethiopian Heritage",
    heroSubheading: "Explore hand-woven Habesha couture, high-altitude organic coffees, premium spices, and beautiful home crafts directly from Ethiopian artisans.",
    heroCta: "Shop Collection",
    heroSecondary: "Learn More",
    searchPlaceholder: "Search genuine Ethiopian goods...",
    allCategories: "All Products",
    cat_clothing: "Habesha Couture",
    cat_coffee: "Organic Coffee",
    cat_spices: "Authentic Spices",
    cat_crafts: "Artisanal Crafts",
    popularProducts: "Popular Items",
    popularSubtitle: "Handpicked premium selections highly rated by our local and global community",
    priceUnit: "ETB",
    stockText: "In Stock",
    outOfStock: "Sold Out",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    productDetails: "Product Details",
    reviewsTitle: "Artisan & Buyer Reviews",
    noReviews: "No reviews yet. Be the first to express your thoughts!",
    ratingOutOf: "out of 5",
    sizesText: "Available Sizes",
    specsText: "Specifications",
    originText: "Origin",
    ethiopia: "Ethiopia",
    artisanalGuaranteed: "Artisanal Authenticity Guaranteed",
    artisanalDesc: "Every piece has a story. Handcrafted with traditional skills passed down through generations.",
    
    // Cart Sidebar
    cartTitle: "Your Shopping Bag",
    cartEmpty: "Your cart is empty. Explore our collection to add authentic pieces!",
    cartSubtotal: "Subtotal",
    deliveryFee: "Delivery Speed",
    standardDelivery: "Standard Delivery (Addis Ababa)",
    expressDelivery: "Express Courier Service",
    cartTotal: "Grand Total",
    checkoutButton: "Proceed to Secure Checkout",
    checkoutTitle: "Complete Your Purchase",
    
    // Checkout Forms
    fullNameLabel: "Full Name (as on Bank/ID)",
    phoneLabel: "Mobile Phone Number",
    phonePlaceholder: "e.g., 0912345678",
    deliveryAddressLabel: "Delivery Address in Ethiopia",
    addressPlaceholder: "Sub-city, Woreda, House No. / Landmark in Addis Ababa",
    paymentMethodLabel: "Select Payment Gateway",
    placeOrderButton: "Pay Now via SECURE GATEWAY",
    cancelingOrder: "Cancel",
    telebirrDesc: "Fast checkout using Telebirr App (E-Money)",
    chapaDesc: "Credit Card & Local Debit Card processing via Chapa",
    cbeDesc: "Direct transfer or CBE Birr via Commercial Bank of Ethiopia",
    cashDesc: "Pay at delivery within Addis Ababa",
    orderSuccessHero: "Melkam Melikite! (Order Placed!)",
    orderSuccessDesc: "Your order has been registered securely. We will contact you shortly on your phone at",
    closeButton: "Close",

    // Admin Panel
    adminDashboardTitle: "Gebeya Modern Admin Operations",
    adminDashboardDesc: "Real-time overview of merchant sales, product metrics, and checkout audits.",
    backToStore: "View Storefront",
    salesPeriod: "Last 7 Days Ledger",
    totalRevenue: "Gross Revenue",
    totalOrders: "Funnels Completed",
    averageOrder: "AOV (Average Order Value)",
    activeInventory: "Active Listings",
    recentOrders: "Recent Orders Register",
    customerHeader: "Customer / Contact",
    itemsHeader: "Items Purchased",
    paymentHeader: "Payment Mode",
    statusHeader: "Logistics Status",
    actionHeader: "Actions",
    addProductTitle: "Register New Product",
    editProductTitle: "Edit Product Details",
    productNameEnLabel: "Product Name (English)",
    productNameAmLabel: "Product Name (Amharic)",
    productDescEnLabel: "Detailed Description (English)",
    productDescAmLabel: "Detailed Description (Amharic)",
    productPriceLabel: "Selling Price (ETB)",
    productCategoryLabel: "Category Group",
    productImageLabel: "Product Image URL",
    productStockLabel: "Available Base Inventory",
    saveProductButton: "Commit to Ledger",
    recentReviewsLabel: "Recent Reviews Feed",
    emptyOrdersAdmin: "No order registers recorded yet in this session.",
    editButton: "Edit",
    deleteButton: "Delete",
    addNewProductButton: "Add Unique Item"
  },
  am: {
    logoTitle: "ገበያ ሞደርን",
    tagline: "ዘመናዊ የኢትዮጵያ ፕሪሚየም መገበያያ ገበያ",
    heroHeading: "እውነተኛ የኢትዮጵያ ባህላዊ ቅርሶችን ይግዙ",
    heroSubheading: "በእጅ የተሰፉ የሀበሻ አልባሳት፣ እጅግ ምርጥ የተራራ ጫፍ ኦርጋኒክ ቡናዎች፣ ባህላዊ ቅመማ ቅመሞች እና ውብ የቤት እቃዎች በቀጥታ ከኢትዮጵያውያን ባለሙያዎች ያግኙ።",
    heroCta: "ምርቶችን ይመልከቱ",
    heroSecondary: "ተጨማሪ እወቅ",
    searchPlaceholder: "እውነተኛ ባህላዊ ምርቶችን እዚህ ይፈልጉ...",
    allCategories: "ሁሉንም ምርቶች",
    cat_clothing: "የሀበሻ አልባሳት",
    cat_coffee: "ኦርጋኒክ ቡና",
    cat_spices: "የቅመማ ቅመሞች",
    cat_crafts: "የእጅ ስራዎች",
    popularProducts: "ተወዳጅ ዕቃዎች",
    popularSubtitle: "በአካባቢው እና በዓለም አቀፍ ማህበረሰባችን ከፍተኛ ግምት የተሰጣቸው ምርጥ ምርጫዎች",
    priceUnit: "ብር (ETB)",
    stockText: "በክምችት ላይ አለ",
    outOfStock: "ያለቀ",
    addToCart: "ወደ መገበያያ ቦርሳ ጨምር",
    buyNow: "አሁን ግዛ",
    productDetails: "የምርት ዝርዝሮች",
    reviewsTitle: "የደንበኞች አስተያየት እና ምዘና",
    noReviews: "እስካሁን ምንም አስተያየት አልተሰጠም። የመጀመሪያው አስተያየት ሰጪ ይሁኑ!",
    ratingOutOf: "ከ 5 ኮከብ",
    sizesText: "የሚገኙ መጠኖች",
    specsText: "መገለጫዎች",
    originText: "የትውልድ ቦታ",
    ethiopia: "ኢትዮጵያ",
    artisanalGuaranteed: "እውነተኛ የእጅ ጥበብ ዋስትና ተሰጥቶታል",
    artisanalDesc: "እያንዳንዱ ምርት የራሱ ታሪክ አለው። ከትውልድ ወደ ትውልድ በተላለፈው ባህላዊ ክህሎት የተሰሩ ትክክለኛ ምርቶች።",
    
    // Cart Sidebar
    cartTitle: "የመገበያያ ቦርሳዎ",
    cartEmpty: "የመገበያያ ቦርሳዎ ባዶ ነው። ምርጥ እቃዎችን ለመጨመር ስብስቦቻችንን ይጎብኙ!",
    cartSubtotal: "ከርዕሰ-ድምር",
    deliveryFee: "የማድረሻ ፍጥነት",
    standardDelivery: "መደበኛ ማድረሻ (አዲስ አበባ)",
    expressDelivery: "ፈጣን የፖስታ ማድረሻ አገልግሎት",
    cartTotal: "ጠቅላላ ሂሳብ",
    checkoutButton: "በአስተማማኝ ሁኔታ ለመክፈል ይሂዱ",
    checkoutTitle: "ትዕዛዝዎን ያጠናቅቁ",
    
    // Checkout Forms
    fullNameLabel: "முሉ ስም (በባንክ/በመታወቂያ)",
    phoneLabel: "የስልክ ቁጥር",
    phonePlaceholder: "ምሳሌ፦ 0912345678",
    deliveryAddressLabel: "የማድረሻ አድራሻ (ኢትዮጵያ)",
    addressPlaceholder: "ክፍለ ከተማ፣ ወረዳ፣ የቤት ቁጥር / አቅራቢያ የሚገኝ ታዋቂ ምልክት በአዲስ አበባ",
    paymentMethodLabel: "የክፍያ አማራጭ ይምረጡ",
    placeOrderButton: "አሁን ክፍያውን በደህንነት ይፈጽሙ",
    cancelingOrder: "ሰርዝ",
    telebirrDesc: "በቴሌብር መተግበሪያ (Telebirr) ፈጣን ክፍያ",
    chapaDesc: "በቻፓ (Chapa) በክሬዲት / ዴቢት ካርድ መክፈያ",
    cbeDesc: "በኢትዮጵያ ንግድ ባንክ (CBE Birr / Bank) ቀጥታ ማስተላለፊያ",
    cashDesc: "እቃው ሲደርስ በአዲስ አበባ ውስጥ በጥሬ ገንዘብ መክፈል",
    orderSuccessHero: "መልካም መልእክት! (ትዕዛዝዎ በተሳካ ሁኔታ ተቀምጧል!)",
    orderSuccessDesc: "ትዕዛዝዎ ደህንነቱ በተጠበቀ ሁኔታ ተመዝግቧል። በስልክ ቁጥርዎ በቅርቡ እናገኝዎታለን፦ ",
    closeButton: "ዝጋ",

    // Admin Panel
    adminDashboardTitle: "የገበያ ሞደርን አስተዳደር ሰሌዳ",
    adminDashboardDesc: "የሻጮች ሽያጭ፣ የምርት መለኪያዎች እና የከተማ ትዕዛዞች አጠቃላይ ክትትል በቅጽበት።",
    backToStore: "ወደ መደብሩ ይመለሱ",
    salesPeriod: "ያለፉት 7 ቀናት የሽያጭ መዝገብ",
    totalRevenue: "ጠቅላላ የሽያጭ መጠን",
    totalOrders: "አጠቃላይ ትዕዛዞች",
    averageOrder: "አማካይ የትዕዛዝ ዋጋ (AOV)",
    activeInventory: "በሽያጭ ላይ ያሉ እቃዎች",
    recentOrders: "የቅርብ ጊዜ ትዕዛዞች መዝገብ",
    customerHeader: "ደንበኛ / አድራሻ",
    itemsHeader: "የተገዙ ዕቃዎች",
    paymentHeader: "የክፍያ አማራጭ",
    statusHeader: "የማጓጓዝ ደረጃ",
    actionHeader: "ድርጊቶች",
    addProductTitle: "አዲስ ምርት መዝግብ",
    editProductTitle: "የምርት መረጃን ያሻሽሉ",
    productNameEnLabel: "የምርት ስም (በእንግሊዝኛ)",
    productNameAmLabel: "የምርት ስም (በአማርኛ)",
    productDescEnLabel: "ዝርዝር ማብራሪያ (በእንግሊዝኛ)",
    productDescAmLabel: "ዝርዝር ማብራሪያ (በአማርኛ)",
    productPriceLabel: "የመሸጫ ዋጋ (በብር)",
    productCategoryLabel: "የምርት ምድብ",
    productImageLabel: "የምርት ምስል URL",
    productStockLabel: "የክምችት መጠን",
    saveProductButton: "በመዝገብ ላይ አኑር",
    recentReviewsLabel: "የቅርብ ጊዜ ደንበኛ አስተያየቶች",
    emptyOrdersAdmin: "በዚህ የስራ ክፍለ ጊዜ እስካሁን ምንም ትዕዛዞች አልተመዘገቡም።",
    editButton: "አስተካክል",
    deleteButton: "ሰርዝ",
    addNewProductButton: "አዲስ እቃ ጨምር"
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "h-dress-1",
    nameEn: "Royal Hand-Woven Habesha Kemis",
    nameAm: "የንግስት እጅ ጥልፍ የሀበሻ ቀሚስ",
    priceEtb: 15500,
    descriptionEn: "Masterpiece pure Ethiopian hand-spun cotton. Intricate shimmering gold and green tilf patterns embroidered carefully along the neckline, body, and wrist lines. Perfect for formal weddings and beautiful traditional events.",
    descriptionAm: "በጥራት የተፈተለ የሀበሻ ጥጥ እጅግ ውብ ጥልፍ። በአንገት፣ በሰውነት እና በእጅ አንጓዎች ላይ በጥንቃቄ የተሰፉ የወርቅማ እና የአረንጓዴ ቀለም አስደናቂ ጥልፎች። ለሠርግ እና ለትልቅ ባህላዊ በዓላት ተመራጭ።",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    category: "clothing",
    rating: 4.9,
    stock: 8,
    isPopular: true,
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      {
        id: "r1",
        userName: "Selamawit Kebede",
        commentEn: "Absolutely drop dead gorgeous dress! The gold tilf shines incredibly under light. Perfectly tailored fitting.",
        commentAm: "በጣም እጅግ ውብ የሆነ አስደናቂ ቀሚስ ነው! ወርቃማው ጥልፍ በብርሃን ላይ አስገራሚ ደምቀት አለው። ስፌቱ ልክ ልኬ ነው።",
        rating: 5,
        date: "2026-05-12"
      },
      {
        id: "r2",
        userName: "Helen Bekele",
        commentEn: "Breathable fabric, felt like royalty wearing this to my brother's wedding in Addis. Generous packing casing too.",
        commentAm: "ለሰውነት ምቹ የሆነ ቀጭን የጥጥ ጨርቅ፣ በአዲስ አበባ ወንድሜ ሰርግ ላይ ስለብሰው እንደ ንግስት ነው የተሰማኝ። የመጣበትም ሳጥን ቆንጆ ነው።",
        rating: 5,
        date: "2026-06-02"
      }
    ]
  },
  {
    id: "h-kaba-2",
    nameEn: "Royal Velvet Ceremonial Kaba",
    nameAm: "የንጉሳዊ المخمل የክብር ካባ",
    priceEtb: 19800,
    descriptionEn: "Highly luxury ceremonial royal black velvet cape trimmed inside with premium satin lining. Rich, thick gold threat embroidery patterns showcasing the beautiful cultural lions of Judah and intricate floral textures of high prestige.",
    descriptionAm: "ለየት ያለ ውበት ያለው የክብር ንጉሳዊ ጥቁር ካባ ከሐር ጨርቅ የውስጥ ሽፋን ጋር። ከፍተኛ ግርማ ያለው የይሁዳ አንበሳ ምስል እና በእጅ የተጠለፉ የወርቅ ክሮች የአበባ ቅንብሮች የተካተቱበት።",
    image: "https://images.unsplash.com/photo-1518375475309-c5c56d11de49?auto=format&fit=crop&q=80&w=600",
    category: "clothing",
    rating: 4.8,
    stock: 5,
    sizes: ["M", "L", "XL"],
    reviews: [
      {
        id: "r3",
        userName: "Yonas Mengistu",
        commentEn: "Wore this for our traditional ceremony. Highly detailed velvet and premium grade heavy thread, felt extremely special.",
        commentAm: "ይህንን ለባህላዊ የጋብቻ ስርዓታችን ለብሼዋለሁ። በጣም ጥራት ያለው የቬልቬት ጨርቅ እና የከባድ ወርቅ ክር ስፌት፣ እጅግ ኩራት እንዲሰማኝ አድርጓል።",
        rating: 5,
        date: "2026-04-10"
      }
    ]
  },
  {
    id: "coffee-yirg-1",
    nameEn: "Single-Origin Organic Yirgacheffe (500g)",
    nameAm: "የይርጋጨፌ ኦርጋኒክ ጥሬ ቡና (500ግ)",
    priceEtb: 850,
    descriptionEn: "Fragrant organic Arabica grown in the high mountains of Yirgacheffe, Southern region. Naturally washed with sweet notes of citrus orange blossom, elegant jasmine perfume, and a crisp clean finish. Freshly dark-medium roasted weekly.",
    descriptionAm: "በደቡባዊቷ ይርጋጨፌ ረጅምና ቀዝቃዛ ተራሮች ላይ የበቀለ እጅግ ጥሩ መዓዛ ያለው ኦርጋኒክ አረቢካ ቡና። የሎሚ አበባ ጣፋጭ ጣዕም፣ የጃስሚን ሽታ እና ግሩም የሆነ ጣዕሙን የሚጠብቅ። በየሳምንቱ አዲስ የሚቆላ።",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    category: "coffee",
    rating: 5.0,
    stock: 45,
    isPopular: true,
    reviews: [
      {
        id: "rc1",
        userName: "Daniel Abera",
        commentEn: "Unbelievable aroma! My kitchen smells like paradise every morning now. True Ethiopian single-origin flavor profile.",
        commentAm: "በጣም አስገራሚ መዓዛ እና ሽታ! በየማለዳው ማእድ ቤቴን እንደ ገነት ያሸተዋል። ትክክለኛው የሀገር ቡና ጣዕም እዚህ ጋር ነው።",
        rating: 5,
        date: "2026-06-11"
      }
    ]
  },
  {
    id: "coffee-sid-2",
    nameEn: "Premium Sun-Dried Sidama Reserve (500g)",
    nameAm: "በፀሐይ የደረቀ የሲዳማ ምርጥ ቡና (500ግ)",
    priceEtb: 920,
    descriptionEn: "Exceptional specialty coffee bean from Sidama. Sun-dried on custom high platforms, bringing out a remarkably thick body showing rich sweet red cherry, blueberry juice, and deep smooth cocoa finishing accents.",
    descriptionAm: "በሲዳማ ከፍተኛ አምራች ወረዳዎች የተመረጠ እጅግ ልዩ የቡና ፍሬ። ትኩስነቱን ጠብቆ በፀሐይ የደረቀ፣ ደማቅ የቀይ ቼሪ፣ የሰማያዊ ብሉቤሪ እና የቸኮሌት ጣዕምና መዓዛ የተላበሰ።",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    category: "coffee",
    rating: 4.7,
    stock: 30,
    reviews: []
  },
  {
    id: "spice-berbere-1",
    nameEn: "Artisanal Hand-Blended Royal Berbere (500g)",
    nameAm: "በእጅ የተዘጋጀ የንጉሳዊ በርበሬ ቅመም (500ግ)",
    priceEtb: 480,
    descriptionEn: "Highly layered spice mix crafted with dry red chilies, mountain sacred basil (Zigni), garlic, rue (Tena Adam), ginger, and wild cardamom. Hand-ground by expert mothers in Addis Ababa for a authentic deep rich red stew (Doro Wat flavor).",
    descriptionAm: "ደረቅ ቀይ ቃሪያ፣ ዘቃቅቤ፣ Tena Adam (ጤና አዳም)፣ ነጭ ሽንኩርት፣ ዝንጅብል እና ኮረሪማን በመጠቀም የተዘጋጀ ድንቅ በርበሬ። ለአዲስ አበባው ተወዳጅ የዶሮ ወጥ በባለሙያ እናቶች በእጅ የተዘጋጀ ተወዳጅ ቅመም።",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    category: "spices",
    rating: 4.9,
    stock: 60,
    isPopular: true,
    reviews: [
      {
        id: "rs1",
        userName: "Marta Haile",
        commentEn: "The color is beautifully vibrant and the touch of wild cardamom makes this my favorite. Finally, real berbere with authentic strength!",
        commentAm: "ቁመናው ቀይና ደማቅ ነው፤ የተፈጥሮው የኮረሪማ መዓዛ ልዩ ያደርገዋል። በመጨረሻም ትክክለኛውን የሀገሬ ባህላዊ የበርበሬ ጣዕም አገኘሁ!",
        rating: 5,
        date: "2026-05-25"
      }
    ]
  },
  {
    id: "spice-shiro-2",
    nameEn: "Spiced Chickpea Shiro Powder (500g)",
    nameAm: "የተቀመመ የሽንብራ ሽሮ ዱቄት (500ግ)",
    priceEtb: 390,
    descriptionEn: "Porous split chickpeas slowly sun-roasted, milled with carefully balanced dry onion flakes, red pepper garlic paste, ginger, coriander, holy basil, and fine sea salts. Velvety smooth cook, highly nutritious and deeply satisfying.",
    descriptionAm: "በጸሀይ የደረቀ ሽንብራ ተቆልቶ፣ ከሽንኩርት፣ ነጭ ሽንኩርት፣ ዝንጅብል፣ ድንብላል እና ጤና አዳም ቅመሞች ጋር የተፈጨ። ወደ ወጥ ሲቀየር እጅግ የሚያስጎመጅ እና የሚጣፍጥ የሀበሻ ሽሮ ዱቄት።",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    category: "spices",
    rating: 4.6,
    stock: 50,
    reviews: []
  },
  {
    id: "craft-jebena-1",
    nameEn: "Artisanal Clay Coffee Jebena",
    nameAm: "የሸክላ ባህላዊ ጀበና በእጅ የተሰራ",
    priceEtb: 1950,
    descriptionEn: "A traditional black clay boiling pot crafted by master potters of Gojjam. Styled with a slender curved pouring neck, circular handle, and delicate hand-carved floral patterns on the spherical base. Essential for authentic Ethiopian coffee ceremonies.",
    descriptionAm: "በጎጃም የሸክላ ባለሙያዎች በእጅ በጥበብ የተሰራ ባህላዊ የጥቁር ሸክላ ጀበና። ቀጠን ያለ ረጅም አንገት ያለው፣ ክብ እጀታ እና ውብ የአበባ ቅርጾች በክቡ አካል ላይ የተቀረጹበት። እውነተኛ የቡና ስርዓትን ለማካሄድ አስፈላጊ እቃ።",
    image: "https://images.unsplash.com/photo-1572111504021-40afd4d6190a?auto=format&fit=crop&q=80&w=600",
    category: "crafts",
    rating: 4.9,
    stock: 12,
    isPopular: true,
    reviews: [
      {
        id: "rcr1",
        userName: "Fitsum Takele",
        commentEn: "Outstanding craft. Retains heat perfectly, brews coffee with that authentic smoke-infused flavor profile we love. A gorgeous living room centerpiece.",
        commentAm: "በጣም ድንቅ የእጅ ስራ ነው። ሙቀት በደንብ ይይዛል፣ ቡናውን እኛ እንደምንወደው በእውነተኛው የእንጨት ካሪዝማ ያፈላዋል። ሳሎኔን ያደመቀ እቃ።",
        rating: 5,
        date: "2026-05-30"
      }
    ]
  },
  {
    id: "craft-mesob-2",
    nameEn: "Hand-Woven Royal Mesob Basket",
    nameAm: "ባህላዊ የሀበሻ መሶብ ወርቅ",
    priceEtb: 4800,
    descriptionEn: "Classic vibrant dome-lidded dining basket hand-crafted with local harra grass coiled snugly with dyed fibers. Showcases striking concentric geometric diamond designs. Built with highly durable, natural non-toxic traditional methods.",
    descriptionAm: "በሀረር እጽዋት እና በቀለማት በጥንቃቄ በእጅ የተጠነሰሰ የማዕድ መሶብ። ድንቅ የጂኦሜትሪክ የአልማዝ ቅርጾች ማሳያ። ለትውልድ የሚቆይ ጠንካራ እና የተፈጥሮ ዘዴዎችን ብቻ በመጠቀም የተሰፋ።",
    image: "https://images.unsplash.com/photo-1536337005238-9102b164ecbb?auto=format&fit=crop&q=80&w=600",
    category: "crafts",
    rating: 4.8,
    stock: 4,
    reviews: [
      {
        id: "rcr2",
        userName: "Hiwot Tesfaye",
        commentEn: "Spectacular work! The colors are so bright and cheerful. Highly recommend to anyone looking to add true culture to their home.",
        commentAm: "ግሩም ጥበብ ነው! ቀለማቱ በጣም ደማቅና ሳቢ ናቸው። ቤታቸው ውስጥ እውነተኛ ባህልና ውበት ማኖር ለሚሻ ሁሉ እመክራለሁ።",
        rating: 5,
        date: "2026-06-08"
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: "GB-0932",
    customerName: "Leul Solomon",
    phoneNumber: "0911543210",
    address: "Bole Medhanialem, Ward 2, Addis Ababa",
    items: [
      {
        productId: "coffee-yirg-1",
        productNameEn: "Single-Origin Organic Yirgacheffe (500g)",
        productNameAm: "የይርጋጨፌ ኦርጋኒክ ጥሬ ቡና (500ግ)",
        quantity: 2,
        price: 850
      },
      {
        productId: "craft-jebena-1",
        productNameEn: "Artisanal Clay Coffee Jebena",
        productNameAm: "የሸክላ ባህላዊ ጀበና በእጅ የተሰራ",
        quantity: 1,
        price: 1950
      }
    ],
    paymentMethod: "telebirr" as const,
    paymentStatus: "completed" as const,
    total: 3650,
    status: "delivered" as const,
    date: "2026-06-15"
  },
  {
    id: "GB-0933",
    customerName: "Genet Alemayehu",
    phoneNumber: "0912112233",
    address: "Kazanchis, behind Intercontinental Hotel, Addis Ababa",
    items: [
      {
        productId: "h-dress-1",
        productNameEn: "Royal Hand-Woven Habesha Kemis",
        productNameAm: "የንግስት እጅ ጥልፍ የሀበሻ ቀሚስ",
        quantity: 1,
        price: 15500,
        selectedSize: "M"
      }
    ],
    paymentMethod: "chapa" as const,
    paymentStatus: "completed" as const,
    total: 15500,
    status: "processing" as const,
    date: "2026-06-16"
  },
  {
    id: "GB-0934",
    customerName: "Kebede Mulatu",
    phoneNumber: "0915667788",
    address: "Sarbet area, near South Africa Embassy, Addis Ababa",
    items: [
      {
        productId: "spice-berbere-1",
        productNameEn: "Artisanal Hand-Blended Royal Berbere (500g)",
        productNameAm: "በእጅ የተዘጋጀ የንጉሳዊ በርበሬ ቅመም (500ግ)",
        quantity: 3,
        price: 480
      }
    ],
    paymentMethod: "cbe" as const,
    paymentStatus: "pending" as const,
    total: 1440,
    status: "pending" as const,
    date: "2026-06-16"
  }
];
