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
  const statBlocks = document.querySelectorAll('.stat-block__number[data-target]');

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const rawTarget = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const displayValue = el.dataset.display || null;  // e.g. "3.70" for $3.70
    const duration = 1600; // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const current = rawTarget * eased;

      if (displayValue !== null) {
        // Use proportional display value
        const displayTarget = parseFloat(displayValue);
        el.textContent = prefix + (displayTarget * eased).toFixed(2) + suffix;
      } else if (Number.isInteger(rawTarget)) {
        el.textContent = prefix + Math.round(current) + suffix;
      } else {
        el.textContent = prefix + current.toFixed(2) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Final value
        if (displayValue !== null) {
          el.textContent = prefix + displayValue + suffix;
        } else {
          el.textContent = prefix + rawTarget + suffix;
        }
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statBlocks.forEach((el) => {
    counterObserver.observe(el);
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
