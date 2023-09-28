let apiURL = "https://650a3b71f6553137159c8368.mockapi.io/pokemon"
// Función para crear un nuevo Pokémon en la API mock


async function getpokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=501");
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name);


    } catch (error) {
        console.error("Error al obtener la lista de nombres de Pokémon:", error);
        return [];
    }
}


//consumo de api 

async function traerpokemon() {
    const pokemonNames = await getpokemon();

    const mainContainer = document.querySelector("main");
    for (const name of pokemonNames) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await response.json();
            const article = document.createElement("article");
            article.innerHTML = `
            <button data-id="${pokemonData.id}"><img class="show-image-button" data-name="${pokemonData.name}" src="${pokemonData.sprites.front_default}" alt="${pokemonData.sprites.back_default}" alt="${name}"></button>
            <h2>${name}</h2>
        `;

            mainContainer.appendChild(article);


            const showImageButton = article.querySelector(".show-image-button");
            // ...

            showImageButton.addEventListener("click", async () => {
                console.log(showImageButton.dataset.name)
                let pokemon = await obtenerDatosPokemonMok(showImageButton.dataset.name);



                if (pokemon.length > 0) {
                    pokemon = pokemon[0];
                    Swal.fire({
                        title: `${pokemon.name}`,
                        imageUrl: pokemon.imageUrl,
                        imageAlt: "Imagen del Pokémon",
                        html: `
            <div>
                <input type="range" value="${pokemon.stats[0].value}" data-pokemon-stat="hp">
                <label>hp</label><br>
                <span class="stat-value"></span> 
            </div>
            <div>
                <input type="range" value="${pokemon.stats[1].value}" data-pokemon-stat="attack">
                <label>attack</label><br>
                <span class="stat-value"></span> 
            </div>
            <div>
                <input type="range"  value="${pokemon.stats[2].value}" data-pokemon-stat="defense">
                <label>defense</label><br>
                <span class="stat-value"></span> 
            </div>
            <div>
                <input type="range"  value="${pokemon.stats[3].value}" data-pokemon-stat="special-attack">
                <label>special-attack</label><br>
                <span class="stat-value"></span> 
            </div>
            <div>
                <input type="range"  value="${pokemon.stats[4].value}" data-pokemon-stat="special-defense">
                <label>special-defense</label><br>
                <span class="stat-value"></span> 
            </div>
            <div>
                <input type="range"  value="${pokemon.stats[5].value}" data-pokemon-stat="speed">
                <label>speed</label><br>
                <span class="stat-value"></span> 
            </div>
                `,
                        showCloseButton: true,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Guardar',

                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Guardar los datos en la API mock
                            const name = pokemonData.name;
                            const stats = Array.from(document.querySelectorAll('input[type="range"]')).map(input => ({
                                statName: input.getAttribute('data-pokemon-stat'),
                                value: input.value
                            }));
                            createOrUpdatePokemon(name, pokemon.imageUrl, stats);
                        } else if (result.isDismissed) {
                            // Eliminar el Pokémon de la API mock
                            const id = pokemonData.id; // Asume que tienes un ID en los datos del Pokémon
                        }
                    });
                } else {

                    Swal.fire({
                        title: `${pokemonData.name}`,
                        imageUrl: pokemonData.sprites.front_default,
                        imageAlt: "Imagen del Pokémon",
                        html: `${pokemonData.stats.map((data) => `
                    <div>
                        <input 
                            type="range" 
                            value="${data.base_stat}"
                            data-pokemon-stat="${data.stat.name}" <!-- Agregar un atributo data para identificar el stat -->
                        >
                        <label>${data.stat.name}</label><br>
                        <span class="stat-value"></span> <!-- Agregar un elemento para mostrar el valor actual -->
                    </div>
                `).join("")}`,
                        showCloseButton: true,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Guardar',

                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Guardar los datos en la API mock
                            const name = pokemonData.name;
                            const stats = Array.from(document.querySelectorAll('input[type="range"]')).map(input => ({
                                statName: input.getAttribute('data-pokemon-stat'),
                                value: input.value
                            }));
                            createOrUpdatePokemon(name, pokemonData.sprites.front_default, stats);
                        } else if (result.isDismissed) {
                            // Eliminar el Pokémon de la API mock
                            const id = pokemonData.id; // Asume que tienes un ID en los datos del Pokémon
                        }
                    });

                    const containerHtml = document.querySelector("#swal2-html-container");
                    containerHtml.addEventListener("input", (e) => {
                        if (e.target.type === "range") {
                            const label = e.target.nextElementSibling;
                            const statValue = e.target.value;
                            label.innerHTML = statValue;
                        }
                    });

                }



            });

            const statsPokemon = async (name) => {
                const existingPokemonResponse = await fetch(`${apiURL}?name=${name}`);
                if (existingPokemonData.length > 0) {
                    return existingPokemonData[0];
                } else {
                    return []
                }
            }

            // Función para crear o actualizar un Pokémon en la API mock con stats
            async function createOrUpdatePokemon(name, imageUrl, stats) {
                try {
                    // Primero, verifica si el Pokémon ya existe en la API mock
                    const existingPokemonResponse = await fetch(`${apiURL}?name=${name}`);
                    const existingPokemonData = await existingPokemonResponse.json();

                    if (existingPokemonData.length > 0) {
                        // Si existe, actualiza el Pokémon con nuevos stats
                        const existingPokemonId = existingPokemonData[0].id;
                        updatePokemon(existingPokemonId, name, imageUrl, stats);
                    } else {
                        // Si no existe, crea un nuevo Pokémon con stats
                        createPokemon(name, imageUrl, stats);
                    }
                } catch (error) {
                    console.error("Error al crear o actualizar un Pokémon:", error);
                }
            }

            // Función para crear un nuevo Pokémon en la API mock con stats
            async function createPokemon(name, imageUrl, stats) {
                try {
                    const response = await fetch(apiURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            imageUrl: imageUrl,
                            stats: stats, // Agregar stats al cuerpo de la solicitud
                        }),
                    });
                    const data = await response.json();
                    console.log(`Pokémon ${data.name} creado con éxito en la API mock.`);
                } catch (error) {
                    console.error("Error al crear un Pokémon:", error);
                }
            }

            // Función para actualizar un Pokémon en la API mock con stats
            async function updatePokemon(id, name, imageUrl, stats) {
                try {
                    const response = await fetch(`${apiURL}/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            imageUrl: imageUrl,
                            stats: stats, // Agregar stats al cuerpo de la solicitud
                        }),
                    });
                    const data = await response.json();
                    console.log(`Pokémon ${data.name} actualizado con éxito en la API mock.`);
                } catch (error) {
                    console.error("Error al actualizar un Pokémon:", error);
                }
            }

            // ...




        } catch (error) {
            console.error(`Error al obtener información de ${name}:`, error);
        }


    }

}



const obtenerDatosPokemonMok = async function (name) {
    let res = await (await fetch(apiURL)).json();
    let pokemon = res.filter((pok) => {
        return pok.name == name;
    });
    return pokemon



}












traerpokemon(); 
