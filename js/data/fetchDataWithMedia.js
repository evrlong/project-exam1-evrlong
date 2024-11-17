import { showErrorMessage } from '../components/errorMessage.js';

export const BASE_URL = 'https://camp.evrlong.one/wp-json/wp/v2';

// Fetch media data by media ID
export async function fetchMedia(mediaId) {
  try {
    const response = await fetch(`${BASE_URL}/media/${mediaId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching media for ID: ${mediaId} - ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    displayErrorMessage(`Failed to fetch media for ID: ${mediaId}.`);
    return null;
  }
}

// Attach media data to a single post
async function fetchMediaForPost(post) {
  if (post.featured_media) {
    post.media = await fetchMedia(post.featured_media);
    console.log(post.media);
  }
  return post;
}

// Attach media data to multiple posts
async function fetchMediaForPosts(posts) {
  return Promise.all(posts.map(fetchMediaForPost));
}

// Fetch posts from the API
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

    // Fetch and attach media data for posts
    return postId
      ? [await fetchMediaForPost(posts)]
      : await fetchMediaForPosts(posts);
  } catch (error) {
    console.error(error);
    displayErrorMessage('An error occurred while fetching data.');
    return null;
  }
}

// Display an error message
function displayErrorMessage(message) {
  const loadedContent = document.querySelector('.loadedContent');
  if (loadedContent) {
    showErrorMessage(loadedContent, message);
  }
}
