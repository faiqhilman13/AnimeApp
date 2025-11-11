# Anime Search App

A beautifully designed anime search application with a retro 1980-90s aesthetic inspired by classics like Cowboy Bebop and Samurai Champloo. Built with React, TypeScript, Redux, and Chakra UI.

![Anime Search App](https://img.shields.io/badge/React-19.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10-purple)

## 🚀 Live Demo

**[View Live App →](https://timely-tulumba-ac41cb.netlify.app)**

The app is deployed on Netlify and ready to use!

## Features

### Core Functionality
- **Instant Search**: Search for anime with real-time results and 250ms debouncing
- **Server-side Pagination**: Browse through thousands of anime with efficient pagination
- **Detailed Anime Pages**: View comprehensive information about each anime
- **Responsive Design**: Fully responsive layout that works on all devices
- **Type-Safe**: Built with TypeScript for maximum type safety

### Technical Excellence
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Request Cancellation**: Prevents race conditions by canceling in-flight requests
- **Error Handling**: Comprehensive error handling for network failures and API errors
- **Debounced Search**: Optimized API calls with 250ms debounce delay
- **React Router**: Smooth client-side navigation between pages

## Bonus Implementation

### User Experience Enhancements
✅ **Favorites/Watchlist System**: Save your favorite anime with localStorage persistence
✅ **My List Page**: Dedicated page to view all saved favorites
✅ **Interactive Heart Icons**: One-click favorite toggling on every anime card
✅ **Favorites Counter Badge**: Live count of saved anime with neon glow effect
✅ **Retro Hero Section**: VHS-inspired header with scanlines and CRT effects
✅ **Film Strip Borders**: Authentic 80s/90s film perforation effects on cards
✅ **Skeleton Loaders**: Beautiful loading states with retro-styled skeletons
✅ **Empty States**: Engaging empty state with animated search icon
✅ **Error States**: Clear error messaging with animated warning icon
✅ **Mobile Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
✅ **Smooth Animations**: Framer Motion powered transitions and micro-interactions
✅ **Hover Effects**: Delightful card hover effects with glowing borders
✅ **Toast Notifications**: User-friendly error notifications

### Technical Excellence
✅ **Unit Tests**: Comprehensive tests using Vitest and React Testing Library
✅ **Request Cancellation**: Prevents race conditions in search
✅ **Rate Limiting Handling**: Graceful handling of API rate limits (429 errors)
✅ **Network Error Recovery**: Clear error messages for network failures
✅ **TypeScript Throughout**: Minimal use of 'any' types, comprehensive interfaces
✅ **Code Organization**: Clean folder structure with separation of concerns

### Design Excellence
✅ **Retro Anime Aesthetic**: 1980-90s inspired design (Cowboy Bebop, Samurai Champloo)
✅ **"ANIME VAULT" Branding**: Retro arcade-style typography and badging
✅ **Custom Theme**: Hand-crafted Chakra UI theme with vintage color palettes
✅ **CRT Scanlines**: Full-screen subtle scanline overlay for authentic CRT monitor feel
✅ **Film Grain Effect**: Subtle texture overlay for authentic retro feel
✅ **Neon Glowing Effects**: Retro-futuristic glowing buttons, badges, and borders
✅ **Jazz-Inspired Colors**: Deep blues, warm oranges, purples, and muted earth tones
✅ **Cinematic Detail Pages**: Hero banner with blurred background image
✅ **Radial Gradients**: Atmospheric lighting effects in hero sections

## Technology Stack

- **React 19.2** - UI library with hooks
- **TypeScript 5.9** - Type-safe JavaScript
- **Redux Toolkit 2.10** - State management
- **React Router DOM 7.9** - Client-side routing
- **Chakra UI 2.8** - Component library
- **Framer Motion 12.23** - Animation library
- **Axios 1.13** - HTTP client with request cancellation
- **Vitest 3.2** - Unit testing framework
- **React Testing Library 16.3** - Component testing
- **Vite 7.2** - Build tool and dev server

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd yomilk
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:4000`

### Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Lint the codebase

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimeCard.tsx           # Anime card component
│   ├── AnimeCardSkeleton.tsx   # Loading skeleton
│   ├── SearchBar.tsx           # Search input component
│   ├── Pagination.tsx          # Pagination controls
│   └── EmptyState.tsx          # Empty/error states
├── pages/              # Page components
│   ├── SearchPage.tsx          # Main search page
│   └── AnimeDetailPage.tsx     # Anime detail page
├── store/              # Redux store
│   ├── index.ts                # Store configuration
│   └── slices/                 # Redux slices
│       ├── searchSlice.ts      # Search state
│       └── animeDetailSlice.ts # Detail state
├── services/           # API services
│   └── jikanApi.ts             # Jikan API client
├── types/              # TypeScript types
│   ├── anime.ts                # Anime data types
│   └── index.ts                # Type exports
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts          # Debounce hook
│   └── useAppDispatch.ts       # Typed Redux hooks
├── theme/              # Chakra UI theme
│   └── index.ts                # Custom theme
├── __tests__/          # Test files
│   ├── setup.ts                # Test setup
│   ├── hooks/                  # Hook tests
│   └── store/                  # Store tests
├── App.tsx             # Main App component
└── main.tsx            # App entry point
```

## Features in Detail

### Instant Search
The search bar implements debounced instant search with a 250ms delay. As you type, the app automatically searches the Jikan API and displays results in real-time. Previous requests are automatically cancelled to prevent race conditions.

### Pagination
Server-side pagination allows you to browse through thousands of anime. The pagination component shows page numbers with ellipsis for large page counts and includes previous/next buttons.

### Anime Details
Click on any anime card to view comprehensive details including:
- High-quality poster image with cinematic hero banner
- Title (English, Japanese, and romanized)
- Score, type, status, and rating
- Episode count, duration, and season
- Studios and genres
- Full synopsis and background information

### Error Handling
The app gracefully handles various error scenarios:
- Network failures with clear error messages
- API rate limiting (429 errors)
- Invalid API responses
- Anime not found (404 errors)
- Request timeouts

### Mobile Responsive
The app is fully responsive with breakpoints for:
- Mobile (< 768px): Single column layout
- Tablet (768px - 1024px): 2-3 column grid
- Desktop (> 1024px): 4 column grid

## Design Philosophy

The app's design is inspired by the golden age of anime (1980-1990s) with particular influence from:

- **Cowboy Bebop**: Jazz-inspired color palette, deep blues and warm oranges
- **Samurai Champloo**: Retro-futuristic aesthetic, hip-hop influenced design
- **VHS Era**: Film grain texture, scan line effects
- **Neon Tokyo**: Glowing effects, vibrant accent colors

The theme combines nostalgia with modern usability, creating a unique and memorable user experience.

## Testing

The project includes comprehensive unit tests for:
- Custom hooks (useDebounce)
- Redux slices (searchSlice, animeDetailSlice)
- Component rendering and interactions

Run tests with:
```bash
npm test          # Watch mode
npm run test:run  # Single run
```

## API

This project uses the [Jikan API](https://docs.api.jikan.moe/) (v4), a free unofficial MyAnimeList API. No authentication is required.

Key endpoints used:
- `/anime` - Search anime with pagination
- `/anime/{id}` - Get detailed anime information
- `/top/anime` - Get top-rated anime

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The app can be deployed to any static hosting service. Recommended platforms:
- **Netlify** (recommended, free tier available)
- Vercel
- GitHub Pages
- Render

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Performance

- **Bundle Size**: Optimized with Vite's tree-shaking and code splitting
- **API Calls**: Debounced and cancellable to minimize unnecessary requests
- **Loading States**: Skeleton loaders for perceived performance
- **Image Loading**: Lazy loading with fallback images

## Future Enhancements

Potential features for future versions:
- Favorites/Watchlist functionality
- User authentication
- Advanced filtering (by genre, year, studio)
- Anime recommendations
- Dark/light mode toggle
- Anime trailers/videos integration

## License

This project is created for educational and demonstration purposes.

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing free anime data
- [Chakra UI](https://chakra-ui.com/) for the excellent component library
- Cowboy Bebop and Samurai Champloo for design inspiration
- The React and TypeScript communities

---

**Note**: This project was created as a coding assessment to demonstrate React, TypeScript, and Redux proficiency. AI tools were used throughout development as documented in `PROMPTS.md`.
