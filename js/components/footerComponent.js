export function createFooter() {
  const footer = document.createElement('footer');
  footer.setAttribute('role', 'contentinfo');

  // Top section
  const topSection = document.createElement('div');
  topSection.classList.add('topSection');

  const greenSection = document.createElement('div');
  greenSection.classList.add('greenSection');
  greenSection.setAttribute('aria-hidden', 'true');

  const someSection = document.createElement('div');
  someSection.classList.add('soMeSection');

  // Social media icons
  const icons = [
    { class: 'fa-brands fa-square-facebook', label: 'Facebook' },
    { class: 'fa-brands fa-youtube', label: 'YouTube' },
    { class: 'fa-brands fa-square-instagram', label: 'Instagram' },
    { class: 'fa-brands fa-square-snapchat', label: 'Snapchat' }
  ];

  icons.forEach((icon) => {
    const i = document.createElement('i');
    i.className = icon.class;
    i.setAttribute('aria-label', icon.label);
    i.setAttribute('role', 'img');
    someSection.appendChild(i);
  });

  topSection.appendChild(greenSection);
  topSection.appendChild(someSection);

  // Bottom sections
  const bottomSections = document.createElement('div');
  bottomSections.classList.add('bottomSections');

  // First bottom section (Quick Links)
  const quickLinks = document.createElement('div');
  quickLinks.classList.add('bottomSection');
  quickLinks.setAttribute('aria-label', 'Quick Links');

  const quickLinksTitle = document.createElement('p');
  quickLinksTitle.textContent = 'QUICK LINKS';
  quickLinks.appendChild(quickLinksTitle);

  const quickLinksList = document.createElement('ul');
  quickLinksList.classList.add('footerLinks');

  const links = [
    { href: 'index.html', text: 'HOME' },
    { href: 'blogs.html', text: 'BLOG' },
    { href: 'about.html', text: 'ABOUT' },
    { href: 'contact.html', text: 'CONTACT' }
  ];

  links.forEach((link) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.setAttribute('aria-label', `Navigate to ${link.text}`);
    li.appendChild(a);
    quickLinksList.appendChild(li);
  });

  quickLinks.appendChild(quickLinksList);

  // Second bottom section (Subscribe)
  const subscribeSection = document.createElement('div');
  subscribeSection.classList.add('bottomSection');

  const subscribeTitle = document.createElement('p');
  subscribeTitle.textContent = 'SUBSCRIBE';
  subscribeSection.appendChild(subscribeTitle);

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('inputWrapper');
  inputWrapper.setAttribute('aria-label', 'Subscribe to our newsletter');

  const emailInput = document.createElement('input');
  emailInput.classList.add('emailInput');
  emailInput.type = 'email';
  emailInput.placeholder = 'Submit your email';
  emailInput.setAttribute(
    'aria-label',
    'Enter your email address for subscription'
  );
  emailInput.required = true; //

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.classList.add('submitBtnFooter');
  submitBtn.setAttribute('aria-label', 'Submit email for subscription');

  const submitIcon = document.createElement('i');
  submitIcon.classList.add('fa-solid', 'fa-caret-right');
  submitIcon.setAttribute('aria-hidden', 'true'); // Hide icon from screen readers
  submitBtn.appendChild(submitIcon);

  inputWrapper.appendChild(emailInput);
  inputWrapper.appendChild(submitBtn);
  subscribeSection.appendChild(inputWrapper);

  // Third bottom section (Logo)
  const logoSection = document.createElement('div');
  logoSection.classList.add('bottomSection', 'logoSection');

  const logoImg = document.createElement('img');
  logoImg.classList.add('logoFooter');
  logoImg.src = '/images/logo.png';
  logoImg.alt = 'Blog Logo';
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
