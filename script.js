// Global Variables
const API_URL = "https://pokeapi.co/api/v2/pokemon";
let offset = 0; // Offset for pagination
const limit = 12; // Number of Pokémon to load per request
const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Load saved favourites

// Show Favorites Modal
document.getElementById("viewFavorites").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior

    const favoritesModal = document.querySelector(".favourites-modal");
    const favoritesContent = document.querySelector(".favourites-modal-content");

    // Clear old content
    favoritesContent.innerHTML = "";

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (savedFavorites.length === 0) {
        favoritesContent.innerHTML = "<p>No Pokémon caught yet!</p>";
    } else {
        savedFavorites.forEach(pokemon => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");
            card.innerHTML = `
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            `;
            card.addEventListener("click", () => {
                openModal(pokemon); // Open modal with Pokémon details from favorites
            });
            favoritesContent.appendChild(card);
        });
    }

    // Show the modal
    favoritesModal.style.display = "block";
});

// Close Favorites Modal
document.querySelector(".favourites-modal-close").addEventListener("click", () => {
    const favoritesModal = document.querySelector(".favourites-modal");
    favoritesModal.style.display = "none";
});

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

async function renderPokemon(clearGrid = true) {
    const pokemonGrid = document.querySelector(".pokemon-grid");

    // Clear the grid only if clearGrid is true
    if (clearGrid) {
        pokemonGrid.innerHTML = "";
    }

    // Fetch Pokémon data
    const pokemonList = await fetchPokemon(offset, limit);

    // Avoid duplicates by tracking already added Pokémon IDs
    const existingIds = Array.from(
        pokemonGrid.querySelectorAll(".pokemon-card")
    ).map((card) => card.dataset.id);

    // Sort the Pokémon list based on the selected filter
    const filterBy = document.querySelector('input[name="filter"]:checked').value;
    if (filterBy === "name") {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        pokemonList.sort((a, b) => {
            const idA = parseInt(a.url.split("/").filter(Boolean).pop());
            const idB = parseInt(b.url.split("/").filter(Boolean).pop());
            return idA - idB;
        });
    }

    // Append each Pokémon to the grid
    for (const pokemon of pokemonList) {
        const details = await fetchPokemonDetails(pokemon.url);

        // Skip appending if this Pokémon is already in the grid
        if (existingIds.includes(String(details.id))) {
            continue;
        }

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.dataset.id = details.id; // Use dataset to track IDs
        card.innerHTML = `
            <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
            <span class="pokemon-number">#${details.id.toString().padStart(3, "0")}</span>
            <h3>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h3>
        `;
        card.addEventListener("click", () => openModal(details));

        pokemonGrid.appendChild(card);
    }
}


// Load More functionality
document.querySelector(".load-more button").addEventListener("click", () => {
    offset += limit; // Increment the offset to load the next set of Pokémon
    renderPokemon(false); // Append new Pokémon without clearing the grid
});

document.getElementById("searchButton").addEventListener("click", async () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const pokemonGrid = document.querySelector(".pokemon-grid");
    const loadMoreButton = document.querySelector(".load-more button");

    pokemonGrid.innerHTML = ""; // Clear the grid

    try {
        // Fetch Pokémon by name or number
        const response = await fetch(`${API_URL}/${searchTerm}`);
        const pokemonData = await response.json();

        // Create and display a single Pokémon card
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.dataset.id = pokemonData.id; // Use dataset to track IDs
        card.innerHTML = `
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
            <span class="pokemon-number">#${pokemonData.id.toString().padStart(3, "0")}</span>
            <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
        `;
        card.addEventListener("click", () => openModal(pokemonData));
        pokemonGrid.appendChild(card);

        // Reset offset to avoid conflicts with pagination
        offset = 0;

        // Hide "Load More" button for search results
        loadMoreButton.style.display = "none";
    } catch (error) {
        // Display error message if Pokémon not found
        pokemonGrid.innerHTML = `<p>Pokémon not found. Please try another search.</p>`;

        // Adjust "Load More" button to provide a way back to full list
        loadMoreButton.textContent = "Back";
        loadMoreButton.style.display = "block";
        loadMoreButton.onclick = () => {
            document.getElementById("search").value = ""; // Clear search input
            loadMoreButton.textContent = "More"; // Reset button text
            loadMoreButton.style.display = "block"; // Show "More" button
            offset = 0; // Reset offset
            renderPokemon(true); // Reload Pokémon grid
        };
    }
});


// Allow pressing Enter to trigger the search
document.getElementById("search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

// Handle "More" button when no Pokémon are found

// Open Modal
function openModal(details) {
    document.getElementById("modalPokemonName").textContent = details.name.charAt(0).toUpperCase() + details.name.slice(1);
    document.getElementById("modalPokemonImage").src = details.image || details.sprites.other['official-artwork'].front_default;
    document.getElementById("modalPokemonWeight").textContent = details.weight ? `${details.weight / 10} kg` : "N/A";
    document.getElementById("modalPokemonHeight").textContent = details.height ? `${details.height / 10} m` : "N/A";
    document.getElementById("modalPokemonMoves").textContent = details.abilities ?
        details.abilities.map(ability => ability.ability.name).join(", ") :
        "N/A";
    document.getElementById("modalPokemonDescription").textContent = details.description || "No description available.";

    document.querySelector(".modal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.querySelector(".modal").style.display = "none";
}

// Filter Change functionality
document.querySelectorAll('input[name="filter"]').forEach((filter) => {
    filter.addEventListener("change", () => {
        offset = 0; // Reset offset for pagination
        renderPokemon(true); // Clear the grid and re-render Pokémon with the new filter
    });
});

// Filter Change Functionality
document.querySelectorAll('input[name="filter"]').forEach((filter) => {
    filter.addEventListener("change", () => {
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

// Initial Render
renderPokemon(true);

// Close Notification Modal
document.getElementById("closeNotification").addEventListener("click", () => {
    const notificationModal = document.getElementById("notificationModal");
    notificationModal.style.display = "none";
});

