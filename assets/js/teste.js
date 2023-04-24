// returns pokemon from Pokemon API = retorna dados da API Pokemon
  // fetch("https://pokeapi.co/api/v2/pokemon?offset=5&limit=5")
  //   .then((response) => response.json())
  //   .then((pokemon) => console.log(pokemon));

// returns pokemon for a single Pokemon = retorna dados de um único Pokemon
const pokemonNumber = 4;

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
  .then((response) => response.json())
  .then((pokemon) => {
    console.log(`Name: ${pokemon.name}`);
    console.log(`Type: ${pokemon.types.map((type) => type.type.name).join(", ")}`);
    console.log(
      `Abilities: ${pokemon.abilities
        .map((ability) => ability.ability.name)
        .join(", ")}`
    );
  })
  .catch((error) => console.error(error));
