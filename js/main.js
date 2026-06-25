/* =========================================
   NAVIGATION : SCROLL & BURGER
   ========================================= */
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

// Effet ombre au scroll
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
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
   ========================================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.appear').forEach(el => {
  appearObserver.observe(el);
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
