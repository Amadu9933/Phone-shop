import type { Product } from "./types";
import iphone15Image from "../assets/iphone15.png";
import iphone16Image from "../assets/iphone16.png";

export const products: Product[] = [
  // ── Phones ──────────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "iPhone 15 Pro",
    category: "phone",
    price: 4500,
    image: iphone15Image,
    availability: "in-stock",
    description:
      "Apple's most powerful iPhone with the A17 Pro chip, titanium design, and pro camera system.",
    specs: [
      '6.1" Super Retina XDR',
      "256GB",
      "48MP triple camera",
      "5G",
      "USB-C",
    ],
  },
  {
    id: "2",
    name: "iPhone 14",
    category: "phone",
    price: 3600,
    image: iphone16Image,
    availability: "in-stock",
    description:
      "No faulty parts and warranty is assured iPhone with advanced dual-camera system and all-day battery life.",
    specs: ["Uk used", "128GB", "battery health: 85%", "True Tone", "Face ID"],
  },
  {
    id: "3",
    name: "Samsung Galaxy S24",
    category: "phone",
    price: 4200,
    image: "",
    availability: "in-stock",
    description:
      "Samsung's flagship with Galaxy AI, Snapdragon 8 Gen 3, and a stunning AMOLED display.",
    specs: [
      '6.2" Dynamic AMOLED',
      "256GB",
      "50MP triple camera",
      "Galaxy AI",
      "5G",
    ],
  },
  {
    id: "4",
    name: "Samsung Galaxy A54",
    category: "phone",
    price: 2100,
    image: "",
    availability: "in-stock",
    description:
      "Mid-range powerhouse with a stunning 120Hz display and 5000mAh battery.",
    specs: [
      '6.4" Super AMOLED 120Hz',
      "128GB",
      "50MP OIS camera",
      "5000mAh",
      "5G",
    ],
  },
  {
    id: "5",
    name: "Tecno Spark 20 Pro",
    category: "phone",
    price: 1200,
    image: "",
    availability: "in-stock",
    description:
      "Sleek and affordable smartphone built for everyday Ghana life with a big battery.",
    specs: [
      '6.67" FHD+ display',
      "256GB",
      "50MP AI camera",
      "5000mAh",
      "4G LTE",
    ],
  },
  {
    id: "6",
    name: "Tecno Camon 20",
    category: "phone",
    price: 1450,
    image: "",
    availability: "in-stock",
    description:
      "Camera-focused phone with RGBW sensor technology for stunning low-light photos.",
    specs: [
      '6.67" AMOLED',
      "256GB",
      "64MP RGBW camera",
      "5000mAh",
      "33W charging",
    ],
  },
  {
    id: "7",
    name: "Infinix Hot 30",
    category: "phone",
    price: 950,
    image: "",
    availability: "low-stock",
    description:
      "Budget-friendly gaming phone with a smooth 90Hz screen and huge battery.",
    specs: [
      '6.78" 90Hz display',
      "128GB",
      "50MP camera",
      "5000mAh",
      "18W charging",
    ],
  },
  {
    id: "8",
    name: "Infinix Note 30",
    category: "phone",
    price: 1350,
    image: "",
    availability: "in-stock",
    description:
      "Flagship-level experience at a mid-range price with 45W fast charging.",
    specs: [
      '6.78" AMOLED 120Hz',
      "256GB",
      "64MP camera",
      "5000mAh",
      "45W fast charge",
    ],
  },
  {
    id: "9",
    name: "Itel P40",
    category: "phone",
    price: 550,
    image: "",
    availability: "in-stock",
    description:
      "Ultra-affordable phone with a massive battery — perfect as a first smartphone.",
    specs: [
      '6.6" display',
      "64GB",
      "8MP camera",
      "6000mAh battery",
      "Dual SIM",
    ],
  },

  // ── Accessories ──────────────────────────────────────────────────────────────
  {
    id: "10",
    name: "USB-C Fast Charging Cable",
    category: "accessory",
    price: 45,
    image: "",
    availability: "in-stock",
    description:
      "Braided nylon USB-C cable with 65W fast charging support and tangle-free design.",
    specs: ["2 metres", "65W fast charge", "Braided nylon", "USB-C to USB-C"],
  },
  {
    id: "11",
    name: "Tempered Glass Screen Protector",
    category: "accessory",
    price: 35,
    image: "",
    availability: "in-stock",
    description:
      "Premium 9H hardness tempered glass with anti-fingerprint and anti-scratch coating.",
    specs: [
      "9H hardness",
      "Anti-fingerprint",
      "Ultra-clear",
      "Easy bubble-free install",
    ],
  },
  {
    id: "12",
    name: "Shockproof Phone Case",
    category: "accessory",
    price: 65,
    image: "",
    availability: "in-stock",
    description:
      "Military-grade drop protection with a slim profile that fits any pocket.",
    specs: [
      "Military-grade drop proof",
      "Slim design",
      "Raised camera edges",
      "Multiple colours",
    ],
  },
  {
    id: "13",
    name: "Wireless Charging Pad",
    category: "accessory",
    price: 120,
    image: "",
    availability: "out-of-stock",
    description:
      "15W Qi-certified wireless charging pad compatible with iPhone and Android.",
    specs: [
      "15W fast wireless",
      "Qi certified",
      "LED indicator",
      "Compatible with all Qi devices",
    ],
  },
  {
    id: "14",
    name: "Bluetooth Earbuds",
    category: "accessory",
    price: 180,
    image: "",
    availability: "in-stock",
    description:
      "True wireless earbuds with active noise cancellation and 24-hour total battery life.",
    specs: [
      "ANC noise cancellation",
      "24hr total battery",
      "IPX4 water resistant",
      "Bluetooth 5.3",
    ],
  },
  {
    id: "15",
    name: "20000mAh Power Bank",
    category: "accessory",
    price: 210,
    image: "",
    availability: "in-stock",
    description:
      "Slim 20000mAh power bank with dual USB-A and USB-C output for all devices.",
    specs: [
      "20000mAh capacity",
      "22.5W fast charge",
      "Dual USB-A + USB-C",
      "LED charge indicator",
    ],
  },
  {
    id: "16",
    name: "Adjustable Phone Stand",
    category: "accessory",
    price: 55,
    image: "",
    availability: "in-stock",
    description:
      "Foldable aluminium desktop stand for hands-free video calls and media viewing.",
    specs: [
      "Adjustable angle",
      "Aluminium alloy",
      "Foldable & portable",
      "Universal fit",
    ],
  },
];
