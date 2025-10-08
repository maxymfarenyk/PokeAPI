# 🐾 PokeAPI Application

A full-stack Pokémon application featuring a web interface (frontend) and API server (backend) for browsing and exploring Pokémon data.

## 📋 Project Description

This application provides a user-friendly interface for viewing Pokémon information, including their stats, evolutions, abilities, and other data from the official PokéAPI. The project includes both a client-side interface for user interaction and a server-side component for request processing and data caching.

## 🏗️ Architecture

### Frontend
- **Technologies**: Angular Framework
- **Features**:
  - **Pokémon List**: Display random Pokémon with basic information
  - **Detailed View**: Navigate to individual Pokémon pages with comprehensive stats
  - **PWA Support**: Offline access, installable, service worker caching
  - **Angular Material**: Styles were created using Angular Material
  - **Connection Status**: Real-time network connectivity indicator
  - **Loading States**: Visual feedback during data fetching
  - **Error Handling**: Graceful error handling with retry functionality
  - **Sorting**: Sort Pokémon by name and moves
  - **404 Page**: Custom not-found page for invalid routes


### Backend
- **Technologies**: Kotlin Spring Boot
- **Features**:
  - **RESTful API**: For request handling
  - **PokeAPI**: Backend serves as proxy to official PokeAPI
  - **Async Processing**: Using Kotlin coroutines for getting Pokemon and PokemonLocation data asynchronously
  - **Error handling and data validation**

## 📸 Screenshots

| Home Page |
|-----|
| <img width="1220" height="700" alt="image" src="https://github.com/user-attachments/assets/1a167c31-71bd-4e33-b081-e86ba50d0d1f" /> |

| Details Page |
|-----|
|  <img width="420" alt="image" src="https://github.com/user-attachments/assets/ded21b83-af8f-47c0-991d-4842ff0bcb21" /> |
| <img width="420" alt="image" src="https://github.com/user-attachments/assets/97a6b12c-730e-4d98-9ce4-62261bf1b990" /> |
| <img width="420" alt="image" src="https://github.com/user-attachments/assets/273be246-d5e6-4d7c-b72f-8c3ab105dec6" /> |

## 🔧 API Endpoints

### Backend Routes

- `GET /api/pokemon` - List of all Pokémon
- `GET /api/pokemon/{nameOrId}` - Information about a specific Pokémon

### Frontend Routes

- `GET /pokemon` -  Render a page with list of all Pokémon
- `GET /pokemon/{id}` - Render a page with information about a specific Pokémon

## 🚀 Quick Start with Docker

### Run from Docker Hub

The easiest way to run the application locally:

```bash
# Pull and run the container
docker pull maxfarenyk/pokeapi
docker run -p 8080:8080 maxfarenyk/pokeapi
```

After running, the application will be available at: `http://localhost:8080`

## 📝 License

Personal project for educational and portfolio purpose.
