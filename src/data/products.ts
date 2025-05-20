export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  imageUrls: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const categories: Category[] = [
  {
    id: "kanchipuram",
    name: "Kanchipuram Silk",
    description: "Luxurious silk sarees from Kanchipuram with intricate zari work",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "banarasi",
    name: "Banarasi Silk",
    description: "Opulent silk sarees with ornate designs from Varanasi",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "patola",
    name: "Patola",
    description: "Double ikat woven sarees from Gujarat with geometric patterns",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "chanderi",
    name: "Chanderi",
    description: "Lightweight sarees with shimmering texture from Madhya Pradesh",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "sambalpuri",
    name: "Sambalpuri",
    description: "Traditional tie and dye sarees from Odisha",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "pochampally",
    name: "Pochampally Ikat",
    description: "Geometric patterned ikat sarees from Telangana",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  }
];

export const products: Product[] = [
  // Kanchipuram Silk Sarees
  {
    id: "kanchi-001",
    name: "Crimson Bridal Kanchipuram Silk",
    price: 25000,
    category: "kanchipuram",
    description: "A traditional crimson Kanchipuram silk saree with intricate gold zari work, perfect for bridal occasions. This handcrafted masterpiece features temple borders and peacock motifs throughout the pallu.",
    features: [
      "Pure mulberry silk with gold zari",
      "Traditional temple border design",
      "Peacock motifs on pallu",
      "Contrast blouse piece included",
      "Handwoven by master artisans"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "kanchi-002",
    name: "Royal Blue Kanchipuram Silk",
    price: 18500,
    category: "kanchipuram",
    description: "A majestic royal blue Kanchipuram silk saree with silver zari borders and intricate floral motifs. The contrasting pallu adds an elegant touch to this traditional masterpiece.",
    features: [
      "Pure mulberry silk with silver zari",
      "Traditional floral motifs",
      "Contrast pallu with intricate design",
      "Matching blouse piece included",
      "Handwoven by master artisans"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "kanchi-003",
    name: "Green and Gold Kanchipuram Silk",
    price: 22000,
    category: "kanchipuram",
    description: "An exquisite emerald green Kanchipuram silk saree with opulent gold zari work. The traditional border and elaborate pallu design make this a perfect choice for weddings and festivals.",
    features: [
      "Pure mulberry silk with gold zari",
      "Traditional geometric border",
      "Intricate pallu with peacock and floral designs",
      "Contrast blouse piece included",
      "Handwoven by master artisans"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "kanchi-004",
    name: "Pure Black Kanchipuram Silk",
    price: 19500,
    category: "kanchipuram",
    description: "A sophisticated black Kanchipuram silk saree with gold zari borders and intricate motifs. This elegant piece features traditional temple designs and a rich pallu.",
    features: [
      "Pure mulberry silk with gold zari",
      "Traditional temple border design",
      "Intricate pallu with mythological motifs",
      "Contrast blouse piece included",
      "Handwoven by master artisans"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "kanchi-005",
    name: "Purple Kanchipuram Silk",
    price: 21000,
    category: "kanchipuram",
    description: "A regal purple Kanchipuram silk saree with gold zari borders and intricate peacock motifs. The rich pallu design and vibrant color make it perfect for special occasions.",
    features: [
      "Pure mulberry silk with gold zari",
      "Traditional peacock motifs",
      "Elaborate pallu with intricate design",
      "Contrast blouse piece included",
      "Handwoven by master artisans"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  
  // Banarasi Silk Sarees
  {
    id: "banarasi-001",
    name: "Red Banarasi Silk",
    price: 15000,
    category: "banarasi",
    description: "A traditional red Banarasi silk saree with intricate gold zari work and floral motifs. Perfect for wedding ceremonies and special occasions.",
    features: [
      "Pure silk with gold zari",
      "Traditional floral and paisley motifs",
      "Rich pallu with intricate design",
      "Matching blouse piece included",
      "Handwoven in Varanasi"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "banarasi-002",
    name: "Golden Banarasi Silk",
    price: 18000,
    category: "banarasi",
    description: "An opulent golden Banarasi silk saree with intricate zari work and traditional motifs. This saree exudes luxury and is perfect for special occasions.",
    features: [
      "Pure silk with gold zari",
      "Traditional jaal patterns",
      "Elaborate pallu design",
      "Contrast blouse piece included",
      "Handwoven in Varanasi"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "banarasi-003",
    name: "Blue Banarasi Silk",
    price: 16500,
    category: "banarasi",
    description: "A stunning blue Banarasi silk saree with silver zari work and intricate motifs. Perfect for festivals and celebrations.",
    features: [
      "Pure silk with silver zari",
      "Traditional floral motifs",
      "Rich pallu design",
      "Matching blouse piece included",
      "Handwoven in Varanasi"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "banarasi-004",
    name: "Green Banarasi Silk",
    price: 17000,
    category: "banarasi",
    description: "An elegant green Banarasi silk saree with gold zari work and traditional motifs. Perfect for weddings and festive occasions.",
    features: [
      "Pure silk with gold zari",
      "Traditional paisley motifs",
      "Elaborate pallu design",
      "Contrast blouse piece included",
      "Handwoven in Varanasi"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "banarasi-005",
    name: "Purple Banarasi Silk",
    price: 16000,
    category: "banarasi",
    description: "A regal purple Banarasi silk saree with gold zari work and traditional motifs. Perfect for celebrations and special occasions.",
    features: [
      "Pure silk with gold zari",
      "Traditional jaal patterns",
      "Rich pallu with intricate design",
      "Matching blouse piece included",
      "Handwoven in Varanasi"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  
  // Products for other categories
  {
    id: "patola-001",
    name: "Red Patola Silk",
    price: 28000,
    category: "patola",
    description: "A vibrant red Patola saree with intricate double ikat weaving. This masterpiece features geometric patterns and is perfect for special occasions.",
    features: [
      "Pure silk with double ikat weaving",
      "Traditional geometric patterns",
      "Rich pallu with intricate design",
      "Contrast blouse piece included",
      "Handwoven in Gujarat"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "chanderi-001",
    name: "Golden Chanderi Silk Cotton",
    price: 9500,
    category: "chanderi",
    description: "A lightweight golden Chanderi silk cotton saree with zari borders and delicate buttis. Perfect for festive occasions and celebrations.",
    features: [
      "Silk-cotton blend",
      "Traditional zari borders",
      "Delicate butti work throughout",
      "Matching blouse piece included",
      "Handwoven in Madhya Pradesh"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "sambalpuri-001",
    name: "Black and Red Sambalpuri Silk",
    price: 12500,
    category: "sambalpuri",
    description: "A traditional black and red Sambalpuri ikat saree with intricate patterns. This handwoven piece features traditional motifs and is perfect for special occasions.",
    features: [
      "Pure silk with tie and dye technique",
      "Traditional motifs",
      "Contrasting border and pallu",
      "Matching blouse piece included",
      "Handwoven in Odisha"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "pochampally-001",
    name: "Blue Pochampally Ikat Silk",
    price: 13500,
    category: "pochampally",
    description: "A stunning blue Pochampally ikat saree with intricate geometric patterns. This handwoven masterpiece is perfect for special occasions.",
    features: [
      "Pure silk with ikat weaving",
      "Geometric patterns throughout",
      "Contrasting border and pallu",
      "Matching blouse piece included",
      "Handwoven in Telangana"
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  }
];

export const featuredProducts = [
  "kanchi-001",
  "banarasi-002",
  "patola-001",
  "chanderi-001"
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return featuredProducts.map((id) => getProductById(id)!).filter(Boolean);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

products.forEach(product => { product.imageUrls = ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"]; });
