import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PokemonListComponent } from './app/components/pokemon-list.component';

bootstrapApplication(PokemonListComponent, appConfig)
  .catch((err) => console.error(err));
