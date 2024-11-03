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

  const overlayImg = document.createElement('img');
  overlayImg.src = '/images/logo.png';
  overlayImg.alt = 'Overlay Link';
  overlayImg.id = 'overlay-img';
  logoLink.appendChild(overlayImg);

  header.appendChild(logoLink);

  // Navigation
  const nav = document.createElement('nav');
  nav.className = 'navHeader';
  const ul = document.createElement('ul');

  const navItems = [
    { href: 'blogs.html', text: 'Blog' },
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

// Create Burger Menu
export function createBurgerMenu() {
  console.log("Burger menu initialized"); // Debugging line

  // Create the burger button
  const burgerBtn = document.createElement("div");
  burgerBtn.className = "burger-btn";
  burgerBtn.id = "burgerBtn";
  burgerBtn.textContent = "☰";
  document.body.appendChild(burgerBtn);

  // Create the burger menu container
  const burgerMenu = document.createElement("nav");
  burgerMenu.className = "burger-menu";
  burgerMenu.id = "burgerMenu";

  // Menu items
  const menuItems = [
    { href: "index.html", text: "Home" },
    { href: "about.html", text: "About" },
    { href: "blogs.html", text: "Blogs" },
    { href: "contact.html", text: "Contact" }
  ];

  // Append each menu item to the menu
  menuItems.forEach(item => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.text;
    burgerMenu.appendChild(link);
  });

  // Add the menu to the body
  document.body.appendChild(burgerMenu);

  // Toggle the burger menu
  burgerBtn.addEventListener("click", () => {
    console.log("Burger button pressed"); // Debugging line
    burgerMenu.classList.toggle("active");
  });

  return { burgerBtn, burgerMenu }; // Return elements for visibility control
}

// Hide header and burger button when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burgerBtn');

  if (currentScroll > lastScrollTop) {
    header.style.top = `-${header.offsetHeight}px`; // Hide header
    burgerBtn.style.top = `-${burgerBtn.offsetHeight}px`; // Hide burger button
  } else {
    header.style.top = '0'; // Show header
    burgerBtn.style.top = '0'; // Show burger button
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position
});
