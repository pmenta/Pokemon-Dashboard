// API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Get Elements --------------------------------------------
const searchInput = getElement('.pesquisa__pokedex input'),
      searchButton = getElement('.pesquisa__button input'),
      container = getElement('.pokemon__container'),
      loading = getElement('.c-loader'),
      info = getElement('.pesquisa__info');

var pokeName, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por guardar os dados recebidos da API
    card; // Responsavel por receber o HTML 

var cont = 0 // Contagem de vezes que o usuario pesquisou por um pokemon

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
    console.log(pokemon);
}

 // Execute o console para verificar os dados no console


function pesquisa() {
  
  pokeName = searchInput.value.toLowerCase(); 
  console.log(pokeName);
  startApp(pokeName);
 };
 

function startApp(pokeName) {
  
  requestPokeInfo(baseUrl, pokeName);
  cont += 1
  if (cont == 1) {
    info.style.display = 'none';
    loading.style.display = 'block'
    setTimeout(function () {
      container.innerHTML = createCard();
  }, 2000);  
  }
  else if (cont > 1) {
    container.innerHTML = `<div class="c-loader"></div>`;
    loader = getElement('.c-loader')
    loader.style.display = 'block'
    setTimeout(function () {
      container.innerHTML = createCard();
  }, 2000);
  }
  
}

function createCard () {
   card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
    </div>`;
  return card;
  
}
