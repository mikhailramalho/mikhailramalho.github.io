(function () {
  'use strict';

  // Preloader: hide on DOM ready for faster paint
  document.addEventListener('DOMContentLoaded', function () {
    var pre = document.querySelector('.preloader');
    if (pre) pre.style.display = 'none';
  });

  // Scroll shadow on navbar
  function updateNavShadow() {
    var navbarFixed = document.querySelector('.navbar-fixed-top');
    var navbar = document.querySelector('.navbar');
    if (!navbarFixed || !navbar) return;
    if (window.pageYOffset > 50) {
      navbarFixed.classList.add('top-nav-collapse');
    } else {
      navbarFixed.classList.remove('top-nav-collapse');
    }
  }
  window.addEventListener('scroll', updateNavShadow, { passive: true });
  document.addEventListener('DOMContentLoaded', updateNavShadow);

  // Smooth scroll with dynamic offset (navbar height)
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.custom-navbar a');
    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        var offset = (document.querySelector('.navbar') || { offsetHeight: 49 }).offsetHeight || 49;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  });

  // No reveal-on-scroll; show content immediately
})();
