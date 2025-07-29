import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemons: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private pokemonService: PokemonService) {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.errorMessage = ''; // Очищаємо попередні помилки
    
    this.pokemonService.getRandomPokemons().subscribe({
      next: (data) => {
        this.pokemons = data.map(p => ({
          name: p.name,
          image: p.sprites.front_default,
          moves: p.moves.slice(0, 2).map((m: any) => m.move.name),
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

  retryLoad(): void {
    this.loadPokemons();
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
