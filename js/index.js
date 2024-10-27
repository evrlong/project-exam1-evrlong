//index.js: This is the main file that will be used to render the blog cards on the index.html page.

import { renderBlogCard } from './components/renderBlogCard.js'; // import renderBlogCard function from renderBlogCard.js

document.addEventListener('DOMContentLoaded', () => {
    renderBlogCard(); // Render the blog cards
});


