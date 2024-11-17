export function createBurgerMenu() {
  // Create the burger button
  const burgerBtn = document.createElement('div');
  burgerBtn.className = 'burgerBtn';
  burgerBtn.id = 'burgerBtn';
  burgerBtn.textContent = '☰';
  document.body.appendChild(burgerBtn);

  // Create the burger menu container
  const burgerMenu = document.createElement('nav');
  burgerMenu.className = 'burgerMenu';
  burgerMenu.id = 'burgerMenu';

  // Create close button for the menu
  const closeBtn = document.createElement('div');
  closeBtn.className = 'closeBtn';
  closeBtn.textContent = '✕'; // X symbol
  burgerMenu.appendChild(closeBtn);

  // Menu items
  const menuItems = [
    { href: 'index.html', text: 'Home' },
    { href: 'about.html', text: 'About' },
    { href: 'blogs.html', text: 'Blogs' },
    { href: 'contact.html', text: 'Contact' }
  ];

  // Append each menu item to the menu
  menuItems.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    burgerMenu.appendChild(link);
  });

  // Add the menu to the body
  document.body.appendChild(burgerMenu);

  // Toggle the burger menu on burger button click
  burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
  });

  // Close the menu on close button click
  closeBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
  });
}
