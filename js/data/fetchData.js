// fetchData.js

// Hent innlegg fra API
export async function fetchData(perPage = 10, page = 1) {
    const apiUrl = `https://camp.evrlong.one/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`;

    try {
        // Hent innlegg fra API
        const response = await fetch(apiUrl);

        // Sjekk om responsen er ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Konverter responsen til JSON
        const posts = await response.json();

        // Hent mediedata for hvert innlegg
        const postsWithMedia = await fetchMediaForPosts(posts);

        // Logg hentede data med medie
        console.log('Hentet data med medie:', postsWithMedia);
        return postsWithMedia;

    } catch (error) {
        // Logg feilen
        console.error('Det oppsto en feil ved henting av data:', error);
    }
}

// Funksjon for å hente mediedata for innleggene
async function fetchMediaForPosts(posts) {
    return Promise.all(posts.map(async post => {
        // Hvis innlegget har medie
        if (post.featured_media) {
            const media = await fetchMedia(post.featured_media);
            return { ...post, media }; // Legg til mediedata i innlegget
        }
        return post; // Ingen featured_media, returner innlegget som det er
    }));
}

// Funksjon for å hente mediedata fra API
async function fetchMedia(mediaId) {
    const mediaResponse = await fetch(`https://camp.evrlong.one/wp-json/wp/v2/media/${mediaId}`);
    
    // Sjekk om medieresponsen er ok
    if (mediaResponse.ok) {
        return await mediaResponse.json(); // Returner mediedata
    } else {
        console.error(`Feil ved henting av mediedata for media: ${mediaId}, status: ${mediaResponse.status}`);
        return null; // Returner null hvis det er en feil
    }
}
