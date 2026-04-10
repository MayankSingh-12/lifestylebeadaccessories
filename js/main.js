/* ============================================================
   LIFESTYLE BEAD ACCESSORIES — main.js
   Vanilla JS — no external libraries
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAVBAR: scroll behaviour ---- */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- FADE-IN SCROLL ANIMATIONS ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el, i) {
      // Stagger sibling cards
      el.style.transitionDelay = (i % 6) * 80 + 'ms';
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 80;

      const top = target.getBoundingClientRect().top + window.pageYOffset - navH;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- ACTIVE NAV LINK highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 80;
    const scrollY = window.scrollY + navH + 60;

    let current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

})();
