import { fetchData } from '../data/fetchData.js'; // Correct path to fetchData

let currentPage = 1; // Start at the first page
let postsPerPage = 4; // Number of posts to fetch per page
let posts = []; // To store all posts

document.getElementById('nextBlogCards').addEventListener('click', renderNextBlogCards);
document.getElementById('previousBlogCards').addEventListener('click', renderPreviousBlogCards);

export async function renderBlogCard() {
    try {
        // Fetch posts for the current page
        posts = await fetchData(postsPerPage, currentPage);

        if (posts && posts.length > 0) {
            // Render the first set of blog cards
            renderBlogCardsSet();
        } else {
            console.log('No more posts available.');
        }
    } catch (error) {
        console.error('Error rendering blog cards:', error);
    }

    console.log('Posts:', posts);
    console.log('Current page:', currentPage);
    console.log('Number of posts:', posts.length);
}

function renderBlogCardsSet() {
    const cardElements = [
        { id: 'blogCard1', postIndex: 0 },
        { id: 'blogCard2', postIndex: 1 },
        { id: 'blogCard3', postIndex: 2 },
        { id: 'blogCard4', postIndex: 3 }
    ];

    cardElements.forEach(({ id, postIndex }) => {
        const imageUrl = posts[postIndex]?.media?.source_url || '';
        const title = posts[postIndex]?.title?.rendered || 'No title';

        const cardElement = document.getElementById(id);

        // Remove all child nodes from the card element
        while (cardElement.firstChild) {
            cardElement.removeChild(cardElement.firstChild);
        }

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Image ${postIndex + 1}`;
            cardElement.appendChild(img);
        }

        const titleElement = document.createElement('h4');
        titleElement.textContent = title;
        cardElement.appendChild(titleElement);
    });
}

// Function to render the next set of blog cards
async function renderNextBlogCards() {
    currentPage++; // Move to the next page
    await renderBlogCard(); // Fetch and render posts for the new page
}

// Function to render the previous set of blog cards
async function renderPreviousBlogCards() {
    if (currentPage > 1) {
        currentPage--; // Move to the previous page
        await renderBlogCard(); // Fetch and render posts for the new page
    }
}
