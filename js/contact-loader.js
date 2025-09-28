const contactUrl = new URL('contact.html', document.currentScript.src);

function loadContactSection() {
  const placeholder = document.getElementById('contact-placeholder');
  if (!placeholder || placeholder.dataset.loaded === 'true') {
    return;
  }

  fetch(contactUrl)
    .then(response => {
      if (!response.ok) throw new Error('Contact load error');
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      placeholder.dataset.loaded = 'true';

      if (typeof window.initializeContactForm === 'function') {
        window.initializeContactForm();
      }

      if (typeof window.loadDonationBox === 'function') {
        window.loadDonationBox();
      }
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', loadContactSection);

if (document.readyState !== 'loading') {
  loadContactSection();
}

window.loadContactSection = loadContactSection;
