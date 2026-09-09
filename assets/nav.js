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

// Header light/dark theme: matches whichever section sits behind the header band,
// so nav text stays legible over both dark hero-style sections and light content sections.
(function () {
  var header = document.querySelector('.site-header');
  var brandMark = document.querySelector('.brand-mark');
  if (!header) return;

  var darkSections = Array.prototype.slice.call(
    document.querySelectorAll('.hero, .contact-section, .imaging-section, .study-hero, .page-hero')
  );
  if (!darkSections.length) return;

  var DARK_LOGO = 'assets/logosDeFeliceLab/logoBrancaSemTexto.png';
  var LIGHT_LOGO = 'assets/logosDeFeliceLab/logoAzulSemTexto.png';

  function updateTheme() {
    var probeY = header.getBoundingClientRect().height / 2;
    var overDark = darkSections.some(function (section) {
      var rect = section.getBoundingClientRect();
      return rect.top <= probeY && rect.bottom >= probeY;
    });
    header.classList.toggle('is-light', !overDark);
    if (brandMark) brandMark.src = overDark ? DARK_LOGO : LIGHT_LOGO;
  }

  updateTheme();
  window.addEventListener('scroll', updateTheme, { passive: true });
  window.addEventListener('resize', updateTheme);
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
