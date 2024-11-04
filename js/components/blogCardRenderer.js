//blogCardRenderer.js: This file will be used to render the blog cards on the index.html page.

export function renderBlogCardsSet(posts, containerId) {
  const container = document.getElementById(containerId); // Get the container by ID
  if (!container) {
    console.error(`Container with ID '${containerId}' not found.`);
    return; // Exit early if the container is not found
  }

  // Clear previous contents of the container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Render new blog cards
  posts.forEach((post) => {
    const blogCard = createBlogCard(post);
    container.appendChild(blogCard); // Append the blog card to the container
  });
}

function createBlogCard(post) {
  const anchorElement = document.createElement('a');
  anchorElement.href = `details.html?id=${post.id}`; // Set the link to details.html with the post ID as a query parameter
  const cardElement = document.createElement('div');
  cardElement.className = 'blogCard'; // Set the class to blogCard

  const imageUrl = post?.media?.source_url || '';
  const title = post?.title?.rendered || 'Empty title';

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Image for ${title}`;
    cardElement.appendChild(img);
  }

  const titleElement = document.createElement('h4');
  titleElement.textContent = title;
  cardElement.appendChild(titleElement);

  anchorElement.appendChild(cardElement); // Wrap the div inside the anchor
  return anchorElement; // Return the anchor to append to the container
}
