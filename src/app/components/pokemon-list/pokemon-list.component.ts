import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil, catchError} from 'rxjs/operators';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonListItem} from '../../types/pokemon.types';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {OnlineStatusBannerComponent} from '../online-status-banner/online-status-banner.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    OnlineStatusBannerComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons: PokemonListItem[] = [];
  isLoading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    public pokemonService: PokemonService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.pokemonService.isOffline) {
      this.loadPikachuOffline();
    } else {
      this.loadPokemons();
    }

    window.addEventListener('online', () => {
      if (!this.pokemonService.isOffline && this.pokemons.length === 0) {
        this.loadPokemons();
      }
    });

    window.addEventListener('offline', () => {
      if (this.pokemonService.isOffline) {
        this.loadPikachuOffline();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pokemonService.getRandomPokemons()
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.errorMessage = error.message || 'Failed to load Pokémon. Please try again.';
          this.isLoading = false;
          if (this.pokemonService.isOffline) {
            this.loadPikachuOffline();
          }
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          this.pokemons = data.map(p => ({
            id: p.id,
            name: p.name,
            image: p.sprites.front_default,
            moves: p.moves.slice(0, 2).map(m => m.move.name),
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading pokemons:', error);
          this.errorMessage = error.message || 'Failed to load Pokémon. Please try again.';
          this.isLoading = false;
        }
      });
  }

  loadPikachuOffline(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.pokemons = [];

    this.pokemonService.getPikachuOffline()
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.warn('Failed to load cached Pikachu:', error);
          this.errorMessage = 'No cached Pokémon available offline. Please connect to the internet.';
          this.isLoading = false;
          return [];
        })
      )
      .subscribe({
        next: (pokemon) => {
          if (pokemon) {
            this.pokemons = [{
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.front_default,
              moves: pokemon.moves.slice(0, 2).map(m => m.move.name),
            }];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading cached Pikachu:', error);
          this.errorMessage = 'Failed to load cached Pokémon.';
          this.isLoading = false;
        }
      });
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  retryLoad(): void {
    if (this.pokemonService.isOffline) {
      this.loadPikachuOffline();
    } else {
      this.loadPokemons();
    }
  }

  sortByNameAsc(): void {
    this.pokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByNameDesc(): void {
    this.pokemons.sort((a, b) => b.name.localeCompare(a.name));
  }

  sortByMoveAsc(): void {
    this.pokemons.sort((a, b) => {
      const moveA1 = a.moves[0] || '';
      const moveB1 = b.moves[0] || '';
      const firstCompare = moveA1.localeCompare(moveB1);

      if (firstCompare !== 0) {
        return firstCompare;
      }

      const moveA2 = a.moves[1] || '';
      const moveB2 = b.moves[1] || '';
      return moveA2.localeCompare(moveB2);
    });
  }
  sortByMoveDesc(): void {
    this.pokemons.sort((a, b) => {
      const moveA1 = b.moves[0] || '';
      const moveB1 = a.moves[0] || '';
      const firstCompare = moveA1.localeCompare(moveB1);

      if (firstCompare !== 0) {
        return firstCompare;
      }

      const moveA2 = b.moves[1] || '';
      const moveB2 = a.moves[1] || '';
      return moveA2.localeCompare(moveB2);
    });
  }
}
