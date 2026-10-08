/* ============================================================
   PORTFOLIO SCRIPTS — Wency Jade Oriente
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. STICKY NAVBAR SHADOW & SCROLLSPY
     ------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link[data-section]');
  const mobileLinks = document.querySelectorAll('.mobile-link[data-section]');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    let currentSectionId = '';
    const scrollPosition = scrollY + 120;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === currentSectionId);
      });
      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === currentSectionId);
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileMenu);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));


  /* ------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
     ------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }


  /* ------------------------------------------------------------
     4. SKILLS PROGRESS ANIMATION
     ------------------------------------------------------------ */
  const skillCards = document.querySelectorAll('.skill-card');

  if ('IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            progressBar.style.width = progressBar.getAttribute('data-width') || '60%';
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    skillCards.forEach(card => skillsObserver.observe(card));
  } else {
    skillCards.forEach(card => {
      const progressBar = card.querySelector('.skill-progress');
      if (progressBar) progressBar.style.width = progressBar.getAttribute('data-width') || '60%';
    });
  }


  /* ------------------------------------------------------------
     5. BACK TO TOP SMOOTH SCROLL
     ------------------------------------------------------------ */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ------------------------------------------------------------
     6. FORMSUBMIT DYNAMIC REDIRECT
     ------------------------------------------------------------ */
  const formNextInput = document.getElementById('formNextInput');
  if (formNextInput && window.location.protocol.startsWith('http')) {
    const baseUrl = window.location.href.split('#')[0].split('?')[0].replace(/\/[^\/]*$/, '/');
    formNextInput.value = baseUrl + 'thankyou.html';
  }

});

