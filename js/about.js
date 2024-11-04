// Importer fetchMedia funksjonen for å hente bildet fra media-endepunktet
import { fetchMedia } from './data/fetchMedia.js';

// Funksjon for å hente og vise innholdet fra en spesifikk side
async function fetchAboutContent() {
  const pageId = 91; // !!  Bruk korrekt side-ID for About-siden på WordPress-siden din
  try {
    const response = await fetch(
      `https://camp.evrlong.one/wp-json/wp/v2/pages/${pageId}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Hent innholdet og featured_media ID-en fra den spesifikke siden
    const title = data.title.rendered;
    const aboutContent = data.content.rendered;
    const featuredMediaId = data.featured_media;


    // Velg hovedelementet på siden for å vise innholdet
    const aboutSection = document.getElementById('about-section');

    // Lag en div for tekstinnholdet (tittel og tekst)
    const textContainer = document.createElement('div');
    textContainer.classList.add('textContainer');

    // Legg til tittelen på siden
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    textContainer.appendChild(titleElement);

    // Bruk insertAdjacentHTML hvis HTML-format må beholdes
    const contentElement = document.createElement('div');
    contentElement.classList.add('aboutText');
    contentElement.insertAdjacentHTML('beforeend', aboutContent);
    textContainer.appendChild(contentElement);

    // Legg til tekstContainer i about-seksjonen
    aboutSection.appendChild(textContainer);

    // Hent bildet ved å bruke fetchMedia funksjonen
    const mediaData = await fetchMedia(featuredMediaId);
    console.log('mediaData:', mediaData);

    // Lag en separat div for bildet
    if (mediaData && mediaData.source_url) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('imageContainer');
      
      const imageElement = document.createElement('img');
      imageElement.src = mediaData.source_url;
      imageElement.classList.add('aboutImage');
      imageElement.alt = 'Featured Image';
      imageContainer.appendChild(imageElement);

      // Legg til imageContainer i about-seksjonen
      aboutSection.appendChild(imageContainer);
    }
  } catch (error) {
    console.error('Det oppstod en feil:', error);
  }
}

// Kall funksjonen når siden lastes
document.addEventListener('DOMContentLoaded', fetchAboutContent);
