document.addEventListener("DOMContentLoaded", () => {
  fetch('../js/navbar.html')
    .then(response => {
      if (!response.ok) throw new Error('Navbar load error');
      return response.text();
    })
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      // After navbar is loaded, highlight the active link
      const titleWords = document.title.trim().split(" ");
      const currentPage = titleWords[titleWords.length - 1].toLowerCase();//e.g. "portfolio"

      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText.includes(currentPage)) {
          link.classList.add('active');

          // Add the screen reader span if it's not already there
          if (!link.innerHTML.includes('sr-only')) {
            link.innerHTML += ' <span class="sr-only">(current)</span>';
          }
        }
      });
    })
    .catch(error => console.error(error));
});
