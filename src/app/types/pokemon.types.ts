export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  moves: string[];
} 