# 🎮 PokeAPI Angular Application

A modern Angular application that displays Pokémon data from the PokeAPI. Features a responsive design with loading states, error handling, and detailed Pokémon information.

## ✨ Features

### 🎯 Core Functionality
- **Pokémon List**: Display random Pokémon with their basic information
- **Detailed View**: Navigate to individual Pokémon pages with comprehensive stats
- **Modern Design**: Clean and intuitive interface
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error handling with retry functionality
- **404 Page**: Custom not-found page for invalid routes

### 🎨 User Interface
- **Modern UI**: Clean and intuitive design
- **Loading Spinners**: Animated loading indicators
- **Error Messages**: User-friendly error notifications
- **Navigation**: Smooth transitions between pages
- **Sorting Options**: Sort Pokémon by name and moves (A-Z, Z-A)
- **Reload Functionality**: Refresh data with a single click

### 🔧 Technical Features
- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Full type safety
- **SCSS**: Advanced styling with nested selectors
- **RxJS**: Reactive programming for data handling
- **HTTP Client**: API communication with retry logic
- **Router**: Client-side routing with route parameters

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PokeAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── pokemon-list.component.ts          # Main Pokémon list
│   │   ├── pokemon-list.component.html        # List template
│   │   ├── pokemon-list.component.scss        # List styles
│   │   ├── pokemon-detail.component.ts        # Pokémon details
│   │   ├── pokemon-detail.component.html      # Details template
│   │   ├── pokemon-detail.component.scss      # Details styles
│   │   ├── not-found.component.ts             # 404 page
│   │   ├── not-found.component.html           # 404 template
│   │   └── not-found.component.scss           # 404 styles
│   ├── services/
│   │   └── pokemon.service.ts                 # API service
│   ├── app.config.ts                          # App configuration
│   ├── app.routes.ts                          # Routing configuration
│   └── app.ts                                 # Root component
├── index.html                                 # Main HTML file
├── main.ts                                    # Application entry point
└── styles.css                                 # Global styles
```

## 🎮 How to Use

### Main Page
- **View Pokémon**: The main page displays a list of random Pokémon
- **Sort Options**: Use the toolbar buttons to sort Pokémon by name
- **Reload Data**: Click the reload button (⟳) to fetch new random Pokémon
- **Navigate to Details**: Click on any Pokémon card to view detailed information

### Detail Page
- **Pokémon Information**: View comprehensive stats, types, and moves
- **Navigation**: Use the "Back to List" button to return to the main page
- **Error Handling**: If data fails to load, use the "Try Again" button

### Error Pages
- **404 Page**: Automatically shown for invalid URLs
- **Network Errors**: Graceful handling of connection issues
- **API Errors**: User-friendly messages for various error types

## 🔧 API Integration

### PokeAPI
The application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data:

- **Base URL**: `https://pokeapi.co/api/v2/pokemon`
- **Random Pokémon**: Fetches 15 random Pokémon on each load
- **Individual Pokémon**: Detailed data for each Pokémon by ID
- **Error Handling**: Retry logic with exponential backoff

### Service Features
- **Retry Logic**: Automatic retry on network failures (up to 3 attempts)
- **Error Classification**: Different messages for different error types
- **Loading States**: Proper loading indicators during API calls

## 🎨 Styling

### Design System
- **Color Scheme**: Modern blue and gray palette
- **Typography**: Segoe UI font family
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and loading animations

### Design System
- **Flexbox Layout**: Flexible and adaptive layouts
- **CSS Grid**: Modern grid system for complex layouts
- **Consistent Spacing**: Uniform padding and margins

## 🛠️ Technical Details

### Angular Features Used
- **Standalone Components**: Modern Angular component architecture
- **Router**: Client-side navigation with route parameters
- **HTTP Client**: API communication with error handling
- **RxJS Operators**: `forkJoin`, `retry`, `catchError`, `timer`
- **TypeScript**: Full type safety and modern JavaScript features

### Performance Optimizations
- **Lazy Loading**: Components loaded on demand
- **Error Boundaries**: Graceful error handling
- **Loading States**: Prevents UI blocking during API calls
- **Efficient Re-renders**: Angular's change detection optimization

## 🐛 Error Handling

### Network Errors
- **Connection Issues**: "Network error. Please check your internet connection."
- **Server Errors**: "Server error. Please try again later."
- **Rate Limiting**: "Too many requests. Please try again later."

### Application Errors
- **404 Not Found**: Custom 404 page for invalid routes
- **Pokémon Not Found**: "Pokemon not found" for invalid IDs
- **Retry Logic**: Automatic retry with user feedback

## 📱 Browser Support

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

## 🚀 Future Enhancements

### Planned Features
- **Search Functionality**: Search Pokémon by name or ID
- **Favorites System**: Save favorite Pokémon
- **Advanced Filtering**: Filter by type, generation, etc.
- **Evolution Chains**: Display Pokémon evolution information
- **Battle Stats**: Detailed battle statistics
- **Offline Support**: Service worker for offline functionality

### Technical Improvements
- **Testing**: Unit and integration tests
- **PWA**: Progressive Web App features
- **Performance**: Further optimization and caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **PokeAPI**: For providing the comprehensive Pokémon database
- **Angular Team**: For the amazing framework
- **Pokémon Company**: For creating the Pokémon universe

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include browser version and error messages

---

**Happy Pokémon hunting! 🎮✨**
