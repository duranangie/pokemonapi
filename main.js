let apiURL = "https://650a3b71f6553137159c8368.mockapi.io/pokemon"
// Función para crear un nuevo Pokémon en la API mock
async function createPokemon(name, imageUrl) {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                imageUrl: imageUrl,
            }),
        });
        const data = await response.json();
        console.log(`Pokémon ${data.name} creado con éxito en la API mock.`);
    } catch (error) {
        console.error("Error al crear un Pokémon:", error);
    }
}

// Función para actualizar un Pokémon en la API mock
async function updatePokemon(id, name, imageUrl) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                imageUrl: imageUrl,
            }),
        });
        const data = await response.json();
        console.log(`Pokémon ${data.name} actualizado con éxito en la API mock.`);
    } catch (error) {
        console.error("Error al actualizar un Pokémon:", error);
    }
}

// Función para eliminar un Pokémon de la API mock
async function deletePokemon(id) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 204) {
            console.log(`Pokémon con ID ${id} eliminado con éxito de la API mock.`);
        } else {
            console.error(`Error al eliminar el Pokémon con ID ${id}.`);
        }
    } catch (error) {
        console.error("Error al eliminar un Pokémon:", error);
    }
}


async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        // Recorre los datos y muestra cada Pokémon en el HTML
        data.forEach((pokemon) => {
            const article = document.createElement("article");
            article.innerHTML = `
                <button><img class="show-image-button" src="${pokemon.imageUrl}" alt="${pokemon.name}"></button> 
                <h2>${pokemon.name}</h2>
            `;
            mainContainer.appendChild(article);

            const showImageButton = article.querySelector(".show-image-button");
            // Agrega el evento de SweetAlert para mostrar detalles y opciones CRUD aquí
        });
    } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
    }
}


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
            <button><img class="show-image-button" src="${pokemonData.sprites.front_default}" alt="${pokemonData.sprites.back_default}" alt= "${name}"></button> 
            <h2>${name}</h2>
            `;
            mainContainer.appendChild(article);


            const showImageButton = article.querySelector(".show-image-button");
            showImageButton.addEventListener("click", () => {
                const imageUrl = pokemonData.sprites.front_default;

                // Muestra la imagen en un modal utilizando SweetAlert
                Swal.fire({
                    title: `${pokemonData.name}`,
                    imageUrl: imageUrl,
                    imageAlt: "Imagen del Pokémon",
                    html: `${pokemonData.stats.map((data) => `
                        <div>
                            <input 
                                type="range" 
                                value="${data.base_stat}"
                            >
                            <label
                                data-name=${data.stat.name}></label><br>
                            <label>${data.stat.name}</label$><br>
                        </div>
                    `)
                        .join("")}`,
                    showCloseButton: true, // Muestra un botón para cerrar el modal,
                    showConfirmButton: true, // Muestra un botón para confirmar

                    // Agregar opciones para CRUD
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Eliminar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Guardar los datos en la API mock
                        const name = pokemonData.name;
                        createPokemon(name, imageUrl);
                    } else if (result.isDismissed) {
                        // Eliminar el Pokémon de la API mock
                        const id = pokemonData.id; // Asume que tienes un ID en los datos del Pokémon
                        deletePokemon(id);
                    }
                });

                let containerHtml = document.querySelector("#swal2-html-container");
                containerHtml.addEventListener("input", (e) => {
                    let mylabel = e.target.parentNode.children[1];
                    console.log(mylabel.dataset.name);
                    mylabel.innerHTML = e.target.value;
                });
            });

        } catch (error) {
            console.error(`Error al obtener información de ${name}:`, error);
        }


    }
}


traerpokemon(); 
