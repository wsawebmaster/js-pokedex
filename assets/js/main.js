const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
          //console.log(pokemons);

      const newHtml = pokemons
        .map(
          (pokemon) => `
          <li data-name="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
            </ol>

            <a href="#" onclick="open_modal()">
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
            </a>
          </div>
        </li>
      `
        )
        .join("");
        pokemonList.innerHTML += newHtml
          document.querySelectorAll(".pokemon")
          //console.log(document.querySelectorAll(".pokemon"))
        const boxes = document.querySelectorAll(".pokemon");

        boxes.forEach((box) => {
          box.addEventListener("click", function (event) {
            let takeName = this.getAttribute("data-name");
            cardPokemonDetails(takeName);
            // console.log("box clicked", event);
          });
        });
    })
  }

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordWithNextPage = offset + limit

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit);
  }
})


// GenerateCardContent
const pokemonCard = document.getElementById("pokemonCard");

function cardPokemonDetails(takeName) {
  fetch("https://pokeapi.co/api/v2/pokemon/"+takeName)
  .then((response) => response.json())
    .then(function (pokemon) {
      //console.log(pokemon.abilities[0].ability);
      //pokemon = convertPokeApiDetailToPokemon(pokemon)
      //var types = pokemon.types.map((type) => type).join(" ");
      //var test = 'pokemon.abilities.map((ability) => ability.ability.name).join(", ")';
      const types = `${pokemon.types.map((typeSlot) => typeSlot.type.name).join(" - ")}`;

      const test = pokemon['types']['0']['type']['name'];

      const skills = `${pokemon.abilities
                            .map((ability) => ability.ability.name)
                            .join(" - ")}`;

      var newHtmlCard = `
      <li class="pokemon ${test}" style="margin: 0 auto;height: 40rem;">
        <span class="name" style="font-size:2.7rem;text-transform:capitalize !important">
        ${pokemon.name}
        </span>
        <span class="number" style="font-size:1.7rem"># ${pokemon.id}</span>
        <div class="detail">
          <ol class="types">
            <li style="font-size:.8rem" class="type ${test}">${types}</li>
          </ol>
        </div>
        <img id="img_pokemon" style="z-index:2;height: 15rem;"
          src=${pokemon.sprites.other.dream_world.front_default}
          alt=${pokemon}
        />
      </li>
      <div class="filho-1"></div>
      <div class="filho-2">
        <div style='text-align:center'>
        <button id="option1">About</button>
        <button id="option2">Base Stats</button>
        <button id="option3">Evolution</button>
        <button id="option4">Moves</button>
        </div>
        <div id="info">
          Weight: <span>${pokemon.weight}</span> <br /><br />
          Abilities: <span>${skills}</span> <br /><br /><br />
          Under development...
        </div>
      </div>
    `;
    pokemonCard.innerHTML = newHtmlCard;
    // console.log(takeName);
    console.clear()
    console.log(pokemon);
    console.log(types)
    });
  }
