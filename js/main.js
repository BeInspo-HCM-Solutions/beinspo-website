(function () {
  'use strict';

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
  }

  // "How We Engage" dropdown
  var dropdownToggle = document.querySelector('.dropdown-toggle');
  var dropdownItem = dropdownToggle ? dropdownToggle.closest('.has-dropdown') : null;
  if (dropdownToggle && dropdownItem) {
    function setDropdown(open) {
      dropdownToggle.setAttribute('aria-expanded', String(open));
      dropdownItem.classList.toggle('open', open);
    }
    dropdownToggle.addEventListener('click', function () {
      setDropdown(dropdownToggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) setDropdown(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setDropdown(false); dropdownToggle.focus(); }
    });
  }

  // Hero slider: two messages rotate every seven seconds. Both slides stay in the layout
  // (same grid cell), so the block keeps one height. Rotation pauses while the pointer or
  // keyboard focus is on the hero, stops when the tab is hidden, and never starts when the
  // visitor prefers reduced motion.
  var slider = document.querySelector('[data-slider]');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('[data-slide-to]'));
    var current = 0;
    var timer = null;
    var interval = 7000;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var active = i === current;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-pressed', String(i === current));
      });
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(function () { show(current + 1); }, interval);
    }

    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        show(parseInt(d.getAttribute('data-slide-to'), 10));
        start();
      });
    });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', function (e) { if (!slider.contains(e.relatedTarget)) start(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });

    show(0);
    start();
  }

  // Path selector: pressing a statement highlights the matching offering card
  var items = document.querySelectorAll('.selector-item');
  var offers = document.querySelectorAll('.offer');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var targetId = item.getAttribute('data-target');
      var target = document.getElementById(targetId);
      items.forEach(function (i) { i.setAttribute('aria-pressed', String(i === item)); });
      offers.forEach(function (o) { o.classList.toggle('is-active', o === target); });
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
      }
    });
  });
})();
