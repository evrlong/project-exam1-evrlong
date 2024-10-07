// js/components/headerComponent.js

export function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
         <img src="/images/headerImg.jpg" alt="header image" id="header-img">
        <a href="index.html">
            <img src="/images/logo.png" alt="Overlay Link" id="overlay-img">
        </a>
        <nav>
            <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    `;
    return header;
}

export function renderHeader() {
    const headerElement = createHeader();
    document.body.insertBefore(headerElement, document.body.firstChild);  // Insert at the top
}
