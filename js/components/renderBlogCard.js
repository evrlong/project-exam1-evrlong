// renderBlogCard.js

import { fetchData } from '../data/fetchDataWithMedia.js';

let currentPage = 1;
const postsPerPage = 4;

const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const nextBlogCardsButton = document.getElementById('nextBlogCards');
const previousBlogCardsButton = document.getElementById('previousBlogCards');

// Set up event listeners for pagination
nextBlogCardsButton.addEventListener('click', renderNextBlogCards);
previousBlogCardsButton.addEventListener('click', renderPreviousBlogCards);

// Main function to fetch and render blog cards
export async function renderBlogCard() {
  try {
    toggleLoader(true);

    const posts = await fetchData(postsPerPage, currentPage);

    if (posts && posts.length > 0) {
      renderBlogCardsSet(posts, 'blogCardContainer');
      toggleNextButton(posts.length === postsPerPage); // Enable "Next" button if there are more posts to load
    } else {
      console.log('No more posts available.');
      toggleNextButton(false); // Disable "Next" button if there are no more posts
      showEndOfPostsMessage(); // Optional: Show a message indicating end of posts
    }
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    toggleLoader(false);
  }
}

// Helper function to toggle loader visibility
function toggleLoader(isLoading) {
  loader.style.display = isLoading ? "block" : "none";
  loadedContent.style.display = isLoading ? "none" : "block";
}

// Helper function to render a set of blog cards
function renderBlogCardsSet(posts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Clear previous content

  posts.forEach((post) => {
    const blogCard = createBlogCard(post);
    container.appendChild(blogCard);
  });
}

// Helper function to create a single blog card
function createBlogCard(post) {
  const anchorElement = document.createElement('a');
  anchorElement.href = `details.html?id=${post.id}`;

  const cardElement = document.createElement('div');
  cardElement.className = 'blogCard';

  if (post.media?.source_url) {
    const img = document.createElement('img');
    img.src = post.media.source_url;
    img.alt = `Image for ${post.title.rendered}`;
    cardElement.appendChild(img);
  }

  const titleElement = document.createElement('h4');
  titleElement.textContent = post.title.rendered || 'Empty title';
  cardElement.appendChild(titleElement);

  anchorElement.appendChild(cardElement);
  return anchorElement;
}

// Pagination functions
async function renderNextBlogCards() {
  currentPage++;
  await renderBlogCard();
  updatePreviousButton();
}

async function renderPreviousBlogCards() {
  if (currentPage > 1) {
    currentPage--;
    await renderBlogCard();
    updatePreviousButton();
  }
}

// Helper function to toggle button states
function toggleNextButton(isEnabled) {
  nextBlogCardsButton.style.opacity = isEnabled ? '1' : '0.5';
  nextBlogCardsButton.style.pointerEvents = isEnabled ? 'auto' : 'none';
}

function updatePreviousButton() {
  const isEnabled = currentPage > 1;
  previousBlogCardsButton.style.opacity = isEnabled ? '1' : '0.5';
  previousBlogCardsButton.style.pointerEvents = isEnabled ? 'auto' : 'none';
}

// Optional: Show a message when there are no more posts to load
function showEndOfPostsMessage() {
  const container = document.getElementById('blogCardContainer');
  const message = document.createElement('p');
  message.textContent = 'No more posts available.';
  message.className = 'end-of-posts-message'; // Optional styling class
  container.appendChild(message);
}

// Initialize by rendering the first page
updatePreviousButton();
renderBlogCard();
