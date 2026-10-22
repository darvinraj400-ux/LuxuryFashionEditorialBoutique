export interface JournalPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: 'obsidian-essay',
    title: 'On Obsidian',
    subtitle: 'A meditation on the AW26 collection',
    date: '2026-01-15',
    category: 'Collection',
    excerpt: 'The colour black is not the absence of light, but the absorption of all colours. In this collection, we sought to find the infinite spectrum contained within a single shade.',
    content: [
      'The colour black is not the absence of light, but the absorption of all colours. In this collection, we sought to find the infinite spectrum contained within a single shade.',
      'Working with black fabric is a study in subtlety. The way light catches a wool crepe differs from how it plays across silk satin. A matte jersey reads differently than a polished leather. Each textile tells its own story of darkness.',
      'The Obsidian Coat began as a sketch on a winter morning in our Paris atelier. We wanted to create a garment that felt like armor — protective, architectural, yet entirely soft. The double-faced wool was sourced from a mill in Biella that has been weaving since 1876.',
      'Structure and softness are not opposites. They are partners in a conversation about how clothing mediates between the body and the world. A shoulder pad can be an act of confidence. A drape can be an invitation.',
      'We designed this collection to be worn in layers, each piece revealing and concealing in equal measure. The Silk Column Dress under the Structured Blazer. The Ribbed Turtleneck beneath the Cropped Bouclé. Combinations that shift with the wearer\'s intention.',
      'Fashion is architecture: it is a matter of proportions. — Coco Chanel',
    ],
    image: 'https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png',
    author: 'Maison Atelier Noir',
  },
  {
    id: 'craft-essay',
    title: 'The Hand Behind the Garment',
    subtitle: 'Notes on craftsmanship and slow making',
    date: '2025-12-01',
    category: 'Craft',
    excerpt: 'Every seam in an Atelier Noir garment is placed with intention. We believe that the time invested in making is visible in the wearing.',
    content: [
      'Every seam in an Atelier Noir garment is placed with intention. We believe that the time invested in making is visible in the wearing.',
      'Our atelier in the 11th arrondissement of Paris employs fourteen artisans, each specializing in a particular technique. Some have worked with us since the founding of the house. Others have joined from the great maisons of French couture.',
      'The half-canvas construction of our blazers requires three days of work. The canvas — a layer of horsehair and cotton between the fabric and the lining — is pad-stitched by hand, creating a shape that molds to the wearer over time.',
      'We source our textiles from mills we have visited and whose practices we know. The virgin wool for our Obsidian Coat comes from merino flocks in New Zealand, spun and woven in Italy. The silk is from Lake Como, where the tradition of weaving dates to the fifteenth century.',
      'Sustainability, for us, begins with longevity. A garment made well is a garment that endures. We repair what we make, and we encourage our clients to wear their pieces until they can be worn no more.',
    ],
    image: 'https://image.qwenlm.ai/generated-images/5e317d3d-0567-413c-95ba-dce3f12aec77/_result.png',
    author: 'Maison Atelier Noir',
  },
  {
    id: 'liquid-essay',
    title: 'Liquid: Resort 2026',
    subtitle: 'On movement, fluidity, and the body in motion',
    date: '2025-11-15',
    category: 'Collection',
    excerpt: 'Resort 2026 explores the moment between stillness and movement — the instant when fabric begins to speak.',
    content: [
      'Resort 2026 explores the moment between stillness and movement — the instant when fabric begins to speak.',
      'The collection was conceived during a residency in Marrakech, where the quality of light transforms every surface. We became fascinated by the way silk moves differently in desert air — slower, more deliberate, as if the fabric itself is considering each gesture.',
      'The Asymmetric Wrap Dress is the embodiment of this research. Cut on the bias, it follows the body\'s contours while maintaining an inherent sense of motion. The hemline falls differently with each step.',
      'Our washed silk undergoes a special finishing process that softens the hand while maintaining the structural integrity of the weave. The result is a fabric that feels lived-in from the first wearing.',
      'We photographed this collection at dawn in the Atlas Mountains, where the light is neither warm nor cool but something entirely other. The images capture garments in their most natural state — in dialogue with landscape and air.',
    ],
    image: 'https://image.qwenlm.ai/generated-images/3fe3a630-de3d-469c-b3f6-61eb127748c5/_result.png',
    author: 'Maison Atelier Noir',
  },
];
