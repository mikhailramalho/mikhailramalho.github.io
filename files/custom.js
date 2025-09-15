(function () {
  'use strict';

  // Preloader removed

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
    var navItems = Array.prototype.slice.call(document.querySelectorAll('.custom-navbar li'));
    function setActive(href) {
      navItems.forEach(function(li){ li.classList.remove('active'); });
      links.forEach(function(a){ a.removeAttribute('aria-current'); });
      if (!href) return;
      var a = document.querySelector('.custom-navbar a[href="'+href+'"]');
      if (a && a.parentElement) {
        a.parentElement.classList.add('active');
        a.setAttribute('aria-current','page');
      }
    }
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
        setActive(href);
      });
    });

    // Active on scroll
    var sectionHrefs = Array.prototype.slice.call(document.querySelectorAll('.custom-navbar a[href^="#"]'))
      .map(function(a){ return a.getAttribute('href'); });
    var sections = sectionHrefs.map(function(href){ return { href: href, el: document.querySelector(href) }; })
      .filter(function(s){ return !!s.el; });

    function updateActiveOnScroll() {
      var offset = (document.querySelector('.navbar') || { offsetHeight: 49 }).offsetHeight || 49;
      var pos = window.pageYOffset + offset + 1;
      var current = null;
      sections.forEach(function(s){
        var top = s.el.offsetTop;
        if (top <= pos) current = s.href;
      });
      setActive(current);
    }
    document.addEventListener('scroll', updateActiveOnScroll, { passive: true });
    updateActiveOnScroll();
  });

  // No reveal-on-scroll; show content immediately
})();
