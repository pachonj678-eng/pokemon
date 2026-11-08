const pokemonInput = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const pokemonCard = document.getElementById('pokemon-card');
const errorMessage = document.getElementById('error-message');

const pokemonImg = document.getElementById('pokemon-img');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');

async function getPokemon(param) {
    const query = param.trim().toLowerCase();
    if (!query) return;

    try {
        // Consumo de API de terceros mediante fetch (asíncrono)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();
        renderPokemon(data);

    } catch (error) {
        showError();
    }
}

function renderPokemon(data) {
    errorMessage.classList.add('hidden');
    pokemonCard.classList.remove('hidden');

    // Mapeo e interpretación de la respuesta JSON
    pokemonImg.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    pokemonName.textContent = data.name;
    pokemonId.textContent = data.id;

    // Extraer tipos
    const types = data.types.map(item => item.type.name).join(', ');
    pokemonTypes.textContent = types;

    // Conversión de unidades (decímetros a metros, hectogramos a kilos)
    pokemonHeight.textContent = (data.height / 10).toFixed(1);
    pokemonWeight.textContent = (data.weight / 10).toFixed(1);
}

function showError() {
    pokemonCard.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    getPokemon(pokemonInput.value);
});

pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getPokemon(pokemonInput.value);
    }
});

// Cargar un Pokémon inicial por defecto al abrir la página
getPokemon('1');