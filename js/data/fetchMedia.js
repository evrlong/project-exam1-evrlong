// fetchMedia.js: This file will be used to fetch media data for posts.

// Fetch media data for a single post
export async function fetchMediaForPost(post) {
  if (post.featured_media) {
    const media = await fetchMedia(post.featured_media);
    return { ...post, media };
  }
  return post;
}

// Fetch media data for multiple posts
export async function fetchMediaForPosts(posts) {
  return Promise.all(posts.map(fetchMediaForPost));
}

// Fetch media data from API
export async function fetchMedia(mediaId) {
  const mediaResponse = await fetch(
    `https://camp.evrlong.one/wp-json/wp/v2/media/${mediaId}`
  );

  if (mediaResponse.ok) {
    return await mediaResponse.json();
  } else {
    console.error(
      `Error fetching media data for media: ${mediaId}, status: ${mediaResponse.status}`
    );
    return null;
  }
}
