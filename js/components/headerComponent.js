// headerComponent.js: This file will be used to create and render the header of the website.

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
  logoLink.setAttribute('tabindex', '0'); // Makes the link focusable via keyboard
  logoLink.setAttribute('aria-label', 'Go to homepage'); // Adds an accessible label

  const overlayImg = document.createElement('img');
  overlayImg.src = '/images/logo.png';
  overlayImg.alt = 'Homepage Logo'; // Describes the image for screen readers
  overlayImg.id = 'overlay-img';

  logoLink.appendChild(overlayImg);

  // Scroll the logo into view when it's focused with the keyboard
  logoLink.addEventListener('focus', () => {
    logoLink.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // Scroll to the center of the viewport
    });
  });

  header.appendChild(logoLink);

  // Navigation
  const nav = document.createElement('nav');
  nav.className = 'navHeader';
  const ul = document.createElement('ul');

  const navItems = [
    { href: 'blogs.html', text: 'Blogs' },
    { href: 'about.html', text: 'About' },
    { href: 'contact.html', text: 'Contact' }
  ];

  navItems.forEach((item) => {
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
  document.body.insertBefore(headerElement, document.body.firstChild); // Insert at the top
}

// Hide header and burger button when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const isMobile = window.innerWidth <= 834; // mobile breakpoint
  if (!isMobile) return;

  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burgerBtn');

  if (currentScroll > lastScrollTop) {
    header.style.top = `-${header.offsetHeight}px`;
    burgerBtn.style.top = `-${burgerBtn.offsetHeight}px`;
  } else {
    header.style.top = '0';
    burgerBtn.style.top = '0';
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position
});
