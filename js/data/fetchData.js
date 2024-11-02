// fetchData.js: This file will be used to fetch the data from the WordPress API and return the data to the calling function.
// it will also call the fetchMedia.js file to fetch media data for the posts.

import { fetchMediaForPost, fetchMediaForPosts } from './fetchMedia.js';

// Fetch posts from API
export async function fetchData(perPage = 10, page = 1, postId = null) {
  const apiUrl = postId
    ? `https://camp.evrlong.one/wp-json/wp/v2/posts/${postId}`
    : `https://camp.evrlong.one/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    // Fetch media for posts
    const postsWithMedia = postId
      ? [await fetchMediaForPost(posts)]
      : await fetchMediaForPosts(posts);

    console.log('Fetched data with media:', postsWithMedia);
    return postsWithMedia;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return null;
  }
}
