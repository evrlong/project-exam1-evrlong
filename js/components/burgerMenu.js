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
  }
  