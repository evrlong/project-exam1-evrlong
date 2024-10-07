import { renderHeader } from './js/components/headerComponent.js';
import { renderFooter } from './js/components/footerComponent.js';
import { fetchData } from './js/data/fetchData.js'; // Riktig path til fetchData
import { renderBlogCard } from './js/data/renderBlogCard.js'; // Importer renderBlogCard

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();  // Render the header at the top of the page
    renderFooter();  // Render the footer at the bottom of the page
    
    fetchData();     // Hent data fra API etter at header og footer er rendret
    renderBlogCard(); // Render bloggkort (bilder og annen data) etter at data er hentet
});
