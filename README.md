# 🎮 PokeAPI Angular Application

A modern Angular application that displays Pokémon data from the PokeAPI with TypeScript interfaces and optimized data architecture.

## ✨ Features

- **Pokémon List**: Display random Pokémon with basic information
- **Detailed View**: Navigate to individual Pokémon pages with comprehensive stats
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

3. **Open browser**
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/app/
├── components/
│   ├── pokemon-list.component.*     # Main Pokémon list
│   ├── pokemon-detail.component.*   # Pokémon details
│   └── not-found.component.*        # 404 page
├── services/
│   └── pokemon.service.ts           # API service
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

## 🎮 How to Use

- **Main Page**: View and sort Pokémon list, click cards for details
- **Detail Page**: View comprehensive stats, types, and moves
- **Navigation**: Use "Back to List" button to return

## 🔧 Technical Stack

- **Angular 17+**: Standalone components
- **TypeScript**: Full type safety
- **RxJS**: Reactive programming
- **SCSS**: Advanced styling
- **PokeAPI**: Pokémon data source

## 🐛 Error Handling

- Network errors with retry logic
- 404 page for invalid routes
- User-friendly error messages

## 🚀 Future Enhancements

- Search functionality
- Favorites system
- Advanced filtering
- Evolution chains
- Offline support

---

**Happy Pokémon hunting! 🎮✨**
