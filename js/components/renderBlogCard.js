//renderblogcard.js: This file will be used to render the blog cards on the index.html page.

import { fetchData } from '../data/fetchData.js';
import { renderBlogCardsSet } from './blogCardRenderer.js';

let currentPage = 1; // Start at the first page
const postsPerPage = 4; // Number of posts to fetch per page
let posts = []; // To store all posts

document
  .getElementById('nextBlogCards')
  .addEventListener('click', renderNextBlogCards);
document
  .getElementById('previousBlogCards')
  .addEventListener('click', renderPreviousBlogCards);

export async function renderBlogCard() {
  try {
    // Fetch posts for the current page
    posts = await fetchData(postsPerPage, currentPage);

    if (posts && posts.length > 0) {
      renderBlogCardsSet(posts, 'blogCardContainer'); // Pass the posts and container ID
    } else {
      console.log('No more posts available.');
    }
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  }
}

// Function to render the next set of blog cards
async function renderNextBlogCards() {
  currentPage++; // Move to the next page
  await renderBlogCard(); // Fetch and render posts for the new page
}

// Function to render the previous set of blog cards
async function renderPreviousBlogCards() {
  if (currentPage > 1) {
    currentPage--; // Move to the previous page
    await renderBlogCard(); // Fetch and render posts for the new page
  }
}
