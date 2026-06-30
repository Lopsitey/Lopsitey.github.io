const footerUrl = new URL('footer.html', document.currentScript.src);

function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder || placeholder.dataset.loaded === 'true') {
    return;
  }

  fetch(footerUrl)
    .then(response => {
      if (!response.ok) throw new Error('Footer load error');
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      placeholder.dataset.loaded = 'true';

      const year = placeholder.querySelector('[data-current-year]');
      if (year) {
        year.textContent = new Date().getFullYear();
      }
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', loadFooter);

if (document.readyState !== 'loading') {
  loadFooter();
}

window.loadFooter = loadFooter;
