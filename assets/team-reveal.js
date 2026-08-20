// Scroll-in reveal for team cards, staggered per team group.
// Entrance-only: once a card has revealed, it stays visible for the rest of the session.
(function () {
  var cards = document.querySelectorAll('.reveal-card');
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
      var group = card.closest('.team-grid');
      var step = stepDelay.get(group) || 0;
      card.style.transitionDelay = Math.min(step * 70, 420) + 'ms';
      stepDelay.set(group, step + 1);
      card.classList.add('is-visible');
      observer.unobserve(card);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(function (card) { observer.observe(card); });
})();
