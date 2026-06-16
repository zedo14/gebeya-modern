export type Language = 'en' | 'am';

export interface Product {
  id: string;
  nameEn: string;
  nameAm: string;
  priceEtb: number; // Price in Ethiopian Birr
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  category: Category;
  rating: number;
  stock: number;
  isPopular?: boolean;
  reviews?: Review[];
  sizes?: string[]; // clothing sizes
}

export type Category = 'clothing' | 'coffee' | 'spices' | 'crafts';

export interface Review {
  id: string;
  userName: string;
  commentEn: string;
  commentAm: string;
  rating: number;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  items: {
    productId: string;
    productNameEn: string;
    productNameAm: string;
    quantity: number;
    price: number;
    selectedSize?: string;
  }[];
  paymentMethod: 'telebirr' | 'chapa' | 'cbe' | 'cash';
  paymentStatus: 'pending' | 'completed' | 'failed';
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface SalesStat {
  date: string;
  sales: number;
  orders: number;
}
