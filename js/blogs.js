// root/blogs.js
import { renderInitialBlogCards, showMoreBlogCards } from './data/RenderTenCards.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load initial blog cards
    renderInitialBlogCards();

    // Set up event listener for the "show more" button
    document.querySelector('.showMoreBtn').addEventListener('click', showMoreBlogCards);
});
   