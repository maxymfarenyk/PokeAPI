import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Pokemon } from '../types/pokemon.types';

const MAX_POKEMON_ID = 1025;
const DEFAULT_POKEMON_COUNT = 15;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}
  
  getRandomPokemons(count = DEFAULT_POKEMON_COUNT): Observable<Pokemon[]> {
    const ids = Array.from({ length: count }, () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
    const requests = ids.map(id => this.getPokemonWithRetry(id));
    return forkJoin(requests);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.getPokemonWithRetry(id);
  }

  private getPokemonWithRetry(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`).pipe(
      retry({
        count: MAX_RETRIES,
        delay: (error, retryCount) => {
          console.warn(`Retry ${retryCount}/${MAX_RETRIES} for Pokemon ID ${id}:`, error);
          return timer(RETRY_DELAY);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status} - ${error.message}`;

      switch (error.status) {
        case 404:
          errorMessage = 'Pokemon not found';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 0:
          errorMessage = 'Network error. Please check your internet connection.';
          break;
      }
    }

    console.error('PokemonService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
