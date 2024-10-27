// Importer fetchMedia funksjonen
import { fetchMedia } from './data/fetchMedia.js'; 

// Funksjon for å hente og vise innholdet fra en spesifikk side
async function fetchAboutContent() {
    const pageId = 91; // Erstatt med den faktiske side-ID-en
    try {
        const response = await fetch(`https://camp.evrlong.one/wp-json/wp/v2/pages/${pageId}`);
        
        // Sjekk om svaret er OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Hent innholdet og featured_media ID-en fra den spesifikke siden
        const aboutContent = data.content.rendered;
        const featuredMediaId = data.featured_media;

        console.log("featuredmedia:", featuredMediaId, "about", aboutContent);

        // Hent bildet ved å bruke fetchMedia funksjonen
        const mediaData = await fetchMedia(featuredMediaId);
        console.log("mediaData:", mediaData);

        // Velg et element på siden for å vise innholdet
        const aboutSection = document.getElementById('about-section');
        aboutSection.innerHTML = aboutContent;

        // Legg til bildet i about-seksjonen
        if (mediaData && mediaData.source_url) {
            const imageElement = document.createElement('img');
            imageElement.src = mediaData.source_url;
            imageElement.alt = 'Featured Image'; // 
            aboutSection.after(imageElement); // Sett inn bildet nederst i seksjonen
        }

    } catch (error) {
        console.error('Det oppstod en feil:', error);
    }
}

// Kall funksjonen når siden lastes
document.addEventListener('DOMContentLoaded', fetchAboutContent);
