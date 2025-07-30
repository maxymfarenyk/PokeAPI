import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../types/pokemon.types';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Конвертуємо в число
      this.loadPokemon(id);
    });
  }

  loadPokemon(id?: number): void {
    if (!id) {
      id = +this.route.snapshot.params['id'];
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.pokemonService.getPokemonById(id).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pokemon:', error);
        this.errorMessage = error.message || 'Failed to load Pokémon details.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
