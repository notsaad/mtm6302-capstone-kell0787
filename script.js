
function openModal(pokemonName, imageSrc, type, weight, height, moves, description, stats) {
    // Populate modal content
    document.getElementById("modalPokemonName").textContent = pokemonName;
    document.getElementById("modalPokemonImage").src = imageSrc;
    document.getElementById("modalPokemonWeight").textContent = weight;
    document.getElementById("modalPokemonHeight").textContent = height;
    document.getElementById("modalPokemonMoves").textContent = moves;
    document.getElementById("modalPokemonDescription").textContent = description;

    // Populate stats
    const statsContainer = document.getElementById("modalPokemonStats");
    statsContainer.innerHTML = ""; // Clear previous stats
    stats.forEach(stat => {
        const statDiv = document.createElement("div");
        statDiv.innerHTML = `<strong>${stat.name}</strong>
                             <div class="stat-bar" style="width: ${stat.value}%;"></div> ${stat.value}`;
        statsContainer.appendChild(statDiv);
    });

    // Display the modal
    document.getElementById("pokemonModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("pokemonModal").style.display = "none";
}


document.querySelectorAll('.pokemon-card').forEach(card => {
    card.onclick = () => openModal(
        'Clefairy',                        // Pokémon name
        'images/clefairy.png',              // Image source
        'Fairy',                            // Type
        '16.5 lbs',                         // Weight
        '0.6m',                             // Height
        'Cute Charm, Magic Guard',          // Moves
        'On nights with a full moon, Clefairy gather from all over and dance. Bathing in moonlight makes them float.',
        [                                    // Stats array
            { name: "HP", value: 70 },
            { name: "ATK", value: 45 },
            { name: "DEF", value: 48 },
            { name: "SATK", value: 60 },
            { name: "SDEF", value: 65 },
            { name: "SPD", value: 35 }
        ]
    );
});

