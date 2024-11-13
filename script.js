import { fetchData } from './js/data/fetchDataWithMedia.js';
import { renderHeader } from './js/components/headerComponent.js';
import { renderFooter } from './js/components/footerComponent.js';
import { createBurgerMenu } from './js/components/burgerMenu.js';


document.addEventListener('DOMContentLoaded', () => {
  fetchData(); // api call to get data from the server
  renderHeader(); // Render the header at the top of the page
  renderFooter(); // Render the footer at the bottom of the page
createBurgerMenu(); // Create the burger menu

});
