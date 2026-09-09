// Scroll-in reveal for cards, staggered per group (marked with data-reveal-group).
// Entrance-only: once a card has revealed, it stays visible for the rest of the session.
(function () {
  var cards = document.querySelectorAll('.reveal-card, .reveal-fade');
  if (!cards.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    cards.forEach(function (card) { card.classList.add('is-visible'); });
    return;
  }

  var stepDelay = new WeakMap();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var card = entry.target;
      var group = card.closest('[data-reveal-group]') || card.parentElement;
      var stepMs = Number(group && group.getAttribute('data-reveal-step')) || 70;
      var capMs = Number(group && group.getAttribute('data-reveal-cap')) || 420;
      var step = stepDelay.get(group) || 0;
      card.style.transitionDelay = Math.min(step * stepMs, capMs) + 'ms';
      stepDelay.set(group, step + 1);
      card.classList.add('is-visible');
      observer.unobserve(card);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(function (card) { observer.observe(card); });
})();
