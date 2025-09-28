(function () {
  const handler = function (e) {
    e.preventDefault();

    const name = document.getElementById('Name').value;
    const message = document.getElementById('RequestInfo').value;

    const pushoverToken = 'afg4k1tdzwi3p2g8t4kkcv1o2robhz';
    const pushoverUser = 'uvcqxq3ih58uvnd8ikxj4aq9fzmrb8';

    fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        token: pushoverToken,
        user: pushoverUser,
        title: 'New Contact Form Submission',
        message: `From: ${name}\n\n${message}`,
        priority: 1
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Message sent!');
        } else {
          alert('Error sending notification.');
        }
      })
      .catch(err => {
        alert('Network error.');
        console.error(err);
      });
  };

  function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form || form.dataset.bound === 'true') {
      return;
    }

    form.addEventListener('submit', handler);
    form.dataset.bound = 'true';
  }

  document.addEventListener('DOMContentLoaded', initializeContactForm);

  if (document.readyState !== 'loading') {
    initializeContactForm();
  }

  window.initializeContactForm = initializeContactForm;
})();
