(function () {
  function lockDarkReaderPalette() {
    if (!document.documentElement.dataset.darkreaderMode) {
      return;
    }

    if (document.getElementById('site-darkreader-palette-lock')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'site-darkreader-palette-lock';
    style.textContent = `
      body { background-color: #151919 !important; color: #d8d1c9 !important; }
      .navbar.bg-info { background-color: #128293 !important; }
      .site-band--teal { background-color: #175b65 !important; }
      .jumbotron, .latest-work-section, .portfolio-coming-soon-card, .reference-band { background-color: #232627 !important; }
      .card, .modal-content, .donation-box, .about-card { background-color: #182021 !important; color: #d8d1c9 !important; }
      .portfolio-feature-card--ggj, .portfolio-feature-card--ggj .card-body { background-color: #09282d !important; color: #abf3ed !important; }
      .portfolio-feature-card--ballatro, .portfolio-feature-card--ballatro .card-body { background-color: #251032 !important; color: #efcbff !important; }
      .portfolio-wide-coming-soon-card, .portfolio-wide-coming-soon-card .card-body { background-color: #142f46 !important; color: #b9ddff !important; }
      .form-control { background-color: #101414 !important; color: #d8d1c9 !important; }
    `;
    document.head.appendChild(style);
  }

  function getTargetElement(trigger) {
    const selector = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');

    if (!selector || selector === '#') {
      return null;
    }

    try {
      return document.querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function bindNavbarCollapse(root) {
    root.querySelectorAll('[data-bs-toggle="collapse"]').forEach(trigger => {
      if (trigger.dataset.siteInteractionBound === 'true') {
        return;
      }

      const target = getTargetElement(trigger);
      if (!target) {
        return;
      }

      trigger.dataset.siteInteractionBound = 'true';
      trigger.classList.toggle('collapsed', !target.classList.contains('show'));
      trigger.setAttribute('aria-expanded', target.classList.contains('show') ? 'true' : 'false');

      trigger.addEventListener('click', event => {
        event.preventDefault();
        const isOpen = target.classList.toggle('show');
        trigger.classList.toggle('collapsed', !isOpen);
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  function hideModal(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeAttribute('role');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
  }

  function showModal(modal) {
    if (!modal) {
      return;
    }

    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);

    requestAnimationFrame(() => {
      modal.classList.add('show');
      const focusTarget = modal.querySelector('[data-bs-dismiss="modal"], button, a, input, textarea, select');
      if (focusTarget) {
        focusTarget.focus();
      }
    });

    modal.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
      if (button.dataset.siteModalBound === 'true') {
        return;
      }

      button.dataset.siteModalBound = 'true';
      button.addEventListener('click', () => hideModal(modal));
    });

    backdrop.addEventListener('click', () => hideModal(modal));
  }

  window.initializeSiteInteractions = function (root = document) {
    bindNavbarCollapse(root);
  };

  window.showSiteModal = function (modalId) {
    showModal(document.getElementById(modalId));
  };

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') {
      return;
    }

    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      hideModal(openModal);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.initializeSiteInteractions();
    lockDarkReaderPalette();
  });

  new MutationObserver(lockDarkReaderPalette).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-darkreader-mode', 'data-darkreader-scheme']
  });
}());
