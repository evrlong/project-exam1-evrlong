// renderBlogCard.js

import { fetchData } from '../data/fetchDataWithMedia.js';
import { BASE_URL } from '../data/fetchDataWithMedia.js';

let currentPage = 1;
const postsPerPage = 4;

const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const nextBlogCardsButton = document.getElementById('nextBlogCards');
const previousBlogCardsButton = document.getElementById('previousBlogCards');

// Set up event listeners for pagination
nextBlogCardsButton.addEventListener('click', renderNextBlogCards);
previousBlogCardsButton.addEventListener('click', renderPreviousBlogCards);

// Function to count the total number of posts
async function countPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts?_fields=id&per_page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const totalPostsCount = response.headers.get('X-WP-Total');
    return parseInt(totalPostsCount, 10);
  } catch (error) {
    console.error('Error counting posts:', error);
    return 0;
  }
}

// Main function to fetch and render blog cards
export async function renderBlogCard() {
  try {
    toggleLoader(true);

    // Get the total post count using countPosts()
    const totalPostsCount = await countPosts();

    const posts = await fetchData(postsPerPage, currentPage);

    if (posts && posts.length > 0) {
      renderBlogCardsSet(posts, 'blogCardContainer');

      // Check if there are more posts based on the total post count
      const hasMorePosts =
        posts.length === postsPerPage &&
        currentPage * postsPerPage < totalPostsCount;
      toggleNextButton(hasMorePosts);
    } else {
      toggleNextButton(false);
    }
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    toggleLoader(false);
  }
}

// Helper function to toggle loader visibility
function toggleLoader(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
  loadedContent.style.display = isLoading ? 'none' : 'block';
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

  // Check for thumbnail URL
  if (post.media?.media_details?.sizes?.thumbnail?.source_url) {
    const img = document.createElement('img');
    img.src = post.media.media_details.sizes.thumbnail.source_url; // Use thumbnail size
    img.alt = `Thumbnail for ${post.title.rendered}`;
    cardElement.appendChild(img);
  } else if (post.media?.source_url) {
    // Fallback to full image if thumbnail doesn't exist
    const img = document.createElement('img');
    img.src = post.media.source_url;
    img.alt = `Image for ${post.title.rendered}`;
    cardElement.appendChild(img);
  }

  const titleElement = document.createElement('h2');
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

// Initialize by rendering the first page
updatePreviousButton();
renderBlogCard();
