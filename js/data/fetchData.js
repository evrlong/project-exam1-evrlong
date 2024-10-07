// fetchData.js

export async function fetchData() {
    const apiUrl = 'https://camp.evrlong.one/wp-json/wp/v2/posts';

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();

        // Hent mediedata for hvert innlegg med featured_media
        const postsWithMedia = await Promise.all(posts.map(async post => {
            if (post.featured_media) {
                const mediaResponse = await fetch(`https://camp.evrlong.one/wp-json/wp/v2/media/${post.featured_media}`);
                if (mediaResponse.ok) {
                    const media = await mediaResponse.json();
                    // Legg til mediedata til innlegget
                    return { ...post, media };
                } else {
                    console.error(`Feil ved henting av mediedata for post ${post.id}: ${mediaResponse.status}`);
                    return post; // Returner innlegget uten medie
                }
            }
            return post; // Ingen featured_media, returner innlegget som det er
        }));

        console.log('Hentet data med medie:', postsWithMedia);
        return postsWithMedia;

    } catch (error) {
        console.error('Det oppsto en feil ved henting av data:', error);
    }
}
