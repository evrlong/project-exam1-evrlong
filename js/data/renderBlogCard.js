import { fetchData } from '../data/fetchData.js'; // Correct path to fetchData

let currentIndex = 0; // Start at the first set of blog cards
let posts = []; // To store all posts

document.getElementById('nextBlogCards').addEventListener('click', renderNextBlogCards);
document.getElementById('previousBlogCards').addEventListener('click', renderPreviousBlogCards);

export async function renderBlogCard() {
    try {
        posts = await fetchData();

        if (posts && posts.length > 0) {
            // Render the first set of blog cards
            renderBlogCardsSet(currentIndex);
        }
    } catch (error) {
        console.error('Error rendering blog cards:', error);
    }

    console.log('Posts:', posts);
    console.log('Current index:', currentIndex);
    console.log('Number of posts:', posts.length);
}

function renderBlogCardsSet(index) {
    console.log('index', index);

    const cardElements = [
        { id: 'blogCard1', postIndex: index },
        { id: 'blogCard2', postIndex: index + 1 },
        { id: 'blogCard3', postIndex: index + 2 },
        { id: 'blogCard4', postIndex: index + 3 }
    ];

    cardElements.forEach(({ id, postIndex }) => {
        const imageUrl = posts[postIndex]?.media?.source_url || '';
        const title = posts[postIndex]?.title?.rendered || 'No title';

        const cardElement = document.getElementById(id);

        //  removes all child nodes from the card element
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

// Function to render the next set of blog cards. Explanation: adds index by 4 to get the next set of blog cards
function renderNextBlogCards() {
    console.log('currentIndex2', currentIndex);
    if (currentIndex + 4 < posts.length) {
        currentIndex += 4; 
        renderBlogCardsSet(currentIndex);
    } else { 
        currentIndex = 0;
        renderBlogCardsSet(currentIndex);
    }
}

function renderPreviousBlogCards() {
    if (currentIndex - 4 >= 0) {
        currentIndex -= 4; 
        renderBlogCardsSet(currentIndex);
    }
}
