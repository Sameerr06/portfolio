(function () {
  'use strict';

  /* ---- Particles ---- */
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#6c63ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#6c63ff',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.3 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  /* ---- Typewriter ---- */
  const roles = [
    'Aspiring AI Engineer',
    'DevOps Enthusiast',
    'Cloud Native Developer',
    'SRE Practitioner',
  ];
  const typingEl = document.querySelector('.typing-text');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!typingEl) return;
    const current = roles[roleIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx--);
      typeSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIdx++);
      typeSpeed = 80;
    }
    if (!isDeleting && charIdx === current.length + 1) {
      isDeleting = true;
      typeSpeed = 1500;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }
    setTimeout(typeEffect, typeSpeed);
  }

  document.addEventListener('DOMContentLoaded', typeEffect);

  /* ---- Theme Toggle ---- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
      themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  themeToggle?.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeIcon) {
      themeIcon.className = next === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });

  /* ---- Mobile Hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  /* ---- Scroll Reveal ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---- Skill Bars Animation ---- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute('data-width') + '%';
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.skill-progress').forEach((bar) => skillObserver.observe(bar));

  /* ---- Active Nav Link on Scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ---- Contact Form ---- */
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const orig = btn.textContent;
    btn.textContent = 'Sent!';
    btn.style.background = '#00d4aa';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
})();
