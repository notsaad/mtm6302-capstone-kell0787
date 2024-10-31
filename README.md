# Sophia Rodriguez-Kellett
# 041-074-200
# Pokedex


# Pokedex Prototype

This project is a prototype of a Pokedex designed to display a grid of Pokémon cards. Each card is clickable, opening a modal window that shows detailed information about the selected Pokémon. The prototype is created with HTML, CSS, and JavaScript, aiming to achieve a clean, responsive, and interactive design.

---

## Project Features

1. **Responsive Grid Layout** - Pokémon are displayed in a grid layout, adjusting dynamically to screen size.
2. **Clickable Pokémon Cards** - Each Pokémon card opens a modal when clicked, displaying the Pokémon's name, type, weight, height, moves, description, and base stats.
3. **Modal Pop-Up** - A modal window with Pokémon details opens when a card is clicked, featuring a close button to return to the main view.


---

## Technologies Used

- **HTML**: Structure and layout of the page.
- **CSS**: Styling of the Pokedex, Pokémon cards, and modal.
- **JavaScript**: Interactivity, including modal functionality, search/filter logic, and event handling for clicking Pokémon cards.

---

## Implementation Steps

### 1. Setting Up the HTML Structure
   - Created a header with a logo, search bar, and filter options.
   - Designed the Pokémon grid layout, placing placeholder cards for each Pokémon in `.pokemon-card` elements.
   - Added a `More` button below the Pokémon grid to load additional Pokémon as needed.

### 2. Styling with CSS
   - Defined global font styles using **Gigalypse** for a bold and consistent look across all text.
   - Styled the Pokémon grid to display cards in a responsive grid using `grid-template-columns` and `auto-fill`.
   - Designed the `.pokemon-card` elements to have rounded edges, hover effects, and a top-right label for Pokémon numbers.
   - Created a `.modal` and `.modal-content` structure for t

---

## Challenges Faced

### 1. Modal Responsiveness and Centering
   One of the primary challenges encountered was ensuring the modal displayed correctly on various screen sizes. Initially, the modal appeared too large and was not centered properly. Adjustments were made to the `max-width`, `width`, and centering properties, and flexbox alignment was applied to achieve a balanced appearance across different devices.

### 2. CSS Grid Layout for Pokémon Cards
   The CSS grid layout for the Pokémon cards presented alignment issues, especially when adding more cards with the "Load More" button. Ensuring a responsive, flexible grid that maintained consistency across screen sizes required experimentation with `grid-template-columns`, `gap`, and `padding` properties.

These challenges provided valuable learning experiences and allowed for optimization of CSS and JavaScript techniques, enhancing the overall functionality and responsiveness of the Pokedex prototype.
