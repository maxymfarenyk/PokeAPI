import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../types/pokemon.types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import {OnlineStatusBannerComponent} from '../online-status-banner/online-status-banner.component';
import { FormatLocationPipe } from '../../pipes/format-location.pipe';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    OnlineStatusBannerComponent,
    FormatLocationPipe
  ],
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
