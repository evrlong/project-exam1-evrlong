//renderTenCards.js: This file will be used to render the blog cards on the blogs.html page.

import { fetchData } from '../data/fetchData.js'; // Path to fetchData

let currentPage = 1; // Start at the first page
const postsPerPage = 10; // Number of posts to fetch per page
let posts = []; // To store all posts

export async function renderInitialBlogCards() {
  await renderBlogCards();
}

export async function showMoreBlogCards() {
  currentPage++;
  await renderBlogCards();
}

async function renderBlogCards() {
  try {
    // Fetch posts for the current page
    const fetchedPosts = await fetchData(postsPerPage, currentPage);

    if (!fetchedPosts || fetchedPosts.length === 0) {
      console.log('No more posts available.');
      return;
    }

    posts = posts.concat(fetchedPosts); // Combine new posts with existing ones
    renderBlogCardsSet(fetchedPosts);
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  }
}

function renderBlogCardsSet(postsToRender) {
  const container = document.getElementById('blogCardContainer'); // Make sure to create this container in your HTML

  postsToRender.forEach((post) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = `details.html?id=${post.id}`; // Set the link to details.html with the post ID as a query parameter

    const cardElement = document.createElement('div');
    cardElement.className = 'blog-card'; // Set the class to blog-card

    anchorElement.appendChild(cardElement); // Wrap the div inside the anchor

    const imageUrl = post.media?.source_url || '';
    const title = post.title?.rendered || 'Empty title';

    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = title;
      cardElement.appendChild(img);
    }

    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    cardElement.appendChild(titleElement);

    container.appendChild(anchorElement); // Append the anchor (not card) to the container
  });
}
