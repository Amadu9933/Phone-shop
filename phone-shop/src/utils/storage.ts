import type { CartItem, Order, Review, Product } from "../data/types";
import { products as initialProducts } from "../data/products";

const CART_KEY = "phone_shop_cart";
const ORDERS_KEY = "phone_shop_orders";
const REVIEWS_KEY = "phone_shop_reviews";
const PRODUCTS_KEY = "phone_shop_products";
const STORAGE_VERSION_KEY = "phone_shop_version";
const STORAGE_VERSION = 2;

// Safe storage wrapper with quota management
const safeSet = (key: string, data: unknown): boolean => {
  try {
    const payload = JSON.stringify(data);
    localStorage.setItem(key, payload);
    return true;
  } catch (e) {
    if (e instanceof Error && e.name === "QuotaExceededError") {
      // Auto-cleanup old orders (keep last 30 days)
      const orders = storage.getOrders();
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const filtered = orders.filter(
        (o: any) => new Date(o.createdAt).getTime() > thirtyDaysAgo,
      );
      localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));

      // Try again
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch {
        console.error("Storage quota exceeded even after cleanup");
        return false;
      }
    }
    console.error("Storage error:", e);
    return false;
  }
};

const safeGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const storage: {
  getVersion: () => number;
  setVersion: () => void;
  getCart: () => CartItem[];
  saveCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => CartItem[];
  removeFromCart: (itemId: string) => CartItem[];
  clearCart: () => void;
  getOrders: () => Order[];
  saveOrder: (order: Order) => Order;
  clearOrders: () => void;
  getOrdersByStatus: (status: Order["status"]) => Order[];
  getRecentOrders: (days?: number) => Order[];
  getProducts: () => Product[];
  saveProducts: (products: Product[]) => void;
  addProduct: (product: Product) => Product[];
  updateProduct: (id: string, updatedProduct: Partial<Product>) => Product[];
  deleteProduct: (id: string) => Product[];
  getReviews: () => Review[];
  saveReview: (review: Review) => Review[];
  getReviewsByProduct: (productId: string) => Review[];
  exportAllData: () => any;
  importData: (data: any) => boolean;
  clearAllData: () => void;
} = {
  // Version management
  getVersion: (): number => {
    const version = safeGet(STORAGE_VERSION_KEY);
    return version ? parseInt(version) : 0;
  },

  setVersion: (): void => {
    safeSet(STORAGE_VERSION_KEY, STORAGE_VERSION);
  },
  // Cart operations
  getCart: (): CartItem[] => {
    try {
      const cart = safeGet(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  },

  saveCart: (cart: CartItem[]): void => {
    safeSet(CART_KEY, cart);
  },

  addToCart: (item: CartItem): CartItem[] => {
    const cart = storage.getCart();
    const existingItem = cart.find((ci: CartItem) => ci.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    storage.saveCart(cart);
    return cart;
  },

  removeFromCart: (itemId: string): CartItem[] => {
    const cart = storage
      .getCart()
      .filter((item: CartItem) => item.id !== itemId);
    storage.saveCart(cart);
    return cart;
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
  },

  // Orders operations
  getOrders: (): Order[] => {
    try {
      const orders = safeGet(ORDERS_KEY);
      return orders ? JSON.parse(orders) : [];
    } catch {
      return [];
    }
  },

  saveOrder: (order: Order): Order => {
    const orders = storage.getOrders();
    orders.push(order);
    safeSet(ORDERS_KEY, orders);
    return order;
  },

  clearOrders: (): void => {
    localStorage.removeItem(ORDERS_KEY);
  },

  // Orders filtering
  getOrdersByStatus: (status: Order["status"]): Order[] => {
    return storage.getOrders().filter((o: any) => o.status === status);
  },

  getRecentOrders: (days: number = 30): Order[] => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return storage
      .getOrders()
      .filter((o: any) => new Date(o.createdAt).getTime() > cutoff);
  },

  // Products operations
  getProducts: (): Product[] => {
    try {
      const products = safeGet(PRODUCTS_KEY);
      return products ? JSON.parse(products) : initialProducts;
    } catch {
      return initialProducts;
    }
  },

  saveProducts: (products: Product[]): void => {
    safeSet(PRODUCTS_KEY, products);
  },

  addProduct: (product: Product): Product[] => {
    const products = storage.getProducts();
    products.push(product);
    storage.saveProducts(products);
    return products;
  },

  updateProduct: (id: string, updatedProduct: Partial<Product>): Product[] => {
    const products = storage.getProducts();
    const index = products.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      storage.saveProducts(products);
    }
    return products;
  },

  deleteProduct: (id: string): Product[] => {
    const products = storage.getProducts().filter((p: any) => p.id !== id);
    storage.saveProducts(products);
    return products;
  },

  // Reviews operations
  getReviews: (): Review[] => {
    try {
      const reviews = safeGet(REVIEWS_KEY);
      return reviews ? JSON.parse(reviews) : [];
    } catch {
      return [];
    }
  },

  saveReview: (review: Review): Review[] => {
    const reviews = storage.getReviews();
    reviews.push(review);
    safeSet(REVIEWS_KEY, reviews);
    return reviews;
  },

  getReviewsByProduct: (productId: string): Review[] => {
    return storage.getReviews().filter((r: any) => r.productId === productId);
  },

  // Data export/import
  exportAllData: () => {
    return {
      version: STORAGE_VERSION,
      cart: storage.getCart(),
      orders: storage.getOrders(),
      products: storage.getProducts(),
      reviews: storage.getReviews(),
      exportedAt: new Date().toISOString(),
    };
  },

  importData: (data: ReturnType<typeof storage.exportAllData>): boolean => {
    try {
      if (data.version !== STORAGE_VERSION) {
        console.warn("Storage version mismatch");
      }
      storage.saveCart(data.cart);
      safeSet(ORDERS_KEY, data.orders);
      storage.saveProducts(data.products);
      safeSet(REVIEWS_KEY, data.reviews);
      storage.setVersion();
      return true;
    } catch {
      return false;
    }
  },

  // Cleanup
  clearAllData: (): void => {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(REVIEWS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
  },
};
