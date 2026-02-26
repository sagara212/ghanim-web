/* ============================================================
   Percetakan Ghanim — Premium Script
   ============================================================ */

(function () {

  function init() {

    /* ---------- Navbar scroll ---------- */
    var navbar    = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobile-nav');

    function handleScroll() {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
      highlightNav();
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ---------- Hamburger ---------- */
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        var isOpen = mobileNav.classList.contains('open');
        hamburger.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      /* Close when clicking a nav link */
      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      /* Close when clicking outside */
      document.addEventListener('click', function (e) {
        if (
          mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ---------- Active nav highlight ---------- */
    var sections = document.querySelectorAll('section[id], footer[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
      var current = '';
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }

    /* ---------- Scroll Reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });

    /* Langsung tampilkan elemen yang sudah terlihat di viewport */
    setTimeout(function () {
      revealEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    }, 100);

    /* ---------- Counter animation ---------- */
    function animateCounter(el, target, duration) {
      var start = performance.now();
      var isNum = !isNaN(target);
      if (!isNum) return;
      function update(now) {
        var elapsed  = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('id-ID');
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    var statNums = document.querySelectorAll('.hero-stat-num[data-target] span');
    var countersStarted = false;

    var counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach(function (span) {
          var target = parseInt(span.parentElement.dataset.target, 10);
          animateCounter(span, target, 1600);
        });
      }
    }, { threshold: 0.5 });

    var statsEl = document.querySelector('.hero-stats');
    if (statsEl) counterObserver.observe(statsEl);

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Smooth scroll ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetEl = document.querySelector(this.getAttribute('href'));
        if (targetEl) {
          e.preventDefault();
          var offset = 80;
          window.scrollTo({ top: targetEl.offsetTop - offset, behavior: 'smooth' });
        }
      });
    });

    /* ---------- Subtle product card tilt on hover ---------- */
    var produkCards = document.querySelectorAll('.produk-card:not(.produk-card-dll)');
    produkCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width  - 0.5) *  8;
        var y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
        card.style.transform = 'translateY(-5px) rotateX(' + y + 'deg) rotateY(' + x + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });

  } // end init()

  /* Run immediately if DOM is ready, otherwise wait */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
