import { showErrorMessage } from '../components/errorMessage.js';

const BASE_URL = 'https://camp.evrlong.one/wp-json/wp/v2';

// Helper function to fetch media data
async function fetchMedia(mediaId) {
  try {
    const response = await fetch(`${BASE_URL}/media/${mediaId}`);
    if (!response.ok) {
      throw new Error(`Error fetching media for ID: ${mediaId} - ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    displayErrorMessage(`Failed to fetch media for ID: ${mediaId}.`);
    return null;
  }
}

// Fetch media data for a single post
async function fetchMediaForPost(post) {
  if (post.featured_media) {
    post.media = await fetchMedia(post.featured_media);
  }
  return post;
}

// Fetch media data for multiple posts
async function fetchMediaForPosts(posts) {
  return Promise.all(posts.map(fetchMediaForPost));
}

// Fetch posts from the API with media attached
export async function fetchData(perPage = 10, page = 1, postId = null) {
  const apiUrl = postId
    ? `${BASE_URL}/posts/${postId}`
    : `${BASE_URL}/posts?per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts - ${response.status}`);
    }

    const posts = await response.json();
    if (posts.length < perPage) {
      return fetchMediaForPosts(posts);
    }

    return postId ? [await fetchMediaForPost(posts)] : await fetchMediaForPosts(posts);
  } catch (error) {
    console.error(error);
    displayErrorMessage('An error occurred while fetching data.');
    return null;
  }
}

// Display error message
function displayErrorMessage(message) {
  const loadedContent = document.querySelector('.loadedContent');
  if (loadedContent) {
    showErrorMessage(loadedContent, message);
  }
}

// Render a single blog card
function renderBlogCard(post) {
  const container = document.querySelector('.blogCardsContainer');
  if (!container) return;

  const card = document.createElement('div');
  card.classList.add('blog-card');

  const title = document.createElement('h3');
  title.textContent = post.title.rendered;

  const image = document.createElement('img');
  if (post.media && post.media.source_url) {
    image.src = post.media.source_url;
  }

  card.appendChild(title);
  card.appendChild(image);
  container.appendChild(card);
}

// Render next set of blog cards triggered by the "Show More" button
export async function renderNextBlogCards(perPage = 10, currentPage = 1) {
  const posts = await fetchData(perPage, currentPage + 1);
  if (!posts) return;

  posts.forEach(renderBlogCard);

  // If there are fewer posts than requested, disable the "Show More" button
  if (posts.length < perPage) {
    disableShowMoreButton();
  }
}

// Disable the "Show More" button if no more posts are available
function disableShowMoreButton() {
  const showMoreBtn = document.querySelector('.showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.disabled = true;
  }
}

// Event listener for "Show More" button
const showMoreBtn = document.querySelector('.showMoreBtn');
let currentPage = 1; // Keep track of the current page
const perPage = 10;

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', async () => {
    // Fetch the next set of posts based on currentPage
    const posts = await fetchData(perPage, currentPage + 1); // Fetch the next page
    if (!posts) return;

    // Render the fetched posts
    posts.forEach(renderBlogCard);

    // Check if the number of posts is less than perPage to disable the "Show More" button
    if (posts.length < perPage) {
      disableShowMoreButton();
    }

    // Increment the page number after rendering posts
    currentPage++;
  });
}
