import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

const MAX_POKEMON_ID = 1025;
const DEFAULT_POKEMON_COUNT = 15;

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}
  
  getRandomPokemons(count = DEFAULT_POKEMON_COUNT): Observable<any[]> {
    const ids = Array.from({ length: count }, () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
    const requests = ids.map(id => this.http.get(`${this.apiUrl}/${id}`));
    return forkJoin(requests);
  }
}
