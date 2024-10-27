//headerComponent.js: This file will be used to create and render the header of the website.

export function createHeader() {
    const header = document.createElement('header');

    // Header image
    const headerImg = document.createElement('img');
    headerImg.src = '/images/headerImg.jpg';
    headerImg.alt = 'header image';
    headerImg.id = 'header-img';
    header.appendChild(headerImg);

    // Logo link
    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';

    const overlayImg = document.createElement('img');
    overlayImg.src = '/images/logo.png';
    overlayImg.alt = 'Overlay Link';
    overlayImg.id = 'overlay-img';
    logoLink.appendChild(overlayImg);

    header.appendChild(logoLink);

    // Navigation
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const navItems = [
        { href: '#blog', text: 'Blog' },
        { href: '#about', text: 'About' },
        { href: '#contact', text: 'Contact' }
    ];

    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    header.appendChild(nav);

    return header;
}

export function renderHeader() {
    const headerElement = createHeader();
    document.body.insertBefore(headerElement, document.body.firstChild);  // Insert at the top
}
