import { fetchData } from '../data/fetchDataWithMedia.js'; // Path to fetchData

let currentPage = 1; // Start at the first page
const postsPerPage = 10; // Number of posts to fetch per page
let posts = []; // To store all posts

const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const showMoreBtn = document.querySelector('.showMoreBtn');

// Function to render the initial blog cards
export async function renderInitialBlogCards() {
  await renderBlogCards();
}

// Function to load more blog cards when "Show More" is clicked
export async function showMoreBlogCards(event) {
  event.preventDefault(); // Prevent scroll to bottom

  currentPage++; // Increment page number

  await renderBlogCards();

  //Scroll to button
  showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Function to fetch and render the blog cards
async function renderBlogCards() {
  let fetchedPosts = [];
  try {
    loader.style.display = 'block';
    loadedContent.style.display = 'none';

    // Fetch posts for the current page
    fetchedPosts = await fetchData(postsPerPage, currentPage);

    // If no posts were fetched, stop the process early
    if (!fetchedPosts || fetchedPosts.length === 0) {
      showMoreBtn.style.display = 'none';
      loader.style.display = 'none';
      loadedContent.style.display = 'block';
      return;
    }

    // If fewer than expected posts were fetched, we're on the last page
    if (fetchedPosts.length < postsPerPage) {
      showMoreBtn.disabled = true;
      showMoreBtn.style.cursor = 'disabled';
      showMoreBtn.textContent = 'No more posts';
    } else {
      showMoreBtn.style.display = 'block';
    }

    // Add fetched posts to the list of posts
    posts = posts.concat(fetchedPosts);
    renderBlogCardsSet(fetchedPosts);
  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    loader.style.display = 'none';
    loadedContent.style.display = 'block';
  }
}

// Function to render the fetched blog cards on the page
function renderBlogCardsSet(postsToRender) {
  const container = document.getElementById('blogCardContainer');

  // Check if container exists before attempting to append elements
  if (!container) {
    console.error('Blog card container not found!');
    return;
  }

  postsToRender.forEach((post) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = `details.html?id=${post.id}`;

    const cardElement = document.createElement('div');
    cardElement.className = 'blogCard browseCard';
    anchorElement.appendChild(cardElement);

    const imageUrl = post.media?.source_url || '';
    const title = post.title?.rendered || 'Empty title';

    // Add image if available
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = title;
      cardElement.appendChild(img);
    }

    // Add the title
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    cardElement.appendChild(titleElement);

    container.appendChild(anchorElement); // Append the anchor (!not card) to the container
  });
}
