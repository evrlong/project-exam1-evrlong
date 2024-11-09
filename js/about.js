// Import the fetchMedia function from fetchDataWithMedia.js
import { fetchMedia } from './data/fetchDataWithMedia.js';  // Adjust the path if necessary

// Your existing code below
async function fetchAboutContent() {
  const pageId = 91; // Correct page ID for About page
  try {
    const response = await fetch(`https://camp.evrlong.one/wp-json/wp/v2/pages/${pageId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const title = data.title.rendered;
    const aboutContent = data.content.rendered;
    const featuredMediaId = data.featured_media;

  

    const aboutSection = document.getElementById("about-section");
    if (!aboutSection) {
      throw new Error("about-section element not found");
    }

    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");

    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    textContainer.appendChild(titleElement);

    const contentElement = document.createElement("div");
    contentElement.classList.add("aboutText");
    contentElement.insertAdjacentHTML("beforeend", aboutContent);
    textContainer.appendChild(contentElement);
    aboutSection.appendChild(textContainer);

    const mediaData = await fetchMedia(featuredMediaId);
    console.log("Media Data fetched:", mediaData);

    if (mediaData && mediaData.source_url) {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("imageContainer");

      const imageElement = document.createElement("img");
      imageElement.src = mediaData.source_url;
      imageElement.classList.add("aboutImage");
      imageElement.alt = "Featured Image";
      imageContainer.appendChild(imageElement);

      aboutSection.appendChild(imageContainer);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchAboutContent);
