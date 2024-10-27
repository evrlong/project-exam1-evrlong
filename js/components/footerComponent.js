//footerComponent.js: This file will be used to create and render the footer on the pages.

export function createFooter() {
    const footer = document.createElement('footer');

    // Top section
    const topSection = document.createElement('div');
    topSection.classList.add('top-section');

    const greenSection = document.createElement('div');
    greenSection.classList.add('green-section');

    const someSection = document.createElement('div');
    someSection.classList.add('some-section');
    
    const icons = [
        { class: 'fa-brands fa-square-facebook' },
        { class: 'fa-brands fa-youtube' },
        { class: 'fa-brands fa-square-instagram' },
        { class: 'fa-brands fa-square-snapchat' }
    ];

    icons.forEach(icon => {
        const i = document.createElement('i');
        i.className = icon.class;
        someSection.appendChild(i);
    });

    topSection.appendChild(greenSection);
    topSection.appendChild(someSection);

    // Bottom sections
    const bottomSections = document.createElement('div');
    bottomSections.classList.add('bottom-sections');

    // First bottom section (Quick Links)
    const quickLinks = document.createElement('div');
    quickLinks.classList.add('bottom-section');

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

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        quickLinksList.appendChild(li);
    });

    quickLinks.appendChild(quickLinksList);

    // Second bottom section (Subscribe)
    const subscribeSection = document.createElement('div');
    subscribeSection.classList.add('bottom-section');

    const subscribeTitle = document.createElement('p');
    subscribeTitle.textContent = 'SUBSCRIBE';
    subscribeSection.appendChild(subscribeTitle);

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('inputWrapper');

    const emailInput = document.createElement('input');
    emailInput.classList.add('emailInput');
    emailInput.type = 'email';
    emailInput.placeholder = 'Submit email';
    inputWrapper.appendChild(emailInput);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.classList.add('submit-btn');

    const submitIcon = document.createElement('i');
    submitIcon.classList.add('fa-solid', 'fa-caret-right');
    submitBtn.appendChild(submitIcon);
    
    inputWrapper.appendChild(submitBtn);
    subscribeSection.appendChild(inputWrapper);

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
