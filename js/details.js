//details.js: This is the main file that will be used to render the blog post details on the details.html page.

// import fetchData from "./fetchData.js";
import { fetchData } from './data/fetchData.js';

// Fetch data for a single post
export async function renderDetailPage() {
  // Get the post ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  console.log('Post ID:', postId);

  // Fetch the post data
  const post = await fetchData(1, 1, postId);

  if (post && post.length > 0) {
    renderPostDetails(post[0]);
  } else {
    console.log('No post found.');
  }
}

function renderPostDetails(post) {
  const titleElement = document.getElementById('postTitle');
  titleElement.textContent = post?.title?.rendered || 'No title';

  const dateElement = document.getElementById('postDate');  
  const dateTime = post?.date || 'No date';
  const dateOnly = dateTime.split('T')[0];
  dateElement.textContent = dateOnly || 'No date';

  const contentElement = document.getElementById('postContent');
  contentElement.innerHTML = post?.content?.rendered || 'No content';

 
}

renderDetailPage(); // Render the post details
