import { fetchData } from '../data/fetchData.js'; // Correct path to fetchData

let currentIndex = 0; // Start at the first set of blog cards
let posts = []; // To store all posts

document.getElementsByClassName('showMoreBtn')[0].addEventListener('click', renderMoreBlogCards);

export async function renderTenCards() {
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
        { id: 'blogCard4', postIndex: index + 3 },
        { id: 'blogCard5', postIndex: index + 4 },
        { id: 'blogCard6', postIndex: index + 5 },
        { id: 'blogCard7', postIndex: index + 6 },
        { id: 'blogCard8', postIndex: index + 7 },
        { id: 'blogCard9', postIndex: index + 8 },
        { id: 'blogCard10', postIndex: index + 9},
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

function renderMoreBlogCards() {
    console.log('currentIndex2', currentIndex);
    if (currentIndex + 10 < posts.length) {
        currentIndex += 10; 
        renderBlogCardsSet(currentIndex);
    } else { 
        currentIndex = 0;
        renderBlogCardsSet(currentIndex);
    }
}