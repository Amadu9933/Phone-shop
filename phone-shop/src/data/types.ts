export interface Product {
  id: string;
  name: string;
  category: "phone" | "accessory";
  price: number;
  image: string;
  availability: "in-stock" | "low-stock" | "out-of-stock";
  description: string;
  specs?: string[];
  type?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: "whatsapp" | "momo" | "delivery";
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  customerName: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}
