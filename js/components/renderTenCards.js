import { fetchData } from '../data/fetchDataWithMedia.js'; // Path to fetchData

let currentPage = 1; // Start at the first page
const postsPerPage = 10; // Number of posts to fetch per page
let posts = []; // To store all posts

const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const showMoreBtn = document.querySelector('.showMoreBtn'); // "Show More" button

// Function to render the initial blog cards
export async function renderInitialBlogCards() {
  await renderBlogCards();
}

// Function to load more blog cards when "Show More" is clicked
export async function showMoreBlogCards(event) {
  event.preventDefault();  // Prevent the default focus/scroll behavior of the button
  console.log('Show more blog cards, current page:', currentPage);
  currentPage++;  // Increment page number
  console.log('Fetching page:', currentPage);  // Log the current page before fetching
  await renderBlogCards();

  // Optional: Use scrollIntoView to keep the "Show More" button in view after loading
  showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Function to fetch and render the blog cards
async function renderBlogCards() {
  let fetchedPosts = []; // Initialize fetchedPosts outside of try-catch
  try {
    loader.style.display = "block"; // Show loader
    loadedContent.style.display = "none"; // Hide loaded content while loading

    // Fetch posts for the current page
    fetchedPosts = await fetchData(postsPerPage, currentPage);
    console.log('Fetched posts for page:', currentPage);
    console.log(fetchedPosts);  // Log fetched posts to check the data

    // If no posts were fetched, stop the process early
    if (!fetchedPosts || fetchedPosts.length === 0) {
      console.log('No posts available.');
      showMoreBtn.style.display = 'none'; // Hide "Show More" button
      loader.style.display = "none"; // Hide loader
      loadedContent.style.display = "block"; // Show content
      return;
    }

    // If fewer than expected posts were fetched, we're on the last page
    if (fetchedPosts.length < postsPerPage) {
      showMoreBtn.disabled = true;
      showMoreBtn.style.cursor = 'disabled';
      showMoreBtn.textContent = 'No more posts'; // Change button text
    } else {
      showMoreBtn.style.display = 'block'; // Ensure button is visible when more posts are available
    }

    // Add fetched posts to the list of posts
    posts = posts.concat(fetchedPosts);
    renderBlogCardsSet(fetchedPosts); // Render the fetched posts

  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    loader.style.display = "none"; // Hide loader after completion
    loadedContent.style.display = "block"; // Show content after loading
  }
}

// Function to render the fetched blog cards on the page
function renderBlogCardsSet(postsToRender) {
  const container = document.getElementById('blogCardContainer'); // Ensure this element exists in your HTML

  // Check if container exists before attempting to append elements
  if (!container) {
    console.error('Blog card container not found!');
    return;
  }

  postsToRender.forEach((post) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = `details.html?id=${post.id}`; // Set the link to details.html with the post ID as a query parameter

    const cardElement = document.createElement('div');
    cardElement.className = 'blogCard browseCard'; // Set the class to blogCard and browseCard

    anchorElement.appendChild(cardElement); // Wrap the div inside the anchor

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

    container.appendChild(anchorElement); // Append the anchor (not card) to the container
  });
}
