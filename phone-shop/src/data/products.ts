import type { Product } from "./types";
import iphone15Image from "../assets/iphone15.png";
import iphone16Image from "../assets/iphone16.png";

export const products: Product[] = [

  // ── iPhones ─────────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "iPhone 15 Pro",
    category: "iphone",
    price: 4500,
    image: iphone15Image,
    availability: "in-stock",
    description:
      "Apple's most powerful iPhone with the A17 Pro chip, titanium design, and pro camera system.",
    specs: ['6.1" Super Retina XDR', "256GB", "48MP triple camera", "5G", "USB-C"],
  },
  {
    id: "2",
    name: "iPhone 14",
    category: "iphone",
    price: 3600,
    image: iphone16Image,
    availability: "in-stock",
    description:
      "UK used, no faulty parts, warranty assured. Advanced dual-camera system and all-day battery life.",
    specs: ["UK used", "128GB", "Battery health: 85%", "True Tone", "Face ID"],
  },
  {
    id: "17",
    name: "iPhone 16 Pro Max",
    category: "iphone",
    price: 9500,
    image: "",
    availability: "in-stock",
    description:
      "The ultimate iPhone with A18 Pro chip, 5× optical zoom, and a titanium build. The largest Pro display ever.",
    specs: ['6.9" Super Retina XDR', "256GB", "48MP Fusion + 5× zoom", "A18 Pro", "USB-C"],
  },
  {
    id: "18",
    name: "iPhone 16 Pro",
    category: "iphone",
    price: 8200,
    image: "",
    availability: "in-stock",
    description:
      "A18 Pro chip with Camera Control button, 4K 120fps video, and a stunning titanium frame.",
    specs: ['6.3" ProMotion OLED', "128GB", "48MP triple camera", "Camera Control", "5G"],
  },
  {
    id: "19",
    name: "iPhone 16",
    category: "iphone",
    price: 6800,
    image: "",
    availability: "in-stock",
    description:
      "A16 Bionic power, Action Button, and Apple Intelligence features packed into a sleek design.",
    specs: ['6.1" OLED', "128GB", "48MP dual camera", "Action Button", "5G"],
  },
  {
    id: "20",
    name: "iPhone 15 Plus",
    category: "iphone",
    price: 5200,
    image: "",
    availability: "in-stock",
    description:
      "The big-screen iPhone 15 with all-day battery life that lasts up to 26 hours of video.",
    specs: ['6.7" Super Retina XDR', "128GB", "48MP dual camera", "Dynamic Island", "USB-C"],
  },
  {
    id: "21",
    name: "iPhone 14 Pro Max",
    category: "iphone",
    price: 5500,
    image: "",
    availability: "in-stock",
    description:
      "Always-On display, 48MP main camera, and Dynamic Island — Apple Pro at its finest.",
    specs: ['6.7" ProMotion OLED', "256GB", "48MP triple camera", "Dynamic Island", "5G"],
  },
  {
    id: "22",
    name: "iPhone 13 Pro",
    category: "iphone",
    price: 4200,
    image: "",
    availability: "in-stock",
    description:
      "ProMotion 120Hz display, macro photography, and 1TB storage option — UK used.",
    specs: ['6.1" ProMotion OLED', "128GB", "12MP triple camera", "120Hz", "Face ID"],
  },
  {
    id: "23",
    name: "iPhone 13",
    category: "iphone",
    price: 3200,
    image: "",
    availability: "in-stock",
    description:
      "A15 Bionic power with Cinematic mode video and an upgraded dual-camera system.",
    specs: ['6.1" OLED', "128GB", "12MP dual camera", "A15 Bionic", "Face ID"],
  },
  {
    id: "24",
    name: "iPhone 12",
    category: "iphone",
    price: 2800,
    image: "",
    availability: "in-stock",
    description:
      "5G-ready iPhone 12 with ceramic shield and OLED Super Retina XDR display. Great value.",
    specs: ['6.1" OLED', "64GB", "12MP dual camera", "5G", "MagSafe"],
  },
  {
    id: "25",
    name: "iPhone SE (2022)",
    category: "iphone",
    price: 2200,
    image: "",
    availability: "low-stock",
    description:
      "Compact powerhouse with A15 Bionic chip and 5G support — the most affordable new iPhone.",
    specs: ['4.7" Retina HD', "64GB", "12MP camera", "5G", "Touch ID"],
  },

  // ── Samsung ──────────────────────────────────────────────────────────────────
  {
    id: "3",
    name: "Samsung Galaxy S24",
    category: "samsung",
    price: 4200,
    image: "",
    availability: "in-stock",
    description:
      "Samsung's flagship with Galaxy AI, Snapdragon 8 Gen 3, and a stunning AMOLED display.",
    specs: ['6.2" Dynamic AMOLED', "256GB", "50MP triple camera", "Galaxy AI", "5G"],
  },
  {
    id: "4",
    name: "Samsung Galaxy A54",
    category: "samsung",
    price: 2100,
    image: "",
    availability: "in-stock",
    description:
      "Mid-range powerhouse with a stunning 120Hz display and 5000mAh battery.",
    specs: ['6.4" Super AMOLED 120Hz', "128GB", "50MP OIS camera", "5000mAh", "5G"],
  },
  {
    id: "26",
    name: "Samsung Galaxy S24 Ultra",
    category: "samsung",
    price: 8500,
    image: "",
    availability: "in-stock",
    description:
      "The pinnacle of Samsung. Built-in S Pen, 200MP camera, and Galaxy AI redefine productivity.",
    specs: ['6.8" Dynamic AMOLED 120Hz', "256GB", "200MP quad camera", "S Pen", "5G"],
  },
  {
    id: "27",
    name: "Samsung Galaxy S24+",
    category: "samsung",
    price: 6500,
    image: "",
    availability: "in-stock",
    description:
      "Bigger screen, bigger battery. The S24+ packs a 4900mAh cell with 45W fast charging.",
    specs: ['6.7" Dynamic AMOLED', "256GB", "50MP triple camera", "4900mAh", "5G"],
  },
  {
    id: "28",
    name: "Samsung Galaxy S23 Ultra",
    category: "samsung",
    price: 7000,
    image: "",
    availability: "in-stock",
    description:
      "200MP camera, built-in S Pen, and the Snapdragon 8 Gen 2 — still a powerhouse today.",
    specs: ['6.8" Dynamic AMOLED 120Hz', "256GB", "200MP quad camera", "S Pen", "Snapdragon 8 Gen 2"],
  },
  {
    id: "29",
    name: "Samsung Galaxy S23",
    category: "samsung",
    price: 4800,
    image: "",
    availability: "in-stock",
    description:
      "Compact flagship design with pro-grade camera and Snapdragon 8 Gen 2 performance.",
    specs: ['6.1" Dynamic AMOLED 120Hz', "128GB", "50MP triple camera", "Snapdragon 8 Gen 2", "5G"],
  },
  {
    id: "30",
    name: "Samsung Galaxy A55",
    category: "samsung",
    price: 2900,
    image: "",
    availability: "in-stock",
    description:
      "Galaxy AI features meet mid-range affordability with a 50MP OIS camera and Gorilla Glass Victus+.",
    specs: ['6.6" Super AMOLED 120Hz', "128GB", "50MP OIS camera", "Gorilla Glass Victus+", "5G"],
  },
  {
    id: "31",
    name: "Samsung Galaxy A35",
    category: "samsung",
    price: 2200,
    image: "",
    availability: "in-stock",
    description:
      "Stylish A-series phone with optical image stabilisation and a 5000mAh long-lasting battery.",
    specs: ['6.6" Super AMOLED 120Hz', "128GB", "50MP OIS camera", "5000mAh", "4G LTE"],
  },
  {
    id: "32",
    name: "Samsung Galaxy Z Fold 5",
    category: "samsung",
    price: 12500,
    image: "",
    availability: "low-stock",
    description:
      "Unfold a whole new world. The Galaxy Z Fold 5 gives you a phone and a tablet in one.",
    specs: ['7.6" Foldable AMOLED', "256GB", "50MP triple camera", "Snapdragon 8 Gen 2", "IPX8"],
  },
  {
    id: "33",
    name: "Samsung Galaxy Z Flip 5",
    category: "samsung",
    price: 7200,
    image: "",
    availability: "in-stock",
    description:
      "Flip phone reinvented. Massive 3.4″ Flex Window lets you control the phone without opening it.",
    specs: ['6.7" AMOLED 120Hz', "256GB", "12MP dual camera", "3.4\" Flex Window", "5G"],
  },
  {
    id: "34",
    name: "Samsung Galaxy M35",
    category: "samsung",
    price: 1700,
    image: "",
    availability: "in-stock",
    description:
      "Budget-friendly Galaxy with a 6000mAh enormous battery and 25W fast charging.",
    specs: ['6.6" Super AMOLED 120Hz', "128GB", "50MP triple camera", "6000mAh", "25W charging"],
  },

  // ── Google Pixel ─────────────────────────────────────────────────────────────
  {
    id: "35",
    name: "Google Pixel 9 Pro XL",
    category: "pixel",
    price: 8800,
    image: "",
    availability: "in-stock",
    description:
      "Google's largest Pixel with the most advanced AI features, a 50MP telephoto, and Google Tensor G4.",
    specs: ['6.8" LTPO OLED', "128GB", "50MP triple camera", "Tensor G4", "7 yrs updates"],
  },
  {
    id: "36",
    name: "Google Pixel 9 Pro",
    category: "pixel",
    price: 7400,
    image: "",
    availability: "in-stock",
    description:
      "Compact flagship with Gemini AI, pro camera system, and the longest software support of any phone.",
    specs: ['6.3" LTPO OLED', "128GB", "50MP triple camera", "Gemini AI", "7 yrs updates"],
  },
  {
    id: "37",
    name: "Google Pixel 9",
    category: "pixel",
    price: 5800,
    image: "",
    availability: "in-stock",
    description:
      "The everyday Pixel. Tensor G4 chip, Magic Eraser, Best Take, and seven years of OS updates.",
    specs: ['6.3" OLED', "128GB", "50MP dual camera", "Tensor G4", "7 yrs updates"],
  },
  {
    id: "38",
    name: "Google Pixel 8 Pro",
    category: "pixel",
    price: 6200,
    image: "",
    availability: "in-stock",
    description:
      "Temperature sensor, Pro camera bar, and Google AI smarts including Audio Magic Eraser.",
    specs: ['6.7" LTPO OLED 120Hz', "128GB", "50MP triple camera", "Tensor G3", "7 yrs updates"],
  },
  {
    id: "39",
    name: "Google Pixel 8",
    category: "pixel",
    price: 4800,
    image: "",
    availability: "in-stock",
    description:
      "Real Tone, Best Take, and Call Screen — powerful Google AI in a compact, beautiful design.",
    specs: ['6.2" OLED 120Hz', "128GB", "50MP dual camera", "Tensor G3", "7 yrs updates"],
  },
  {
    id: "40",
    name: "Google Pixel 7a",
    category: "pixel",
    price: 3200,
    image: "",
    availability: "in-stock",
    description:
      "Best value Pixel. 64MP camera, wireless charging, and flagship Tensor G2 chip — for less.",
    specs: ['6.1" OLED 90Hz', "128GB", "64MP dual camera", "Tensor G2", "Wireless charging"],
  },
  {
    id: "41",
    name: "Google Pixel 7 Pro",
    category: "pixel",
    price: 4500,
    image: "",
    availability: "low-stock",
    description:
      "50MP telephoto with 5× optical zoom and Macro Focus — exceptional photos at every distance.",
    specs: ['6.7" LTPO OLED 120Hz', "128GB", "50MP triple 5× zoom", "Tensor G2", "IP68"],
  },

  // ── Phone Repair & Parts ──────────────────────────────────────────────────────
  {
    id: "42",
    name: "iPhone Screen Replacement (13 / 14)",
    category: "repair",
    price: 450,
    image: "",
    availability: "in-stock",
    description:
      "Professional OLED screen replacement for iPhone 13 and iPhone 14 series. Same-day service available.",
    specs: ["OEM-quality OLED", "Same-day service", "90-day warranty", "Face ID preserved"],
  },
  {
    id: "43",
    name: "iPhone Screen Replacement (15 / 16 Pro)",
    category: "repair",
    price: 850,
    image: "",
    availability: "in-stock",
    description:
      "Genuine-quality ProMotion OLED replacement for iPhone 15 Pro and 16 Pro models.",
    specs: ["ProMotion OLED", "Same-day service", "90-day warranty", "Dynamic Island intact"],
  },
  {
    id: "44",
    name: "Samsung Screen Replacement (S-Series)",
    category: "repair",
    price: 650,
    image: "",
    availability: "in-stock",
    description:
      "Dynamic AMOLED panel replacement for Galaxy S21 through S24 series. Fingerprint sensor preserved.",
    specs: ["Dynamic AMOLED", "Fingerprint sensor intact", "Same-day service", "90-day warranty"],
  },
  {
    id: "45",
    name: "Samsung Screen Replacement (A-Series)",
    category: "repair",
    price: 380,
    image: "",
    availability: "in-stock",
    description:
      "Super AMOLED screen replacement for Galaxy A-series (A32 to A55). Fast turnaround.",
    specs: ["Super AMOLED", "Fast turnaround", "60-day warranty", "All A-series models"],
  },
  {
    id: "46",
    name: "Phone Battery Replacement",
    category: "repair",
    price: 220,
    image: "",
    availability: "in-stock",
    description:
      "Restore your phone's stamina with a new OEM-capacity battery. Works for all major brands.",
    specs: ["All major brands", "OEM capacity", "60-day warranty", "Express service"],
  },
  {
    id: "47",
    name: "Charging Port Repair",
    category: "repair",
    price: 150,
    image: "",
    availability: "in-stock",
    description:
      "Fix slow or no-charging issues. Covers USB-C and Lightning ports on all brands.",
    specs: ["USB-C & Lightning", "All brands", "30-day warranty", "Same-day"],
  },
  {
    id: "48",
    name: "Back Glass Replacement",
    category: "repair",
    price: 280,
    image: "",
    availability: "in-stock",
    description:
      "Cracked rear glass? We replace it and restore your phone's premium look and wireless charging.",
    specs: ["Wireless charging restored", "OEM glass quality", "All iPhone & Samsung", "60-day warranty"],
  },
  {
    id: "49",
    name: "Camera Lens Replacement",
    category: "repair",
    price: 180,
    image: "",
    availability: "in-stock",
    description:
      "Replace cracked or scratched camera lenses to restore your photo and video quality.",
    specs: ["Front & rear cameras", "All brands", "30-day warranty", "Same-day service"],
  },
  {
    id: "50",
    name: "Water Damage Diagnosis & Repair",
    category: "repair",
    price: 500,
    image: "",
    availability: "in-stock",
    description:
      "Ultrasonic cleaning and component-level repair for water-damaged phones. Free diagnosis.",
    specs: ["Free diagnosis", "Ultrasonic cleaning", "Motherboard repair", "90-day warranty"],
  },
  {
    id: "51",
    name: "Speaker / Microphone Repair",
    category: "repair",
    price: 130,
    image: "",
    availability: "in-stock",
    description:
      "Fix muffled calls, no sound, or microphone issues. Covers earpiece and loud speaker.",
    specs: ["Earpiece & loudspeaker", "Mic repair", "All brands", "30-day warranty"],
  },

  // ── Other Phones ──────────────────────────────────────────────────────────────
  {
    id: "5",
    name: "Tecno Spark 20 Pro",
    category: "phone",
    price: 1200,
    image: "",
    availability: "in-stock",
    description:
      "Sleek and affordable smartphone built for everyday Ghana life with a big battery.",
    specs: ['6.67" FHD+ display', "256GB", "50MP AI camera", "5000mAh", "4G LTE"],
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
    specs: ['6.67" AMOLED', "256GB", "64MP RGBW camera", "5000mAh", "33W charging"],
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
    specs: ['6.78" 90Hz display', "128GB", "50MP camera", "5000mAh", "18W charging"],
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
    specs: ['6.78" AMOLED 120Hz', "256GB", "64MP camera", "5000mAh", "45W fast charge"],
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
    specs: ['6.6" display', "64GB", "8MP camera", "6000mAh battery", "Dual SIM"],
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
    specs: ["9H hardness", "Anti-fingerprint", "Ultra-clear", "Easy bubble-free install"],
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
    specs: ["Military-grade drop proof", "Slim design", "Raised camera edges", "Multiple colours"],
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
    specs: ["15W fast wireless", "Qi certified", "LED indicator", "Compatible with all Qi devices"],
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
    specs: ["ANC noise cancellation", "24hr total battery", "IPX4 water resistant", "Bluetooth 5.3"],
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
    specs: ["20000mAh capacity", "22.5W fast charge", "Dual USB-A + USB-C", "LED charge indicator"],
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
    specs: ["Adjustable angle", "Aluminium alloy", "Foldable & portable", "Universal fit"],
  },
];
