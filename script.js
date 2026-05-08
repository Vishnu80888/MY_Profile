/* ═══════════════════════════════════════════════
   PORTFOLIO MAIN JS — FIXED VERSION
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   INIT AFTER WINDOW LOAD
───────────────────────────────────────────── */
window.addEventListener('load', () => {

  setTimeout(() => {

    const loader = document.getElementById('loader');

    if (loader) {

      loader.classList.add('hidden');

      setTimeout(() => {
        loader.remove();
      }, 500);

    }

    initAll();

  }, 1500);

});

/* ─────────────────────────────────────────────
   INIT ALL FUNCTIONS
───────────────────────────────────────────── */
function initAll() {

  initCursor();
  initParticles();
  initTyping();
  initNavbar();
  initScrollProgress();
  initReveal();
  initTilt();
  initTheme();
  initHamburger();
  initForm();
  initSmoothScroll();
  initSectionObserver();
  initGeoLocation();

}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function initCursor() {

  if (window.matchMedia("(hover: none)").matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  document.addEventListener('mousemove', e => {

    mx = e.clientX;
    my = e.clientY;

    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';

  });

  (function animate() {

    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    requestAnimationFrame(animate);

  })();

  document.querySelectorAll(
    'a, button, .proj-card, .tl-card, .pillar, .chip'
  ).forEach(el => {

    el.addEventListener('mouseenter', () => {
      ring.classList.add('hovered');
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hovered');
    });

  });

}

/* ─────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────── */
function initParticles() {

  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {

    particles: {

      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },

      color: {
        value: ['#00d4ff', '#a855f7', '#06b6d4']
      },

      shape: {
        type: 'circle'
      },

      opacity: {
        value: 0.3
      },

      size: {
        value: 2
      },

      line_linked: {
        enable: true,
        distance: 140,
        color: '#00d4ff',
        opacity: 0.1
      },

      move: {
        enable: true,
        speed: 1
      }

    }

  });

}

/* ─────────────────────────────────────────────
   TYPING EFFECT
───────────────────────────────────────────── */
function initTyping() {

  const nameEl = document.getElementById('typedName');
  const taglineEl = document.getElementById('typedTagline');

  if (!nameEl) return;

  const name = 'Vishnu Mahendra Reddy L';
  const tagline = 'Cybersecurity & AI Enthusiast';

  nameEl.textContent = '';

  if (taglineEl) {
    taglineEl.textContent = '';
  }

  let i = 0;
  let j = 0;

  function typeName() {

    if (i < name.length) {

      nameEl.textContent += name[i++];
      setTimeout(typeName, 70);

    } else {

      setTimeout(typeTag, 300);

    }

  }

  function typeTag() {

    if (!taglineEl) return;

    if (j < tagline.length) {

      taglineEl.textContent += tagline[j++];
      setTimeout(typeTag, 40);

    }

  }

  setTimeout(typeName, 400);

}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function initNavbar() {

  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  window.addEventListener('scroll', () => {

    navbar.classList.toggle('scrolled', window.scrollY > 50);

    updateActiveLink(links);

  });

}

function updateActiveLink(links) {

  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(sec => {

    if (window.scrollY >= sec.offsetTop - 150) {
      current = sec.id;
    }

  });

  links.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + current
    );

  });

}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS
───────────────────────────────────────────── */
function initScrollProgress() {

  const bar = document.getElementById('scroll-progress');

  if (!bar) return;

  window.addEventListener('scroll', () => {

    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (total > 0) {

      bar.style.width =
        (window.scrollY / total) * 100 + '%';

    }

  });

}

/* ─────────────────────────────────────────────
   REVEAL ANIMATION
───────────────────────────────────────────── */
function initReveal() {

  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

      }

    });

  }, {
    threshold: 0.15
  });

  items.forEach(el => observer.observe(el));

}

/* ─────────────────────────────────────────────
   SKILL BAR ANIMATION
───────────────────────────────────────────── */
function initSectionObserver() {

  const sections =
    document.querySelectorAll('#skills, #languages');

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target
          .querySelectorAll('.sk-fill, .lang-fill')
          .forEach(fill => {

            fill.style.width =
              fill.dataset.w + '%';

          });

      }

    });

  }, {
    threshold: 0.3
  });

  sections.forEach(s => observer.observe(s));

}

/* ─────────────────────────────────────────────
   3D TILT EFFECT
───────────────────────────────────────────── */
function initTilt() {

  document.querySelectorAll('.tilt-card')
    .forEach(card => {

      const shine = card.querySelector('.proj-shine');

      card.addEventListener('mousemove', e => {

        const r = card.getBoundingClientRect();

        const x =
          (e.clientX - r.left) / r.width;

        const y =
          (e.clientY - r.top) / r.height;

        card.style.transform =
          `perspective(800px)
           rotateX(${(y - 0.5) * -10}deg)
           rotateY(${(x - 0.5) * 10}deg)`;

        if (shine) {

          shine.style.setProperty(
            '--mx',
            x * 100 + '%'
          );

          shine.style.setProperty(
            '--my',
            y * 100 + '%'
          );

        }

      });

      card.addEventListener('mouseleave', () => {

        card.style.transform = '';

      });

    });

}

/* ─────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────── */
function initTheme() {

  const btn = document.getElementById('themeToggle');
  const root = document.body;

  if (!btn) return;

  const saved =
    localStorage.getItem('theme') || 'dark';

  root.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {

    const next =
      root.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';

    root.setAttribute('data-theme', next);

    localStorage.setItem('theme', next);

  });

}

/* ─────────────────────────────────────────────
   MOBILE HAMBURGER MENU
───────────────────────────────────────────── */
function initHamburger() {

  const burger =
    document.getElementById('hamburger');

  const nav =
    document.getElementById('navLinks');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {

    burger.classList.toggle('active');
    nav.classList.toggle('active');

  });

  document.querySelectorAll('.nav-link')
    .forEach(link => {

      link.addEventListener('click', () => {

        burger.classList.remove('active');
        nav.classList.remove('active');

      });

    });

}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function initForm() {

  const form =
    document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', e => {

    e.preventDefault();

    const name =
      document.getElementById('f-name');

    const email =
      document.getElementById('f-email');

    const msg =
      document.getElementById('f-msg');

    const btn =
      document.getElementById('submitText');

    if (!name || !email || !msg) return;

    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !msg.value.trim()
    ) {
      alert('Please fill all fields.');
      return;
    }

    if (btn) {
      btn.textContent = 'Sending...';
    }

    setTimeout(() => {

      if (btn) {
        btn.textContent = 'Send Message';
      }

      form.reset();

      const success =
        document.getElementById('form-success');

      if (success) {

        success.style.display = 'block';

        setTimeout(() => {
          success.style.display = 'none';
        }, 2500);

      }

    }, 1200);

  });

}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL
───────────────────────────────────────────── */
function initSmoothScroll() {

  document.querySelectorAll('a[href^="#"]')
    .forEach(a => {

      a.addEventListener('click', e => {

        const href =
          a.getAttribute('href');

        if (!href || href === '#') return;

        const target =
          document.querySelector(href);

        if (target) {

          e.preventDefault();

          window.scrollTo({

            top: target.offsetTop - 60,
            behavior: 'smooth'

          });

        }

      });

    });

}

/* ─────────────────────────────────────────────
   GEO LOCATION FEATURE
───────────────────────────────────────────── */
function initGeoLocation() {

  const btn =
    document.getElementById('getLocationBtn');

  const status =
    document.getElementById('locationStatus');

  if (!btn || !status) return;

  btn.addEventListener('click', () => {

    if (!navigator.geolocation) {

      status.textContent =
        'Geolocation not supported in your browser.';

      return;

    }

    status.textContent =
      'Fetching your location...';

    navigator.geolocation.getCurrentPosition(

      async position => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await res.json();

          const address =
            data.address || {};

          const place =
            address.city ||
            address.town ||
            address.village ||
            address.state_district ||
            'Unknown Location';

          const state =
            address.state || '';

          const country =
            address.country || '';

          status.innerHTML = `
            📍 You are in:<br>
            <strong>${place}</strong><br>
            ${state ? state + ', ' : ''}${country}
          `;

        } catch (err) {

          status.textContent =
            '❌ Failed to get location name.';

        }

      },

      () => {

        status.textContent =
          '❌ Permission denied or location unavailable.';

      }

    );

  });

}

// ================= MOBILE NAVBAR =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navLink = document.querySelectorAll(".nav-link");

// Toggle Menu
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close Menu When Link Clicked
navLink.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});