const url="https://pokeapi.co/api/v2";
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
    const response = await fetch(`${url}/pokemon?limit=10`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon List');
    }
    const data = await response.json();
    return data;
  }
}

export default PokemonService;
