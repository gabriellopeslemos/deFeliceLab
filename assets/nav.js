// Header background on scroll (stays transparent over the hero, gains a backdrop once scrolled)
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  function updateScrolled() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });
})();

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 880) closeNav();
  });
})();
