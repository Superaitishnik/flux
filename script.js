/* ===========================
   FLUX — SCRIPT.JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // CUSTOM CURSOR
  // ========================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateCursor = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  } else {
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
  }

  // ========================
  // NAV SCROLL
  // ========================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ========================
  // MOBILE MENU
  // ========================
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    });
  });

  // ========================
  // SCROLL REVEAL
  // ========================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ========================
  // COUNTER ANIMATION
  // ========================
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  // ========================
  // SERVICE CARD MOUSE GLOW
  // ========================
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  // ========================
  // SMOOTH ANCHOR SCROLL
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================
  // NAV LINK ACTIVE STATE
  // ========================
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ========================
  // ABOUT CARDS TILT
  // ========================
  document.querySelectorAll('.about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ========================
  // HERO PARALLAX
  // ========================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  // ========================
  // WORKS FEATURED 3D
  // ========================
  const browserChrome = document.querySelector('.browser-chrome');
  if (browserChrome) {
    const wrapEl = document.querySelector('.work-preview-wrap');
    if (wrapEl) {
      wrapEl.addEventListener('mousemove', (e) => {
        const rect = wrapEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        browserChrome.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
      });
      wrapEl.addEventListener('mouseleave', () => {
        browserChrome.style.transform = 'perspective(1000px) rotateY(-3deg) rotateX(2deg)';
      });
    }
  }

  // ========================
  // MARQUEE PAUSE ON HOVER
  // ========================
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ========================
  // GRADIENT TEXT ANIMATE
  // ========================
  let gradientAngle = 135;
  const gradientEls = document.querySelectorAll('.gradient-text, .logo-text, .footer-logo');

  const animateGradients = () => {
    gradientAngle += 0.3;
    const angle = gradientAngle % 360;
    gradientEls.forEach(el => {
      el.style.backgroundImage = `linear-gradient(${angle}deg, #6c63ff 0%, #00e5ff 50%, #6c63ff 100%)`;
    });
    requestAnimationFrame(animateGradients);
  };

  animateGradients();

  // ========================
  // PROCESS STEP ANIMATION
  // ========================
  const processSteps = document.querySelectorAll('.process-step');

  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = [...processSteps].indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  processSteps.forEach(step => processObserver.observe(step));

  // ========================
  // FOOTER CURRENT YEAR
  // ========================
  const yearEl = document.querySelector('.footer-bottom p');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.textContent = yearEl.textContent.replace('2025', year);
  }

  // ========================
  // PAGE LOAD ANIMATION
  // ========================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // ========================
  // ORBS FOLLOW MOUSE (subtle)
  // ========================
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length) {
    document.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 12;
        orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
      });
    });
  }

  // ========================
  // WHATSAPP FLOATING BUTTON
  // ========================
  const fab = document.createElement('a');
  fab.href = 'https://wa.me/87750027660';
  fab.target = '_blank';
  fab.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.735 5.47 2.022 7.768L0 32l8.43-2.209A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.849l-.486-.289-5.006 1.312 1.337-4.87-.318-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.884c-.398-.2-2.355-1.162-2.72-1.294-.366-.133-.632-.2-.898.2-.265.398-1.03 1.294-1.263 1.56-.232.265-.465.298-.863.1-.398-.2-1.68-.619-3.2-1.975-1.183-1.055-1.981-2.357-2.214-2.754-.232-.398-.025-.613.175-.812.18-.179.398-.465.597-.697.2-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.2-.898-2.164-1.23-2.963-.325-.78-.655-.675-.898-.687l-.765-.013c-.265 0-.697.1-1.063.497-.365.398-1.395 1.362-1.395 3.325s1.428 3.857 1.627 4.123c.2.265 2.81 4.29 6.808 6.016.952.411 1.695.657 2.273.841.955.304 1.825.261 2.512.158.766-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.1-.165-.365-.265-.763-.465z"/>
    </svg>
  `;
  fab.title = 'Написать в WhatsApp';
  fab.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 900;
    width: 60px;
    height: 60px;
    background: #25d366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 8px 30px rgba(37,211,102,0.4);
    transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
    text-decoration: none;
    animation: fabPulse 2.5s ease-in-out infinite;
  `;

  const fabStyle = document.createElement('style');
  fabStyle.textContent = `
    @keyframes fabPulse {
      0%, 100% { box-shadow: 0 8px 30px rgba(37,211,102,0.4), 0 0 0 0 rgba(37,211,102,0.3); }
      50% { box-shadow: 0 8px 30px rgba(37,211,102,0.5), 0 0 0 12px rgba(37,211,102,0); }
    }
    a[title="Написать в WhatsApp"]:hover {
      transform: translateY(-4px) scale(1.08) !important;
      box-shadow: 0 16px 40px rgba(37,211,102,0.6) !important;
    }
  `;
  document.head.appendChild(fabStyle);
  document.body.appendChild(fab);

  // ========================
  // TYPING EFFECT (hero sub)
  // ========================
  // Optional: add a subtle blinking cursor after hero badge
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.style.cursor = 'default';
  }

  // ========================
  // SCROLL PROGRESS BAR
  // ========================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6c63ff, #00e5ff);
    z-index: 9997;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s linear;
    box-shadow: 0 0 10px rgba(108,99,255,0.6);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / total;
    progressBar.style.transform = `scaleX(${progress})`;
  }, { passive: true });

});
