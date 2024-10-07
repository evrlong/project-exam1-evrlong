import { fetchData } from '../data/fetchData.js'; // Riktig path til fetchData

export async function renderBlogCard() {
    try {
        const posts = await fetchData();

        if (posts && posts.length > 0) {
            // Hent de tre første bildene og ønsket data
            const image1Url = posts[0]?.media?.source_url || '';
            const image2Url = posts[1]?.media?.source_url || '';
            const image3Url = posts[2]?.media?.source_url || '';
            const image4Url = posts[3]?.media?.source_url || '';

            const title1 = posts[0]?.title?.rendered || 'No title';
            const title2 = posts[1]?.title?.rendered || 'No title';
            const title3 = posts[2]?.title?.rendered || 'No title';
            const title4 = posts[3]?.title?.rendered || 'No title';

            // Render bilder og titler i HTML-elementer
            if (image1Url) {
                document.getElementById('blogCard1').innerHTML = `<img src="${image1Url}" alt="Image 1"><h4>${title1}</h4>`;
            }
            if (image2Url) {
                document.getElementById('blogCard2').innerHTML = `<img src="${image2Url}" alt="Image 2"><h4>${title2}</h4>`;
            }
            if (image3Url) {
                document.getElementById('blogCard3').innerHTML = `<img src="${image3Url}" alt="Image 3"><h4>${title3}</h4>`;
            }

            if (image4Url) {
                document.getElementById('blogCard4').innerHTML = `<img src="${image4Url}" alt="Image 4"><h4>${title4}</h4>`;
            }
        }
    } catch (error) {
        console.error('Error rendering blog cards:', error);
    }
}
