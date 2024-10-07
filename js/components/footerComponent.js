// js/components/footerComponent.js

export function createFooter() {
    

    const footer = document.createElement('footer');

    // Top section
    const topSection = document.createElement('div');
    topSection.classList.add('top-section');

    const greenSection = document.createElement('div');
    greenSection.classList.add('green-section');

    const someSection = document.createElement('div');
    someSection.classList.add('some-section');
    someSection.innerHTML = `
        <i class="fa-brands fa-square-facebook"></i>
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-square-instagram"></i>
        <i class="fa-brands fa-square-snapchat"></i>
    `;

    topSection.appendChild(greenSection);
    topSection.appendChild(someSection);

    // Bottom sections
    const bottomSections = document.createElement('div');
    bottomSections.classList.add('bottom-sections');

    // First bottom section (Quick Links)
    const quickLinks = document.createElement('div');
    quickLinks.classList.add('bottom-section');
    quickLinks.innerHTML = `
        <p>QUICK LINKS</p>
        <ul class="footerLinks">
            <li><a href="index.html">HOME</a></li>
            <li><a href="blogs.html">BLOG</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><a href="contact.html">CONTACT</a></li>
        </ul>
    `;

    // Second bottom section (Subscribe)
    const subscribeSection = document.createElement('div');
    subscribeSection.classList.add('bottom-section');
    subscribeSection.innerHTML = `
        <p>SUBSCRIBE</p>
        <div class="inputWrapper">
            <input class="emailInput" type="email" placeholder="Submit email">
            <button type="submit" class="submit-btn">
                <i class="fa-solid fa-caret-right"></i>
            </button>
        </div>
    `;

    // Third bottom section (Logo)
    const logoSection = document.createElement('div');
    logoSection.classList.add('bottom-section', 'logo-section');
    const logoImg = document.createElement('img');
    logoImg.classList.add('logoFooter');
    logoImg.src = '/images/logo.png';
    logoSection.appendChild(logoImg);

    bottomSections.appendChild(quickLinks);
    bottomSections.appendChild(subscribeSection);
    bottomSections.appendChild(logoSection);

    // Append sections to footer
    footer.appendChild(topSection);
    footer.appendChild(bottomSections);

    return footer;
}

export function renderFooter() {
    const footerElement = createFooter();
    document.body.appendChild(footerElement);
}
