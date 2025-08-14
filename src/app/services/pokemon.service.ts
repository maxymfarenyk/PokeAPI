import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, throwError, timer, of} from 'rxjs';
import {catchError, retry, switchMap} from 'rxjs/operators';
import {Pokemon} from '../types/pokemon.types';

const MAX_POKEMON_ID = 1025;
const DEFAULT_POKEMON_COUNT = 15;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const PIKACHU_ID = 25;

@Injectable({providedIn: 'root'})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {
    this.ensurePikachuCached();
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.getPokemonWithRetry(id);
  }

  getRandomPokemons(count = DEFAULT_POKEMON_COUNT): Observable<Pokemon[]> {
    if (!navigator.onLine) {
      return this.getPokemonById(PIKACHU_ID).pipe(
        switchMap(pikachu => of([pikachu])),
        catchError(() => of([]))
      );
    }

    const ids = Array.from({length: count}, () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1);

    if (!ids.includes(PIKACHU_ID)) {
      ids[0] = PIKACHU_ID;
    }

    const requests = ids.map(id => this.getPokemonWithRetry(id));
    return forkJoin(requests);
  }

  getPikachuOffline(): Observable<Pokemon> {
    return this.getPokemonById(PIKACHU_ID);
  }

  get isOffline(): boolean {
    return !navigator.onLine;
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
      catchError(error => this.handleError(error, id))
    );
  }

  private ensurePikachuCached(): void {
    if (navigator.onLine) {
      this.getPokemonById(PIKACHU_ID).subscribe({
        next: (pokemon) => {
          console.log('Pikachu pre-cached for offline use');
          this.preloadPikachuImage(pokemon.sprites?.front_default);
        },
        error: (error) => console.warn('Failed to pre-cache Pikachu:', error)
      });
    }
  }

  private preloadPikachuImage(imageUrl: string | undefined): void {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => console.log('Pikachu image pre-cached');
      img.onerror = (error) => console.warn('Failed to pre-cache Pikachu image:', error);
      img.src = imageUrl;
    }
  }

  private handleError(error: HttpErrorResponse, pokemonId?: number): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          if (!navigator.onLine) {
            if (pokemonId === PIKACHU_ID) {
              errorMessage = 'Network error. Pikachu is not available from cache.';
            } else {
              errorMessage = 'Network error. Only cached Pokémon is available offline.';
            }
          } else {
            errorMessage = 'Some network error has happened.';
          }
          break;
        case 404:
          errorMessage = 'Pokemon not found';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
      }
    }

    console.error('PokemonService error:', errorMessage, pokemonId ? `(Pokemon ID: ${pokemonId})` : '');
    return throwError(() => new Error(errorMessage));
  }
}
