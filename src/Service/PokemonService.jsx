
const url="https://pokeapi.co/api/v2";
const pokemon_images_url="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world";
class PokemonService {
  static async searchPokemon(pokemonName) {
    const response = await fetch(`${url}/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon');
    }
    const data = await response.json();
    return data;
  }

  static async getPokemonList() {
    const response = await fetch(`${url}/pokemon?limit=12`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon List');
    }
    const data = await response.json();
    return data;
  }

  static async getPokemonImage(id) {
    const response = await fetch(`${pokemon_images_url}/${id}.svg`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon image');
    }
    return response.url;
  }


  static async getNextPokemonFromUrl(nextUrl) {
    const response = await fetch(`${nextUrl}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon List');
    }
    const data = await response.json();
    return data;
  }



}

export default PokemonService;
