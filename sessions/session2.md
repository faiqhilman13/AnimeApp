## Session 2: Design Refactor - Image-Focused Cards

### Overview
Refactored the design to use image-focused cards with hover interactions, inspired by modern gallery layouts.

### Changes Made

#### 1. AnimeCard Component Redesign
- Image now fills entire card by default (prominently displayed)
- On hover: image blurs, dark overlay appears with content (title, score, synopsis)
- Cleaner styling with rounded corners (`borderRadius="2xl"`)
- Removed film strip borders for modern look

#### 2. Enhanced FilterBar with Genres
- Added Filter button with genre selection dropdown
- Genres: All Genres, Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Romance, Sci-Fi, Slice of Life, Sports
- Horizontal scrollable genre chips when expanded
- Updated Redux with `genreFilter` state

#### 3. SearchPage Layout
- Hero section (existing)
- Grid/List view with updated FilterBar
- New Suggested Anime section at bottom

#### 4. SuggestedAnime Component (NEW)
- Displays 4 curated/top anime at page bottom
- "CURATED SELECTION" badge with retro styling
- New Redux slice: `suggestedSlice`

#### 5. AnimeListView Update
- Anime image as subtle background with gradient overlay
- Content always visible with enhanced contrast
- Cleaner, gallery-style presentation

### Files Modified
- `src/components/AnimeCard.tsx` - hover effect with image blur
- `src/components/FilterBar.tsx` - added genre filter UI
- `src/components/AnimeListView.tsx` - background image treatment
- `src/pages/SearchPage.tsx` - added SuggestedAnime section

### Files Created
- `src/components/SuggestedAnime.tsx` - curated anime section
- `src/store/slices/suggestedSlice.ts` - suggested anime state

### Files Updated
- `src/store/index.ts` - integrated suggestedSlice
- `src/store/slices/searchSlice.ts` - added genreFilter state
