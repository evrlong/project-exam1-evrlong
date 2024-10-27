//blogs.js: This is the main file that will be used to render the blog cards blogs.html.

import { renderInitialBlogCards, showMoreBlogCards } from './components/renderTenCards.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load initial blog cards
    renderInitialBlogCards();

    // Set up event listener for the "show more" button
    document.querySelector('.showMoreBtn').addEventListener('click', showMoreBlogCards);
});
   