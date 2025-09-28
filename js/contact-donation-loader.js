const contactDonationUrl = new URL('contact-donation.html', document.currentScript.src);

function loadContactDonation() {
  const placeholder = document.getElementById('contact-donation-placeholder');
  if (!placeholder || placeholder.dataset.loaded === 'true') {
    return;
  }

  fetch(contactDonationUrl)
    .then(response => {
      if (!response.ok) throw new Error('Contact & donation load error');
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

document.addEventListener('DOMContentLoaded', loadContactDonation);

if (document.readyState !== 'loading') {
  loadContactDonation();
}
