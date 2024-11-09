import { fetchData } from '../data/fetchDataWithMedia.js';
import { renderBlogCardsSet } from './blogCardRenderer.js';

let currentPage = 1; // Start at the first page
const postsPerPage = 4; // Number of posts to fetch per page
let posts = []; // To store all posts

// Referanser til loader- og loadedContent-elementene
const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const nextBlogCardsButton = document.getElementById('nextBlogCards');
const previousBlogCardsButton = document.getElementById('previousBlogCards');

document
  .getElementById('nextBlogCards')
  .addEventListener('click', renderNextBlogCards);
document
  .getElementById('previousBlogCards')
  .addEventListener('click', renderPreviousBlogCards);

export async function renderBlogCard() {
  try {
    // Vis loaderen og skjul innholdet mens vi henter data
    loader.style.display = "block";
    loadedContent.style.display = "none";

    // Fetch posts for the current page
    posts = await fetchData(postsPerPage, currentPage);

    // Render bloggkortene hvis de finnes
    if (posts && posts.length > 0) {
      renderBlogCardsSet(posts, 'blogCardContainer'); // Pass the posts and container ID

      // Check if fewer than 4 posts were returned
      if (posts.length < postsPerPage) {
        nextBlogCardsButton.style.opacity = '0.5';
        nextBlogCardsButton.style.pointerEvents = 'none'; // Make it unclickable
      } else {
        nextBlogCardsButton.style.opacity = '1';
        nextBlogCardsButton.style.pointerEvents = 'auto'; // Make it clickable
      }
    } else {
      console.log('No more posts available.');
      nextBlogCardsButton.style.opacity = '0.5';
      nextBlogCardsButton.style.pointerEvents = 'none'; // Make it unclickable if no posts
    }
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    // Skjul loaderen og vis innholdet når alt er ferdig
    loader.style.display = "none";
    loadedContent.style.display = "block";
  }
}

// Function to render the next set of blog cards
// Function to render the next set of blog cards
async function renderNextBlogCards() {
  currentPage++; // Move to the next page
  await renderBlogCard(); // Fetch and render posts for the new page
  updatePreviousButton(); // Oppdater previous-knappen etter å ha navigert til neste side
}

// Function to render the previous set of blog cards
async function renderPreviousBlogCards() {
  if (currentPage === 1) {
    return; // Hvis på første side, gjør ingenting
  }

  currentPage--; // Gå til forrige side
  await renderBlogCard(); // Hent og render nye innlegg
  updatePreviousButton(); // Oppdater previous-knappen etter å ha navigert til forrige side
}

// Check if we are on the first page and update the previous button
function updatePreviousButton() {
  if (currentPage === 1) {
    previousBlogCardsButton.style.opacity = '0.5';
    previousBlogCardsButton.style.pointerEvents = 'none'; // Deaktiver klikkbarhet
  } else {

    previousBlogCardsButton.style.opacity = '1';
    previousBlogCardsButton.style.pointerEvents = 'auto'; // Aktiver klikkbarhet
  }
}

updatePreviousButton();
