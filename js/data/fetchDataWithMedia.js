import { showErrorMessage } from '../components/errorMessage.js';  // Adjust the path if necessary

const BASE_URL = 'https://camp.evrlong.one/wp-json/wp/v2';

// Fetch media data from API // About page
export async function fetchMedia(mediaId) {  
  try {
    const response = await fetch(`${BASE_URL}/media/${mediaId}`);
    if (response.ok) {
      return await response.json();
    } else {
      // Display error if media fetch fails
      const loadedContent = document.querySelector('.loadedContent'); // Using class selector
      if (loadedContent) {
        showErrorMessage(loadedContent, `404: Not Found - Unable to fetch media with ID: ${mediaId}`);
      }
      console.error(`Error fetching media data for media ID: ${mediaId}, status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching media for media ID: ${mediaId}`, error);

    // Display general error message
    const loadedContent = document.querySelector('.loadedContent'); // Using class selector
    if (loadedContent) {
      showErrorMessage(loadedContent, `Error fetching media for ID: ${mediaId}. Please try again.`);
    }

    return null;
  }
}

// Fetch media data for a single post
async function fetchMediaForPost(post) {
  if (post.featured_media) {
    const media = await fetchMedia(post.featured_media);
    return { ...post, media };
  }
  return post;
}

// Fetch media data for multiple posts
async function fetchMediaForPosts(posts) {
  return Promise.all(posts.map(fetchMediaForPost));
}

// Fetch posts from API and attach media data
export async function fetchData(perPage = 10, page = 1, postId = null) {
  const apiUrl = postId
    ? `${BASE_URL}/posts/${postId}`
    : `${BASE_URL}/posts?per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();
    const postsWithMedia = postId ? [await fetchMediaForPost(posts)] : await fetchMediaForPosts(posts);

    console.log('Fetched data with media:', postsWithMedia);
    return postsWithMedia;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);

    // Find the container to display the error message
    const loadedContent = document.querySelector('.loadedContent'); // Using class selector
    if (loadedContent) {
      showErrorMessage(loadedContent, 'An error occurred while fetching data. Please try again later.');
    }

    return null;
  }
}
