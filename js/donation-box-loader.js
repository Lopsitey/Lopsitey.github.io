const donationBoxUrl = new URL('donation-box.html', document.currentScript.src);

function loadDonationBox() {
  const placeholder = document.getElementById('donation-box-placeholder');
  if (!placeholder || placeholder.dataset.loaded === 'true') {
    return;
  }

  fetch(donationBoxUrl)
    .then(response => {
      if (!response.ok) throw new Error('Donation box load error');
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      placeholder.dataset.loaded = 'true';
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', loadDonationBox);

if (document.readyState !== 'loading') {
  loadDonationBox();
}

window.loadDonationBox = loadDonationBox;
