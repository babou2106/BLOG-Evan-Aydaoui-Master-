/* =========================================
   NAVIGATION : SCROLL & BURGER
   ========================================= */
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

// Ombre au scroll + masquage à la descente, retour à la remontée
if (navbar) {
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);

    const menuOpen = navLinks && navLinks.classList.contains('nav-open');
    if (!menuOpen) {
      if (y > 160 && y > lastY + 4) {
        navbar.classList.add('nav-hidden');
      } else if (y < lastY - 4 || y <= 160) {
        navbar.classList.remove('nav-hidden');
      }
    }
    lastY = y;
  }, { passive: true });
}

// Menu burger (mobile)
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Fermer au clic en dehors
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* =========================================
   LIEN ACTIF DANS LA NAV
   ========================================= */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html') ||
      (currentFile === 'index.html' && linkFile === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();

/* =========================================
   ANIMATION APPARITION AU SCROLL
   La classe .reveal est ajoutée ici (et non
   dans le HTML) : sans JS, tout reste visible.
   ========================================= */
const revealSelector = [
  '.article-card',
  '.card-featured',
  '.section-header',
  '.hero-content',
  '.page-hero .container',
  '.chapter-item',
  '.sidebar-card',
  '.cast-member',
  '.interest-tag',
  '.timeline-item',
  '.contact-link-item',
  '.contact-form',
  '.teaser-stat',
  '.memoire-teaser-text'
].join(', ');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(revealSelector).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--reveal-delay', `${(i % 5) * 70}ms`);
  revealObserver.observe(el);
});

/* =========================================
   BARRES DE PROGRESSION (page mémoire)
   ========================================= */
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width || '0%';
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.dataset.width = targetWidth;
    bar.style.width = '0%';
    progressObserver.observe(bar);
  });
}

animateProgressBars();

/* =========================================
   FORMULAIRE CONTACT — FEEDBACK
   ========================================= */
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Message envoyé !';
    btn.disabled = true;
    btn.style.backgroundColor = '#107657';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.backgroundColor = '';
      contactForm.reset();
    }, 3000);
  });
}
