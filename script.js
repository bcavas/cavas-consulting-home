/* ============================================================
   CAVAS CONSULTING — script.js
   Vanilla JS — no dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ----------------------------------------------------------
     STAGGERED SERVICE CARDS
     Add delay via inline style so CSS transition-delay kicks in
     only when the card is about to become visible.
  ---------------------------------------------------------- */
  const serviceCards = document.querySelectorAll('.services__grid .scroll-reveal');
  serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });

  /* ----------------------------------------------------------
     SMOOTH NAV on internal links (belt-and-suspenders for
     browsers that don't support scroll-behavior: smooth in CSS)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
