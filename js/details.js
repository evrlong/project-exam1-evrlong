// details.js: This is the main file that will be used to render the blog post details on the details.html page.

import { fetchData } from './data/fetchDataWithMedia.js';

// Fetch data for a single post
export async function renderDetailPage() {
  // Get the post ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // Fetch the post data
  const post = await fetchData(1, 1, postId);

  if (post && post.length > 0) {
    renderPostDetails(post[0]);
  }
}

function renderPostDetails(post) {
  const titleElement = document.getElementById('postTitle');
  titleElement.textContent = post?.title?.rendered || 'No title';

  const title = post?.title?.rendered || 'No title';
  document.title = title;

  const dateElement = document.getElementById('postDate');
  const dateTime = post?.date || 'No date';
  const dateOnly = dateTime.split('T')[0]; // Extract only date
  dateElement.textContent = dateOnly || 'No date';

  const contentElement = document.getElementById('postContent');
  contentElement.innerHTML = post?.content?.rendered || 'No content';

  // Add click event to images for enlarging
  const images = contentElement.querySelectorAll('img');

  images.forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => enlargeImage(img.src)); // Enlarge on click
  });
}

// Function to enlarge an image
function enlargeImage(src) {
  const overlay = document.getElementById('overlay');
  const enlargedImage = document.getElementById('enlargedImage');
  enlargedImage.src = src;
  overlay.style.display = 'flex'; // Show overlay
}

// Close overlay on clicking outside the enlarged image
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.style.display = 'none'; // Hide overlay
  }
});

renderDetailPage();
