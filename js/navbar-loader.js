const navUrl = new URL('navbar.html', document.currentScript.src);

document.addEventListener('DOMContentLoaded', () => {
  fetch(navUrl)
    .then(response => {
      if (!response.ok) throw new Error('Navbar load error');
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById('navbar-placeholder');
      if (!placeholder) return;

      placeholder.innerHTML = html;

      // Highlight the link matching the final word in the page title.
      const titleWords = document.title.trim().split(/\s+/);
      const currentPage = titleWords[titleWords.length - 1].toLowerCase();

      placeholder.querySelectorAll('.nav-link').forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (!linkText.includes(currentPage)) return;

        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        if (!link.querySelector('.visually-hidden')) {
          link.insertAdjacentHTML('beforeend', ' <span class="visually-hidden">(current)</span>');
        }
      });
    })
    .catch(error => console.error(error));
});
