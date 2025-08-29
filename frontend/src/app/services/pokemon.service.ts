import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, throwError, timer, of} from 'rxjs';
import {catchError, retry, switchMap} from 'rxjs/operators';
import {Pokemon} from '../types/pokemon.types';
import {MAX_POKEMON_ID, DEFAULT_POKEMON_COUNT, MAX_RETRIES, RETRY_DELAY, PIKACHU_ID} from '../constants/app.constants';

@Injectable({providedIn: 'root'})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/api/pokemon';

  constructor(private http: HttpClient) {
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
