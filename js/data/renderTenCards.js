// root/data/RenderTenCards.js
import { fetchData } from './fetchData.js'; // Correct path to fetchData

let currentPage = 1; // Start at the first page
const postsPerPage = 10; // Number of posts to fetch per page
let posts = []; // To store all posts

export async function renderInitialBlogCards() {
    await renderBlogCards();
}

export async function showMoreBlogCards() {
    currentPage++;
    await renderBlogCards();
}

async function renderBlogCards() {
    try {
        // Fetch posts for the current page
        const fetchedPosts = await fetchData(postsPerPage, currentPage);
        
        if (!fetchedPosts || fetchedPosts.length === 0) {
            console.log('No more posts available.');
            return;
        }

        posts = posts.concat(fetchedPosts); // Combine new posts with existing ones
        console.log('All posts:', posts);
        renderBlogCardsSet(fetchedPosts);
    } catch (error) {
        console.error('Error rendering blog cards:', error);
    }
}

function renderBlogCardsSet(postsToRender) {
    const container = document.getElementById('blogCardContainer'); // Make sure to create this container in your HTML

    postsToRender.forEach((post, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'blog-card'; // Set the class to blog-card

        const imageUrl = post?.media?.source_url || '';
        const title = post?.title?.rendered || 'No title';

        console.log('Rendering post:', post);

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Image ${index + 1}`;
            cardElement.appendChild(img);
        }

        const titleElement = document.createElement('h4');
        titleElement.textContent = title;
        cardElement.appendChild(titleElement);

        container.appendChild(cardElement); // Append the card to the container
    });
}
