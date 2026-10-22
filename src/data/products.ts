export interface ProductVariant {
  color: string;
  colorCode: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  description: string;
  materials: string;
  care: string;
  sizes: string[];
  variants: ProductVariant[];
  editorial: string;
  isNew?: boolean;
}

export const collections = [
  { id: 'aw26', name: 'Autumn/Winter 2026', subtitle: 'OBSIDIAN', description: 'A meditation on shadow and structure. The AW26 collection explores the tension between protection and vulnerability through architectural silhouettes and sumptuous textiles.' },
  { id: 'resort26', name: 'Resort 2026', subtitle: 'LIQUID', description: 'Fluidity redefined. Resort 26 moves between states of being — liquid silk against structured wool, transparency over opacity.' },
  { id: 'essentials', name: 'Les Essentiels', subtitle: 'PERMANENT', description: 'The permanent collection. Pieces that transcend season and trend, crafted to become the foundation of a considered wardrobe.' },
];

export const categories = [
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'tailoring', name: 'Tailoring' },
  { id: 'knitwear', name: 'Knitwear' },
  { id: 'trousers', name: 'Trousers' },
  { id: 'accessories', name: 'Accessories' },
];

export const products: Product[] = [
  {
    id: 'noir-coat-001',
    name: 'The Obsidian Coat',
    collection: 'aw26',
    category: 'outerwear',
    price: 2890,
    description: 'A floor-sweeping coat in double-faced virgin wool. The silhouette is deliberately oversized, with a dropped shoulder and an asymmetric closure that creates a dramatic drape. Hand-finished interior seams.',
    materials: '100% Virgin Wool. Lining: 100% Cupro.',
    care: 'Dry clean only. Store on padded hanger. Steam to refresh between wears.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png', 'https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
      { color: 'Charcoal', colorCode: '#3a3a3a', images: ['https://image.qwenlm.ai/generated-images/400ea775-b568-450f-8ac2-02d2a1d11d84/_result.png'] },
    ],
    editorial: 'The Obsidian Coat is the cornerstone of AW26 — a garment that protects while it reveals.',
    isNew: true,
  },
  {
    id: 'noir-blazer-002',
    name: 'Structured Blazer',
    collection: 'aw26',
    category: 'tailoring',
    price: 1450,
    description: 'An architectural blazer with exaggerated shoulders and a nipped waist. Cut from Italian wool crepe with a half-canvas construction. The single-button closure creates a sharp hourglass silhouette.',
    materials: '98% Wool, 2% Elastane. Lining: 100% Silk.',
    care: 'Dry clean recommended. Press with cloth barrier. Store folded or on wide hanger.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/400ea775-b568-450f-8ac2-02d2a1d11d84/_result.png', 'https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png'] },
    ],
    editorial: 'Power dressing reimagined through a lens of restraint.',
    isNew: true,
  },
  {
    id: 'noir-dress-003',
    name: 'Silk Column Dress',
    collection: 'aw26',
    category: 'dresses',
    price: 1890,
    description: 'A column dress in heavy silk satin with a concealed back zip. The neckline is a deep V that extends to the sternum, balanced by long fitted sleeves. Falls to the floor with a subtle train.',
    materials: '100% Silk Satin.',
    care: 'Dry clean only. Hang immediately after wearing. Avoid direct sunlight when storing.',
    sizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/cacf569a-ccc6-4fe8-9899-9e3e6c4c7f24/_result.png', 'https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png'] },
      { color: 'Burgundy', colorCode: '#6b1d2a', images: ['https://image.qwenlm.ai/generated-images/cacf569a-ccc6-4fe8-9899-9e3e6c4c7f24/_result.png'] },
    ],
    editorial: 'Simplicity as the ultimate sophistication.',
  },
  {
    id: 'noir-trouser-004',
    name: 'Wide-Leg Trouser',
    collection: 'aw26',
    category: 'trousers',
    price: 890,
    description: 'High-waisted wide-leg trousers in wool gabardine. The cut is generous through the hip with a clean front and pressed crease. An invisible side zip maintains the uninterrupted line.',
    materials: '100% Wool Gabardine.',
    care: 'Dry clean or gentle machine wash cold. Hang to dry. Press crease as needed.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/92a733ea-32d4-46f5-9be4-9ccfaa2cea1e/_result.png'] },
      { color: 'Ivory', colorCode: '#f5f5f0', images: ['https://image.qwenlm.ai/generated-images/92a733ea-32d4-46f5-9be4-9ccfaa2cea1e/_result.png'] },
    ],
    editorial: 'Movement captured in wool.',
  },
  {
    id: 'noir-knit-005',
    name: 'Ribbed Turtleneck',
    collection: 'essentials',
    category: 'knitwear',
    price: 590,
    description: 'A fine-gauge ribbed turtleneck in extra-fine merino wool. The fit is close to the body without constriction. Extended cuffs that can be worn pushed back or pulled over the hand.',
    materials: '100% Extra-fine Merino Wool.',
    care: 'Hand wash cold or dry clean. Lay flat to dry. Fold, do not hang.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
      { color: 'Ivory', colorCode: '#f5f5f0', images: ['https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
      { color: 'Charcoal', colorCode: '#3a3a3a', images: ['https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
    ],
    editorial: 'The essential layer, perfected.',
  },
  {
    id: 'noir-dress-006',
    name: 'Asymmetric Wrap Dress',
    collection: 'resort26',
    category: 'dresses',
    price: 1290,
    description: 'A fluid wrap dress in washed silk with an asymmetric hemline. The wrap closure is secured with a single hidden tie at the waist. Sleeveless with wide armholes that reveal the shoulder.',
    materials: '100% Washed Silk.',
    care: 'Hand wash cold. Do not wring. Lay flat to dry. Iron on reverse.',
    sizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/cacf569a-ccc6-4fe8-9899-9e3e6c4c7f24/_result.png'] },
      { color: 'Bone', colorCode: '#e8e4dc', images: ['https://image.qwenlm.ai/generated-images/cacf569a-ccc6-4fe8-9899-9e3e6c4c7f24/_result.png'] },
    ],
    editorial: 'Effortless movement, considered construction.',
  },
  {
    id: 'noir-coat-007',
    name: 'Cropped Bouclé Jacket',
    collection: 'resort26',
    category: 'outerwear',
    price: 1690,
    description: 'A cropped jacket in nubby bouclé wool with raw-edge finishing. Collarless with a boxy silhouette. Patch pockets at the hip. Lined in silk twill with interior welt pocket.',
    materials: '72% Wool, 28% Polyamide. Lining: 100% Silk Twill.',
    care: 'Dry clean only. Store on padded hanger. Do not press.',
    sizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { color: 'Noir/Ivory', colorCode: '#1a1a1a', images: ['https://image.qwenlm.ai/generated-images/400ea775-b568-450f-8ac2-02d2a1d11d84/_result.png'] },
    ],
    editorial: 'Texture as narrative.',
  },
  {
    id: 'noir-accessory-008',
    name: 'Leather Belt',
    collection: 'essentials',
    category: 'accessories',
    price: 390,
    description: 'A slim belt in vegetable-tanned calfskin with a brushed silver buckle. 2cm width. Hand-stitched edges. The leather will develop a rich patina with wear.',
    materials: '100% Vegetable-tanned Calfskin. Buckle: Brushed Silver.',
    care: 'Condition with leather balm annually. Avoid water exposure. Store flat or rolled.',
    sizes: ['S', 'M', 'L'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
    ],
    editorial: 'Details that anchor the whole.',
  },
  {
    id: 'noir-knit-009',
    name: 'Oversized Cashmere Cardigan',
    collection: 'aw26',
    category: 'knitwear',
    price: 1290,
    description: 'An oversized cardigan in two-ply Mongolian cashmere. Dropped shoulders, patch pockets, and horn buttons. The gauge is loose enough to layer over tailoring while maintaining softness.',
    materials: '100% Mongolian Cashmere.',
    care: 'Hand wash cold with cashmere shampoo. Reshape while damp. Lay flat to dry. Fold for storage.',
    sizes: ['One Size'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png', 'https://image.qwenlm.ai/generated-images/c425a5fd-7588-4449-b4da-8218012deeb3/_result.png'] },
      { color: 'Oatmeal', colorCode: '#d4c9b8', images: ['https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png'] },
    ],
    editorial: 'Volume without weight.',
  },
  {
    id: 'noir-trouser-010',
    name: 'Tailored Cigarette Pant',
    collection: 'essentials',
    category: 'trousers',
    price: 750,
    description: 'A slim cigarette pant with a mid-rise waist and ankle-length hem. Cut from stretch wool with a concealed zip and hook closure. Front pleats create a clean line through the hip.',
    materials: '97% Wool, 3% Elastane.',
    care: 'Dry clean recommended. Cool iron if needed. Store hanging.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Noir', colorCode: '#0a0a0a', images: ['https://image.qwenlm.ai/generated-images/92a733ea-32d4-46f5-9be4-9ccfaa2cea1e/_result.png'] },
    ],
    editorial: 'Precision in every seam.',
  },
];

export const sizeGuideData = {
  women: {
    headers: ['Size', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)'],
    rows: [
      ['XS', '80-84', '62-66', '88-92'],
      ['S', '84-88', '66-70', '92-96'],
      ['M', '88-92', '70-74', '96-100'],
      ['L', '92-96', '74-78', '100-104'],
      ['XL', '96-100', '78-82', '104-108'],
    ],
  },
};
