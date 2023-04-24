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
          <li data-name="${pokemon.name}" class="pokemon ${pokemon.type}">
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

  fetch("https://pokeapi.co/api/v2/pokemon/" + takeName)
    .then((response) => response.json())
    .then(function (pokemon) {
      //console.log(pokemon.abilities[0].ability);
      pokemon = convertPokeApiDetailToPokemon(pokemon)

      //var types = pokemon.types.map((type) => type).join(" ");
      //var test = 'pokemon.abilities.map((ability) => ability.ability.name).join(", ")';

      var newHtmlCard = `
      <li class="pokemon ${pokemon.type}" style="margin: 0 auto;height: 40rem;">
        <span class="name" style="font-size:2.7rem">${pokemon.name}</span>
        <span class="number" style="font-size:1.7rem"># ${pokemon.number}</span>
        <div class="detail">
          <ol class="types">
          ${pokemon.types
            .map(
              (type) =>
                `<li style="font-size:.8rem" class="type ${type}">${type}</li>`
            )
            .join("")}
          </ol>
        </div>
        <img id="img_pokemon" style="z-index:2;height: 15rem;"
          src=${pokemon.photo}
          alt=${pokemon.name}
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
              Under development...
          </div>
      </div>
    `;
    pokemonCard.innerHTML = newHtmlCard;

    });
  }
