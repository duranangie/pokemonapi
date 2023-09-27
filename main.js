let apiURL= "https://650a3b71f6553137159c8368.mockapi.io/"
async function crear(name){
    try{
        const response = await fetch(`${apiURL}/pokemon`,{
            method:"POST",
            headers:{
                "Content-Type":"aplication.json",},
            body: JSON.stringify(pokemonData),
        });

        if(response.ok){
            const pokemonData = await response.json();
            console.log("pokemon creado",pokemonData);
            return pokemonData;

        }else{
            console.error("Error en crear pokemon")
            return null;
        }



    }catch (error){
        console.error("error",error);
        return null;
     }
}

const nuevoPokemon = await crear('pikachu');
console.log({nuevoPokemon});



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
                    showCloseButton: true, // Muestra un botón para cerrar el modal

                })
                let containerHtml = document.querySelector("#swal2-html-container");
                containerHtml.addEventListener("input", (e) => {
                    let mylabel = e.target.parentNode.children[1];
                    console.log(mylabel.dataset.name);
                    mylabel.innerHTML = e.target.value;
                })

            })

        } catch (error) {
            console.error(`Error al obtener información de ${name}:`, error);
        }


    }
}


traerpokemon(); 

