# ATELIER NOIR

A luxury fashion editorial boutique — a fictional independent fashion label launching the Autumn/Winter 2026 "Obsidian" collection.

## Overview

ATELIER NOIR is designed as an online fashion publication that also sells clothing. The site features dramatic monochrome imagery, large fashion-magazine typography, asymmetric layouts, and selective burgundy accents.

## Features

### Shopping Experience
- **Collection Campaign** — Presented as a visual editorial with asymmetric full-bleed photography
- **Product Browsing** — Organized by collection (AW26, Resort 2026, Les Essentiels) and garment type
- **Product Detail** — Image galleries with swipe/keyboard navigation, size selection, color variants, and pricing
- **Shopping Bag** — Full quantity management, subtotal calculation, persisted to localStorage
- **Size Guide** — Accessible overlay with measurements and fitting guidance

### Content
- **Journal** — Campaign stories, designer notes, and craft essays
- **Editorial Home** — Magazine-style layout with parallax hero and staggered product grid

### Design & UX
- **Mobile-first** — Designed for 320px+ with progressive enhancement
- **One-handed mobile navigation** — Bottom tab bar with animated active indicators
- **Smooth animations** — Page transitions, scroll reveals, gallery swipes, and micro-interactions
- **Accessibility** — Keyboard navigation, reduced motion support, semantic HTML, ARIA labels
- **Touch gestures** — Swipeable galleries, touch-friendly targets (44px+)

## Technology Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animation and transitions
- **React Router** — Client-side routing (HashRouter for static serving)
- **Lucide React** — Icon system
- **TypeScript** — Type safety

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

### Development

The development server runs at `http://localhost:3000` by default.

## Project Structure

```
src/
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
├── index.css            # Global styles and Tailwind config
├── context/
│   └── BagContext.tsx   # Shopping bag state management
├── data/
│   ├── products.ts      # Product catalog data
│   └── journal.ts       # Journal articles data
├── components/
│   ├── Navigation.tsx   # Desktop + mobile header nav
│   ├── MobileBottomNav.tsx  # Mobile bottom tab bar
│   ├── BagDrawer.tsx    # Slide-out shopping bag
│   ├── SizeGuide.tsx    # Size guide overlay
│   └── Gallery.tsx      # Swipeable image gallery
└── pages/
    ├── Home.tsx         # Editorial homepage
    ├── Collection.tsx   # Product browsing with filters
    ├── ProductDetail.tsx # Individual product view
    ├── Journal.tsx      # Journal listing
    ├── JournalPost.tsx  # Individual journal article
    └── BagPage.tsx      # Full shopping bag page
```

## Design Decisions

- **No rounded corners** — Sharp edges reflect the brand's architectural aesthetic
- **Monochrome palette** — Noir (#0a0a0a), ivory (#f5f5f0), with burgundy (#6b1d2a) accents
- **Editorial typography** — Cormorant Garamond for headlines, Inter for body text
- **Asymmetric layouts** — Staggered grids and offset elements create visual tension
- **No generic cards** — Each product presentation is unique within the editorial flow

## Accessibility

- Respects `prefers-reduced-motion` — disables non-essential animations
- All interactive elements have visible focus indicators
- Touch targets are minimum 44×44px
- Semantic HTML with proper ARIA attributes
- Keyboard-navigable galleries and dialogs
- Sufficient color contrast throughout

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome for Android

## Notes

- This is a demonstration project for a fictional fashion house
- No real payment processing is implemented
- Product data is entirely fictional
- Images are AI-generated editorial photographs
