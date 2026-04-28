/* ═══════════════════════════════════════════════
   PORTFOLIO MAIN JS — CLEAN VERSION
═══════════════════════════════════════════════ */

'use strict';

/* ── INIT AFTER LOAD ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      loader.addEventListener('transitionend', () => loader.remove());
    }
    initAll();
  }, 1500);
});

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

/* ── CURSOR (SAFE) ── */
function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

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

  document.querySelectorAll('a, button, .proj-card, .cert-card, .ach-card, .tl-card, .pillar, .chip')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

/* ── PARTICLES ── */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ['#00d4ff', '#a855f7', '#06b6d4'] },
      shape: { type: 'circle' },
      opacity: { value: 0.3 },
      size: { value: 2 },
      line_linked: { enable: true, distance: 140, color: '#00d4ff', opacity: 0.1 },
      move: { enable: true, speed: 1 }
    }
  });
}

/* ── TYPING ── */
function initTyping() {
  const nameEl = document.getElementById('typedName');
  const taglineEl = document.getElementById('typedTagline');
  if (!nameEl) return;

  const name = 'Vishnu Mahendra Reddy L';
  const tagline = 'Cybersecurity & AI Enthusiast';

  nameEl.textContent = '';
  if (taglineEl) taglineEl.textContent = '';

  let i = 0, j = 0;

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

/* ── NAVBAR ── */
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
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
      bar.style.width = (window.scrollY / total) * 100 + '%';
    }
  });
}

/* ── REVEAL ── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

/* ── SKILL FILL (FIXED SINGLE SYSTEM) ── */
function initSectionObserver() {
  const sections = document.querySelectorAll('#skills, #languages');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sk-fill, .lang-fill')
          .forEach(fill => {
            fill.style.width = fill.dataset.w + '%';
          });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

/* ── TILT ── */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    const shine = card.querySelector('.proj-shine');

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      card.style.transform =
        `perspective(800px) rotateX(${(y - 0.5) * -10}deg)
         rotateY(${(x - 0.5) * 10}deg)`;

      if (shine) {
        shine.style.setProperty('--mx', x * 100 + '%');
        shine.style.setProperty('--my', y * 100 + '%');
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── THEME ── */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ── HAMBURGER ── */
function initHamburger() {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
}

/* ── FORM ── */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('f-name');
    const email = document.getElementById('f-email');
    const msg = document.getElementById('f-msg');
    const btn = document.getElementById('submitText');

    if (!name || !email || !msg) return;

    if (btn) btn.textContent = 'Sending...';

    setTimeout(() => {
      if (btn) btn.textContent = 'Send Message';
      form.reset();
    }, 1200);
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
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

/* ── GEO LOCATION FEATURE (NAME BASED) ── */
function initGeoLocation() {
  const btn = document.getElementById("getLocationBtn");
  const status = document.getElementById("locationStatus");

  if (!btn || !status) return;

  btn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      status.textContent = "Geolocation not supported in your browser.";
      return;
    }

    status.textContent = "Fetching your location...";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Reverse geocoding API (OpenStreetMap)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await res.json();

          const place =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state_district ||
            "Unknown Location";

          const state = data.address.state || "";
          const country = data.address.country || "";

          status.innerHTML = `
            📍 You are in:<br>
            <strong>${place}</strong><br>
            ${state ? state + ", " : ""}${country}
          `;
        } catch (err) {
          status.textContent = "❌ Failed to get location name.";
        }
      },
      (error) => {
        status.textContent = "❌ Permission denied or location unavailable.";
      }
    );
  });
}

