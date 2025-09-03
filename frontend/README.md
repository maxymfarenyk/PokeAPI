# 🎮 PokeAPI PWA - Angular Application

A modern Progressive Web Application built with Angular and Material Design that displays Pokémon data from the PokeAPI with TypeScript interfaces and optimized data architecture.

## ✨ Features

- **Pokémon List**: Display random Pokémon with basic information
- **Detailed View**: Navigate to individual Pokémon pages with comprehensive stats
- **PWA Support**: Offline access, installable, service worker caching
- **Connection Status**: Real-time network connectivity indicator
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error handling with retry functionality
- **Sorting**: Sort Pokémon by name and moves
- **404 Page**: Custom not-found page for invalid routes

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd PokeAPI
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for PWA**
  ```bash
  npm run build
  npm run serve-pwa
  ```

4. **Open browser**
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/app/
├── components/
│   ├── not-found/                   # 404 page
│   ├── online-status-banner/        # Network status indicator
│   ├── pokemon-detail/              # Pokémon details 
│   └── pokemon-list/                # Main Pokémon list
├── constants/
│   └── app.constants.ts             # Application constants
├── services/
│   ├── online-status.service.ts     # Network connectivity monitoring
│   └── pokemon.service.ts           # API service with caching
├── types/
│   └── pokemon.types.ts             # TypeScript interfaces
├── app.config.ts                    # App configuration
├── app.routes.ts                    # Routing
└── app.ts                           # Root component
```

## 🏗️ Data Architecture

### TypeScript Interfaces

**Pokemon** (Complete Data):
```typescript
interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
  moves: Array<{ move: { name: string } }>;
}
```

**PokemonListItem** (Optimized for List):
```typescript
interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  moves: string[];
}
```

### Benefits
- **Type Safety**: Compile-time error detection
- **Performance**: Optimized data structures for different views
- **Maintainability**: Clear data contracts and separation of concerns

## 📱 PWA Features

- **Offline Support**: Browse previously visited Pokémon without internet
- **Installable**: Add to home screen on mobile and desktop
- **Service Worker**: Background sync and caching strategies
- **Performance**: Cache-first strategy for images and API data

### PWA Installation
**Desktop**: Click install prompt in browser address bar  
**Mobile**: Browser menu → "Add to Home Screen"

## 🎨 Material Design

- **Angular Material**: Complete Material Design component library
- **Components Used**: mat-card, mat-toolbar, mat-button, mat-progress-spinner, mat-snack-bar, mat-icon, mat-badge
- **Responsive Design**: Mobile-first approach with Material guidelines
- **Accessibility**: Full WCAG compliance with Material components

## 🎮 How to Use

- **Main Page**: View and sort Pokémon list, click cards for details, check connection status banner
- **Detail Page**: View comprehensive stats, types, and moves
- **Connection Status**: Real-time indicator shows network connectivity
- **Offline Mode**: Previously viewed Pokémon remain accessible when offline
- **Navigation**: Use "Back to List" button to return

## 🔧 Technical Stack

- **Angular 17+**: Standalone components
- **Angular Material**: Material Design component library
- **TypeScript**: Full type safety
- **Angular Service Worker**: PWA functionality
- **RxJS**: Reactive programming
- **SCSS**: Advanced styling with Material theming
- **PokeAPI**: Pokémon data source

## 🐛 Error Handling

- Network errors with retry logic
- 404 page for invalid routes
- User-friendly error messages
- Offline mode indicators and cached content fallbacks

## 🚀 Future Enhancements

- Search functionality
- Favorites system
- Advanced filtering
- Evolution chains

---

**Install as PWA for the best Pokémon hunting experience! 🎮✨📱**
