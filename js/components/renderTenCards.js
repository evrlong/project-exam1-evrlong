import { fetchData } from '../data/fetchDataWithMedia.js'; // Path to fetchData

let currentPage = 1; // Start at the first page
const postsPerPage = 10; // Number of posts to fetch per page
let posts = []; // To store all posts

const loader = document.getElementById('loader');
const loadedContent = document.querySelector('.loadedContent');
const showMoreBtn = document.querySelector('.showMoreBtn'); // "Show More" button

export async function renderInitialBlogCards() {
  await renderBlogCards();
}

export async function showMoreBlogCards() {
  console.log('Show more blog cards', currentPage);
  currentPage++;
  await renderBlogCards();
}

async function renderBlogCards() {
  try {
    loader.style.display = "block";
    loadedContent.style.display = "none";

    // Fetch posts for the current page
    const fetchedPosts = await fetchData(postsPerPage, currentPage);
    console.log('current page', currentPage);
    console.log('fetched posts', fetchedPosts);

    // Check if fetchedPosts is null or undefined
    if (!fetchedPosts) {
      console.log('No posts returned.');
      showMoreBtn.style.display = 'none'; // Hide the button
      return; // Exit the function early if no posts are returned
    }

    if (fetchedPosts.length === 0) {
      console.log('No more posts available.');
      showMoreBtn.style.display = 'none'; // Hide the button
      return;
    }

    // If fewer posts than expected are fetched, it means we've reached the last page
    if (fetchedPosts.length < postsPerPage) {
      showMoreBtn.disabled = true; // Disable the button
      showMoreBtn.style.cursor = 'disabled'; // Change the cursor to disabled
      showMoreBtn.textContent = 'No more posts'; // Change the text
    }

    console.log('postssss', posts);
    posts = posts.concat(fetchedPosts); // Combine new posts with existing ones
    renderBlogCardsSet(fetchedPosts);

  } catch (error) {
    console.error('Error rendering blog cards:', error);
  } finally {
    loader.style.display = "none";
    loadedContent.style.display = "block";
  }
}


function renderBlogCardsSet(postsToRender) {
  const container = document.getElementById('blogCardContainer'); // Make sure to create this container in your HTML

  postsToRender.forEach((post) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = `details.html?id=${post.id}`; // Set the link to details.html with the post ID as a query parameter

    const cardElement = document.createElement('div');
    cardElement.className = 'blogCard browseCard'; // Set the class to blogCard and browseCard

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
