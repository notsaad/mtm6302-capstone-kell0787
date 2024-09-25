#Sophia Rodriguez-Kellett
#041-074-200
#Pokedex assignment


# Pokédex Mockup

This section describes the design and implementation steps for the Pokédex mockup.

## Styles

### Colors
The color scheme used in the Pokédex design reflects the various Pokémon types. Below are the key colors used:
- **Primary Color:** `#DC0A2D`
- **Type Colors:**
  - Bug: `#A7B723`
  - Dark: `#75574C`
  - Dragon: `#7037FF`
  - Electric: `#F9CF30`
  - Fairy: `#E69EAC`
  - Fighting: `#C12239`
  - Fire: `#F57D31`
  - Flying: `#A891EC`
  - Ghost: `#70559B`
  - Grass: `#74CB48`
  - Ground: `#DEC16B`
  - Ice: `#9AD6DF`
  - Poison: `#A43E9E`
  - Psychic: `#FB5584`
  - Rock: `#B69E31`
  - Steel: `#B7B9D0`
  - Water: `#6493EB`
  - Normal: `#AAA67F`

  -When Pokémon is searched, the view will change to be the same color as the pokemon type.

### Typography
We used a consistent typography hierarchy across the mockup. The key typographical styles are:
- **Headline (Bold, 24/32px)**
- **Subtitle 1 (Bold, 14/16px)**
- **Subtitle 2 (Bold, 12/16px)**
- **Body 1 (Regular, 14/16px)**
- **Body 2 (Regular, 12/16px)**
- **Caption (Regular, 8/12px)**

## Components

The Pokédex interface contains the following primary components:

### Search Bar
- Positioned at the top of the page, users can search for Pokémon by name or number.
  
### Pokémon Cards
- Displayed in a grid format, each card shows the Pokémon’s image, name, and Pokédex number.
- Cards have labels indicating the Pokémon’s type.

### Filters
- A filter section allows users to sort Pokémon by name or number.

### Pokémon Details
When a Pokémon card is clicked, a detailed view is shown with the following information:
- **Weight and Height:** Displayed in metric units.
- **Abilities:** The Pokémon’s abilities are listed, such as `Cute Charm` or `Synchronize`.
- **Moves:** A list of notable moves for the Pokémon, such as `Mega-Punch` or `Fire-Punch`.
- **Base Stats:** A breakdown of key statistics including HP, Attack (ATK), Defense (DEF), Special Attack (SATK), Special Defense (SDEF), and Speed (SPD).

## Wireframe Overview

### Desktop Layout
- The main interface has a header section with a search bar.
- Pokémon cards are shown in a multi-column grid.
- A sidebar contains sorting and filtering options (number, name).
- When a Pokémon is selected, a detailed view is shown on the right side of the screen.

### Mobile Layout
- On mobile devices, the layout is optimized for a triple-column view with cards.

## Summary

This mockup is designed to provide a user-friendly interface for navigating and exploring the Pokédex. By integrating search, filters, and detailed Pokémon information in a responsive layout, the mockup aims to deliver an intuitive experience for both desktop and mobile users.
