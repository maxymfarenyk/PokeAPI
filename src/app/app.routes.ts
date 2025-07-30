import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail.component';
import { NotFoundComponent } from './components/not-found.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', component: NotFoundComponent }
];
