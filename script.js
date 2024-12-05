// Global Variables
const API_URL = "https://pokeapi.co/api/v2/pokemon";
let offset = 0; // Offset for pagination
const limit = 12; // Number of Pokémon to load per request
const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Load saved favourites
// Navigate to Favourites Page
document.getElementById("viewFavorites").addEventListener("click", () => {
    window.location.href = "favourites.html"; // Redirect to favourites page
});

if (document.title === "Favourites") {
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "index.html"; // Redirect to Pokédex page
        });
    }
}



// Fetch Pokémon data
async function fetchPokemon(offset, limit) {
    const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}

// Fetch detailed Pokémon data
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();

    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === "en"
    );

    return {
        ...data,
        description: descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ') : "Description not available."
    };
}

// Render Pokémon cards dynamically
async function renderPokemon() {
    const pokemonGrid = document.querySelector(".pokemon-grid");

    // Fetch Pokémon data for the current offset and limit
    const pokemonList = await fetchPokemon(offset, limit);

    // Sort the Pokémon list based on the selected filter
    const filterBy = document.querySelector('input[name="filter"]:checked').value;
    if (filterBy === "name") {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // Sort by number (already sorted by default in the API response)
        pokemonList.sort((a, b) => {
            const idA = parseInt(a.url.split("/").filter(Boolean).pop());
            const idB = parseInt(b.url.split("/").filter(Boolean).pop());
            return idA - idB;
        });
    }

    // Append each Pokémon to the grid
    for (const pokemon of pokemonList) {
        const details = await fetchPokemonDetails(pokemon.url);

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
            <span class="pokemon-number">#${details.id.toString().padStart(3, '0')}</span>
            <h3>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h3>
        `;
        card.addEventListener("click", () => openModal(details));

        // Append the card to the grid
        pokemonGrid.appendChild(card);
    }
}

document.querySelector(".load-more button").addEventListener("click", () => {
    offset += limit; // Increment the offset to load the next set of Pokémon
    renderPokemon(); // Fetch and render the next batch of Pokémon
});


// Search Functionality
document.getElementById("searchButton").addEventListener("click", async () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const pokemonGrid = document.querySelector(".pokemon-grid");
    pokemonGrid.innerHTML = ""; // Clear the current Pokémon grid

    try {
        // Fetch Pokémon by name or number
        const response = await fetch(`${API_URL}/${searchTerm}`);
        const pokemonData = await response.json();

        // Fetch species data for description
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        const descriptionEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === "en"
        );

        const description = descriptionEntry
            ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ')
            : "Description not available.";

        pokemonData.description = description;

        // Create and display a single Pokémon card
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
            <span class="pokemon-number">#${pokemonData.id.toString().padStart(3, '0')}</span>
            <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
        `;
        card.addEventListener("click", () => openModal(pokemonData));
        pokemonGrid.appendChild(card);

        // Reset offset to avoid conflicts with pagination
        offset = 0;
    } catch (error) {
        // Display error message if Pokémon not found
        pokemonGrid.innerHTML = `<p>Pokémon not found. Please try another search.</p>`;
    }
});

// Allow pressing Enter to trigger the search
document.getElementById("search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

// Reset Search and Return to Default View
document.querySelector(".load-more button").addEventListener("click", () => {
    const errorMessage = document.querySelector(".pokemon-grid p");
    if (errorMessage) {
        errorMessage.remove(); 
    }
    offset += limit;
    renderPokemon(); 
});



// Open Modal
function openModal(details) {
    document.getElementById("modalPokemonName").textContent = details.name.charAt(0).toUpperCase() + details.name.slice(1);
    document.getElementById("modalPokemonImage").src = details.sprites.other['official-artwork'].front_default;
    document.getElementById("modalPokemonWeight").textContent = `${details.weight / 10} kg`;
    document.getElementById("modalPokemonHeight").textContent = `${details.height / 10} m`;
    document.getElementById("modalPokemonMoves").textContent = details.abilities.map(ability => ability.ability.name).join(", ");
    document.getElementById("modalPokemonDescription").textContent = details.description;

    const statsContainer = document.getElementById("modalPokemonStats");
    statsContainer.innerHTML = "";
    details.stats.forEach(stat => {
        const statDiv = document.createElement("div");
        statDiv.innerHTML = `
            <strong>${stat.stat.name.toUpperCase()}:</strong>
            <div class="stat-bar" style="width: ${stat.base_stat}%;"></div> ${stat.base_stat}
        `;
        statsContainer.appendChild(statDiv);
    });

    document.querySelector(".modal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.querySelector(".modal").style.display = "none";
}

// Event Listeners
document.querySelector(".load-more button").addEventListener("click", () => {
    offset += limit;
    renderPokemon();
});

document.querySelectorAll('input[name="filter"]').forEach(filter => {
    filter.addEventListener("change", () => {
        offset = 0; // Reset offset
        renderPokemon(); // Re-render Pokémon with new filter
    });
});

// Initial Render
renderPokemon();




// Catch Pokémon Functionality
document.getElementById("catchButton").addEventListener("click", () => {
    const modalName = document.getElementById("modalPokemonName").textContent;
    const modalImage = document.getElementById("modalPokemonImage").src;

    // Add the Pokémon to the favorites array
    const pokemon = { name: modalName, image: modalImage };
    if (!favorites.find(fav => fav.name === pokemon.name)) {
        favorites.push(pokemon);
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Save to localStorage
    }

    // Show notification modal
    const notificationModal = document.getElementById("notificationModal");
    const notificationMessage = document.getElementById("notificationMessage");
    notificationMessage.textContent = `${modalName} has been added to your favourites!`;
    notificationModal.style.display = "flex";
});

// Load Favourites on Favourites Page
if (document.title === "Favourites") {
    const pokemonGrid = document.querySelector(".pokemon-grid");
    const savedFavorites = JSON.parse(localStorage.getItem("favorites.html")) || [];

    if (savedFavorites.length === 0) {
        pokemonGrid.innerHTML = "<p>No Pokémon caught yet!</p>";
    } else {
        savedFavorites.forEach(pokemon => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");
            card.innerHTML = `
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            `;
            pokemonGrid.appendChild(card);
        });


    }
}

// Close Notification Modal
document.getElementById("closeNotification").addEventListener("click", () => {
    const notificationModal = document.getElementById("notificationModal");
    notificationModal.style.display = "none"; 
});


document.querySelectorAll('input[name="filter"]').forEach(filter => {
    filter.addEventListener("change", () => {
        offset = 0; // Reset offset
        document.querySelector(".pokemon-grid").innerHTML = ""; // Clear the grid
        renderPokemon(); // Reload Pokémon based on the new filter
    });
});


document.querySelectorAll('input[name="filter"]').forEach(filter => {
    filter.addEventListener("change", () => {
        offset = 0; 
        document.querySelector(".pokemon-grid").innerHTML = ""; 
        renderPokemon(); 

        // Update the search button icon based on the selected filter
        const searchIcon = document.getElementById("searchIcon");
        const filterBy = document.querySelector('input[name="filter"]:checked').value;

        if (filterBy === "name") {
            searchIcon.src = "/images/font-solid.svg"; 
            searchIcon.alt = "Search by Name";
        } else if (filterBy === "number") {
            searchIcon.src = "/images/hashtag-solid.svg"; 
            searchIcon.alt = "Search by Number";
        }
    });
});
