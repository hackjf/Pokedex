class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.weight = data.weight;
        this.abilities = data.abilities;
        this.image = data.ThumbnailImage;
    }

    createCard() {
        let card = document.createElement("div");
        card.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");
        card.style.width = "18rem";
        card.innerHTML = `
            <img src="${this.image}" class="card-img-top" alt="${this.name}">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">Type: ${this.type.join(", ")}</p>
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal" onclick="displayPokemonInfo(${this.id})">Ver detalles</a>
            </div>
        `;
        return card;
    }
    
}

$("#search").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $("#pokemonList .card").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#pokemonList").hide().fadeIn(500);
});


let pokemonList = [];

fetch('source/pokemons.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            let pokemon = new Pokemon(item);
            pokemonList.push(pokemon);
            document.getElementById("pokemonList").appendChild(pokemon.createCard());
        });
    });

function displayPokemonInfo(id) {
    let pokemon = pokemonList.find(p => p.id === id);
    document.getElementById("pokemonModalLabel").innerText = pokemon.name;
    document.getElementById("pokemonModalBody").innerHTML = `
        <img src="${pokemon.image}" class="img-fluid" alt="${pokemon.name}">
        <p>Type: ${pokemon.type.join(", ")}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Abilities: ${pokemon.abilities.join(", ")}</p>
    `;
}

document.getElementById("search").addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    document.getElementById("pokemonList").innerHTML = "";
    pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(value)).forEach(pokemon => {
        document.getElementById("pokemonList").appendChild(pokemon.createCard());
    });
});

