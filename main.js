async function getpokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name);


    } catch (error) {
        console.error("Error al obtener la lista de nombres de Pokémon:", error);
        return [];
    }
}


async function traerpokemon() {
    const pokemonNames = await getpokemon();
    const mainContainer = document.querySelector("main");
    for (const name of pokemonNames) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await response.json();
            const article = document.createElement("article");
            article.innerHTML = `
            <img class="show-image-button" src="${pokemonData.sprites.front_default}" alt="${pokemonData.sprites.back_default}" alt= "${name}">
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
                    <input
                      type="range"
                      value="${data.base_stat}">
                    <label>
                      ${data.stat.name}</label><br>
                    `
                      )
                      .join("")}`,
                    showCloseButton: true, // Muestra un botón para cerrar el modal
                });
            });
        } catch (error) {
            console.error(`Error al obtener información de ${name}:`, error);
        }
    }
}


traerpokemon();