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
     STAT COUNTER — count-up animation on scroll
  ---------------------------------------------------------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el, target, duration = 1800, suffix = '') {
    const start = performance.now();
    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const displayHtml = Math.floor(eased * target) + suffix;
      // Preserve superscript markup
      const superscript = el.innerHTML.match(/<sup>.*?<\/sup>/);
      el.innerHTML = displayHtml + (superscript ? superscript[0] : '');
      if (progress < 1) requestAnimationFrame(step);
      else {
        const finalHtml = target + suffix + (superscript ? superscript[0] : '');
        el.innerHTML = finalHtml;
      }
    }
    requestAnimationFrame(step);
  }

  function fadeInStat(el, value, delay = 400) {
    el.textContent = value;
    el.style.opacity = '0';
    el.style.transition = `opacity 0.8s ease ${delay}ms`;
    setTimeout(() => { el.style.opacity = '1'; }, 50);
  }

  const statSection = document.querySelector('[data-stats-section]');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stat 1: 75%
          const stat1 = document.getElementById('stat-adoption');
          if (stat1) animateCounter(stat1, 75, 1800, '%');

          // Stat 2: $3.70 (static fade)
          const stat2 = document.getElementById('stat-roi');
          if (stat2) fadeInStat(stat2, '$3.70<sup>2</sup>', 400);

          // Stat 3: 290 hrs
          const stat3 = document.getElementById('stat-hours');
          if (stat3) animateCounter(stat3, 290, 2000, ' hrs');

          // Stat 4: ~20% (static fade)
          const stat4 = document.getElementById('stat-gap');
          if (stat4) fadeInStat(stat4, '~20%<sup>4</sup>', 600);

          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (statSection) statObserver.observe(statSection);

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
