// Marketplace data structure for products and brands

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  discount?: number;
  couponCode?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  description?: string;
  features?: string[];
  inStock?: boolean;
}

export interface Brand {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  location: string;
  rating: number;
  totalReviews: number;
  followers: number;
  totalProducts: number;
  totalSales: number;
  website: string;
  email: string;
  phone: string;
  verified: boolean;
  coverImage: string;
  logo: string;
  categories: string[];
  achievements: string[];
  products: Product[];
  collections: {
    id: string;
    name: string;
    image: string;
    products: number;
  }[];
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Royal Red Lehenga with Gold Embroidery",
    brand: "Sabyasachi",
    category: "bridal-wear",
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBicmlkYWwlMjBsZWhlbmdhfGVufDF8fHx8MTc2MDY5Njk5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 234,
    isNew: true,
    isFeatured: true,
    discount: 29,
    couponCode: "BRIDE20",
    images: [
      "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBicmlkYWwlMjBsZWhlbmdhfGVufDF8fHx8MTc2MDY5Njk5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760461805241-dba33224ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBicmlkYWwlMjBlbWJyb2lkZXJ5fGVufDF8fHx8MTc2MDY5NzAwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1618153965142-3a6b069eaf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNjgzNjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1671696564980-02ac81b3f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZHVwYXR0YSUyMGVtYnJvaWRlcmVkfGVufDF8fHx8MTc2MDY5NzAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Maroon", "Pink", "Gold"],
    description: "Exquisite handcrafted lehenga featuring intricate gold embroidery on premium silk fabric. Perfect for brides seeking a traditional yet contemporary look. Each piece is unique and made by skilled artisans.",
    features: [
      "100% Pure Silk Fabric",
      "Hand Embroidered with Gold Thread",
      "Includes Lehenga, Blouse & Dupatta",
      "Custom Fitting Available",
      "Dry Clean Only",
      "Delivery in 7-10 days",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Classic Diamond Engagement Ring",
    brand: "Tiffany & Co.",
    category: "rings",
    price: 15000,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1561151743-ee18310c2230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzYwNTkwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
    reviews: 892,
    isTrending: true,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1561151743-ee18310c2230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzYwNTkwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1708739300121-b5a26a3a5928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF0aW51bSUyMHdlZGRpbmclMjBiYW5kc3xlbnwxfHx8fDE3NjA2OTY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1689743801114-230453abfceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwYnJhY2VsZXQlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MDY5Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1561151743-ee18310c2230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzYwNTkwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    sizes: ["4", "5", "6", "7", "8", "9", "10"],
    description: "A timeless classic diamond engagement ring featuring a brilliant-cut solitaire diamond set in platinum. This iconic design symbolizes eternal love and commitment.",
    features: [
      "GIA Certified Diamond",
      "Platinum Setting",
      "Lifetime Warranty",
      "Free Resizing",
      "Certificate of Authenticity",
      "Luxury Gift Box Included",
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Elegant Pearl Necklace Set",
    brand: "Tanishq",
    category: "jewelry",
    price: 3500,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1640083239745-9bbd77a2097f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMG5lY2tsYWNlJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 456,
    discount: 22,
    couponCode: "PEARL15",
    images: [
      "https://images.unsplash.com/photo-1640083239745-9bbd77a2097f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMG5lY2tsYWNlJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwamV3ZWxyeSUyMHNldHxlbnwxfHx8fDE3NjA2OTcwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYnJpZGFsJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTcwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1640083239745-9bbd77a2097f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMG5lY2tsYWNlJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Classic pearl necklace set with matching earrings. Handpicked South Sea pearls strung in 22K gold. Perfect for weddings and special occasions.",
    features: [
      "Genuine South Sea Pearls",
      "22K Gold Clasp",
      "Includes Matching Earrings",
      "Hallmarked Gold",
      "Premium Jewelry Box",
      "1 Year Warranty",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Designer Sherwani with Embroidered Dupatta",
    brand: "Manyavar",
    category: "groom-wear",
    price: 4200,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 178,
    isNew: true,
    discount: 30,
    images: [
      "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1685606867476-dc5b77a2bf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWx2ZXQlMjBibGF6ZXIlMjBmb3JtYWx8ZW58MXx8fHwxNzYwNjk2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1671696564980-02ac81b3f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZHVwYXR0YSUyMGVtYnJvaWRlcmVkfGVufDF8fHx8MTc2MDY5NzAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium designer sherwani with intricate embroidery work. Includes matching dupatta and churidar. Perfect for the modern groom.",
    features: [
      "Premium Silk Blend Fabric",
      "Hand Embroidered Details",
      "Includes Sherwani, Dupatta & Churidar",
      "Custom Tailoring Available",
      "Dry Clean Recommended",
      "Express Delivery Available",
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Gold Plated Maang Tikka with Kundan Work",
    brand: "Zaveri Pearls",
    category: "jewelry",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGt1bmRhbnxlbnwxfHx8fDE3NjA2OTY5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 334,
    discount: 29,
    couponCode: "JEWEL10",
    images: [
      "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGt1bmRhbnxlbnwxfHx8fDE3NjA2OTY5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwamV3ZWxyeSUyMHNldHxlbnwxfHx8fDE3NjA2OTcwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGt1bmRhbnxlbnwxfHx8fDE3NjA2OTY5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1640083239745-9bbd77a2097f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMG5lY2tsYWNlJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Elegant gold plated maang tikka with kundan work and pearl drops. Traditional design perfect for Indian bridal looks.",
    features: [
      "Gold Plated Brass",
      "Kundan Stone Work",
      "Pearl Embellishments",
      "Adjustable Chain",
      "Anti-Tarnish Coating",
      "Gift Wrapped",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Ivory Silk Wedding Gown",
    brand: "Anita Dongre",
    category: "bridal-wear",
    price: 6500,
    originalPrice: 9000,
    image: "https://images.unsplash.com/photo-1631386749697-ca71a14f89c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdlZGRpbmclMjBnb3dufGVufDF8fHx8MTc2MDY5Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 267,
    isFeatured: true,
    discount: 28,
    images: [
      "https://images.unsplash.com/photo-1631386749697-ca71a14f89c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdlZGRpbmclMjBnb3dufGVufDF8fHx8MTc2MDY5Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1618153965142-3a6b069eaf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNjgzNjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1631386749697-ca71a14f89c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdlZGRpbmclMjBnb3dufGVufDF8fHx8MTc2MDY5Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1618153965142-3a6b069eaf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNjgzNjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant ivory silk wedding gown with contemporary design. Features a flowing silhouette and delicate lace detailing perfect for modern brides.",
    features: [
      "100% Pure Silk",
      "Lace Detailing",
      "Custom Alterations Included",
      "Corset Back for Perfect Fit",
      "Professional Cleaning Service Available",
      "2-3 Weeks Delivery",
    ],
    inStock: true,
  },
];

export const brands: { [key: string]: Brand } = {
  "Sabyasachi": {
    name: "Sabyasachi",
    tagline: "Celebrating Indian Craftsmanship",
    description: "Sabyasachi is India's most iconic fashion designer, known for his intricate embroidery, luxurious fabrics, and timeless bridal collections. Each piece is a masterpiece that celebrates Indian heritage and craftsmanship.",
    founded: "1999",
    location: "Kolkata, India",
    rating: 4.9,
    totalReviews: 2847,
    followers: 45000,
    totalProducts: 342,
    totalSales: 8500,
    website: "www.sabyasachi.com",
    email: "info@sabyasachi.com",
    phone: "+91 33 2223 4567",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1756190564669-215843660e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRpYW4lMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDY5NzAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1685156172634-15cbb4120f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWJ5YXNhY2hpJTIwZmFzaGlvbiUyMGRlc2lnbmVyfGVufDF8fHx8MTc2MDY5NzAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    categories: ["Bridal Wear", "Jewelry", "Accessories", "Home Decor"],
    achievements: [
      "National Film Award Winner",
      "Vogue Fashion Fund Finalist",
      "Elle India Designer of the Year 2021",
      "Forbes India Celebrity 100",
    ],
    products: allProducts.filter(p => p.brand === "Sabyasachi"),
    collections: [
      {
        id: "1",
        name: "Heritage Bridal 2025",
        image: "https://images.unsplash.com/photo-1760461805241-dba33224ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBicmlkYWwlMjBlbWJyb2lkZXJ5fGVufDF8fHx8MTc2MDY5NzAwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 45,
      },
      {
        id: "2",
        name: "Vintage Jewelry",
        image: "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYnJpZGFsJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTcwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        products: 32,
      },
      {
        id: "3",
        name: "Royal Groom Collection",
        image: "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 28,
      },
      {
        id: "4",
        name: "Contemporary Fusion",
        image: "https://images.unsplash.com/photo-1685156172634-15cbb4120f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWJ5YXNhY2hpJTIwZmFzaGlvbiUyMGRlc2lnbmVyfGVufDF8fHx8MTc2MDY5NzAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 38,
      },
    ],
  },
  "Tiffany & Co.": {
    name: "Tiffany & Co.",
    tagline: "Legendary Diamonds Since 1837",
    description: "Tiffany & Co. is an American luxury jewelry and specialty retailer known for diamond and sterling silver jewelry. The company is renowned for its luxury goods and has been featured in numerous films.",
    founded: "1837",
    location: "New York, USA",
    rating: 5.0,
    totalReviews: 5234,
    followers: 120000,
    totalProducts: 456,
    totalSales: 25000,
    website: "www.tiffany.com",
    email: "customerservice@tiffany.com",
    phone: "+1 800 843 3269",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1561151743-ee18310c2230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzYwNTkwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1708739300121-b5a26a3a5928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF0aW51bSUyMHdlZGRpbmclMjBiYW5kc3xlbnwxfHx8fDE3NjA2OTY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    categories: ["Engagement Rings", "Wedding Bands", "Diamond Jewelry", "Luxury Watches"],
    achievements: [
      "Audrey Hepburn's Breakfast at Tiffany's",
      "Official Jeweler of the Academy Awards",
      "Blue Box Cafe - NYC Flagship",
      "Sustainable Diamond Initiative Leader",
    ],
    products: allProducts.filter(p => p.brand === "Tiffany & Co."),
    collections: [
      {
        id: "1",
        name: "Tiffany Setting Collection",
        image: "https://images.unsplash.com/photo-1561151743-ee18310c2230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzYwNTkwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        products: 67,
      },
      {
        id: "2",
        name: "T Collection",
        image: "https://images.unsplash.com/photo-1708739300121-b5a26a3a5928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF0aW51bSUyMHdlZGRpbmclMjBiYW5kc3xlbnwxfHx8fDE3NjA2OTY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        products: 42,
      },
    ],
  },
  "Tanishq": {
    name: "Tanishq",
    tagline: "Trust & Quality Since 1994",
    description: "Tanishq is India's most trusted jewelry brand, known for its craftsmanship, purity, and exquisite designs. Part of the Tata Group, Tanishq offers a wide range of gold and diamond jewelry.",
    founded: "1994",
    location: "Bangalore, India",
    rating: 4.8,
    totalReviews: 8945,
    followers: 85000,
    totalProducts: 2500,
    totalSales: 45000,
    website: "www.tanishq.co.in",
    email: "care@tanishq.co.in",
    phone: "+91 1800 266 0123",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1640083239745-9bbd77a2097f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMG5lY2tsYWNlJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjA2OTY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1751606615009-30f61ff1a510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGt1bmRhbnxlbnwxfHx8fDE3NjA2OTY5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    categories: ["Gold Jewelry", "Diamond Jewelry", "Platinum Jewelry", "Gemstone Jewelry"],
    achievements: [
      "India's Most Trusted Jewelry Brand",
      "BIS Hallmarked Gold",
      "400+ Stores Across India",
      "Kalyan Jewellers Partnership",
    ],
    products: allProducts.filter(p => p.brand === "Tanishq"),
    collections: [
      {
        id: "1",
        name: "Rivaah Wedding Collection",
        image: "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwamV3ZWxyeSUyMHNldHxlbnwxfHx8fDE3NjA2OTcwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        products: 234,
      },
      {
        id: "2",
        name: "Mia Collection",
        image: "https://images.unsplash.com/photo-1689743801114-230453abfceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwYnJhY2VsZXQlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MDY5Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 156,
      },
    ],
  },
  "Manyavar": {
    name: "Manyavar",
    tagline: "Celebrating Indian Traditions",
    description: "Manyavar is India's leading ethnic wear brand for men, specializing in sherwanis, indo-western outfits, and traditional wear. Known for impeccable craftsmanship and contemporary designs.",
    founded: "2002",
    location: "Kolkata, India",
    rating: 4.7,
    totalReviews: 3456,
    followers: 65000,
    totalProducts: 1200,
    totalSales: 35000,
    website: "www.manyavar.com",
    email: "care@manyavar.com",
    phone: "+91 1800 123 1011",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1685606867476-dc5b77a2bf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWx2ZXQlMjBibGF6ZXIlMjBmb3JtYWx8ZW58MXx8fHwxNzYwNjk2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    categories: ["Sherwanis", "Indo-Western", "Kurtas", "Accessories"],
    achievements: [
      "Brand Ambassador: Virat Kohli",
      "500+ Stores Nationwide",
      "Most Preferred Groom Brand",
      "IIFA Styled Awards Winner",
    ],
    products: allProducts.filter(p => p.brand === "Manyavar"),
    collections: [
      {
        id: "1",
        name: "Royal Sherwani Collection",
        image: "https://images.unsplash.com/photo-1555447405-057915b40299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9vbSUyMHNoZXJ3YW5pfGVufDF8fHx8MTc2MDY5Njk5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 189,
      },
    ],
  },
  "Anita Dongre": {
    name: "Anita Dongre",
    tagline: "Sustainable Luxury Fashion",
    description: "Anita Dongre is India's leading fashion designer known for sustainable luxury fashion. Specializes in bridal wear, contemporary Indian fashion, and eco-friendly couture.",
    founded: "1995",
    location: "Mumbai, India",
    rating: 4.9,
    totalReviews: 1987,
    followers: 52000,
    totalProducts: 567,
    totalSales: 12000,
    website: "www.anitadongre.com",
    email: "customercare@anitadongre.com",
    phone: "+91 22 4097 0000",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1631386749697-ca71a14f89c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdlZGRpbmclMjBnb3dufGVufDF8fHx8MTc2MDY5Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1618153965142-3a6b069eaf63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNjgzNjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    categories: ["Bridal Couture", "Sustainable Fashion", "Contemporary Wear", "Accessories"],
    achievements: [
      "Sustainable Fashion Pioneer",
      "FDCI Designer of the Year",
      "New York Fashion Week Participant",
      "Pink City Initiative Founder",
    ],
    products: allProducts.filter(p => p.brand === "Anita Dongre"),
    collections: [
      {
        id: "1",
        name: "Bridal Dreams 2025",
        image: "https://images.unsplash.com/photo-1631386749697-ca71a14f89c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdlZGRpbmclMjBnb3dufGVufDF8fHx8MTc2MDY5Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        products: 78,
      },
    ],
  },
};

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function getBrandByName(name: string): Brand | undefined {
  return brands[name];
}
