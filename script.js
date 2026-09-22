/**
 * Rahmat Dwi Nurcahyo - Portfolio Script
 * Modern, Vanilla JS, Zero External JS Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. LOADER
     ========================================================================== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
      }
    }, 400);
  });

  /* Fallback if load event already fired or slow */
  if (document.readyState === 'complete') {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 400);
  }

  /* ==========================================================================
     2. THEME TOGGLE (DARK / LIGHT)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  const getPreferredTheme = () => {
    return 'light';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  };

  applyTheme(getPreferredTheme());

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ==========================================================================
     3. LANGUAGE TOGGLE (ID / EN)
     ========================================================================== */
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  const rolesID = [
    'AI Enthusiast',
    'IoT Developer',
    'Database Enthusiast',
    'Laravel Developer',
    'Lab Assistant'
  ];

  const rolesEN = [
    'AI Enthusiast',
    'IoT Developer',
    'Database Enthusiast',
    'Laravel Developer',
    'Lab Assistant'
  ];

  let currentLang = localStorage.getItem('lang') || 'id';

  const updateLanguage = (lang) => {
    currentLang = lang;
    root.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    // Update all elements with data-id & data-en
    document.querySelectorAll('[data-id][data-en]').forEach((el) => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
      if (text) {
        if (el.hasAttribute('aria-label') && (!el.textContent.trim() || el.classList.contains('carousel-btn'))) {
          el.setAttribute('aria-label', text);
          return;
        }
        // Check if element has child icons we want to preserve
        const icon = el.querySelector('i');
        const span = el.querySelector('span');
        if (span) {
          span.textContent = text;
        } else if (icon) {
          el.innerHTML = `${icon.outerHTML} <span>${text}</span>`;
        } else {
          el.textContent = text;
        }
      }
    });
  };

  updateLanguage(currentLang);

  langToggle?.addEventListener('click', () => {
    updateLanguage(currentLang === 'id' ? 'en' : 'id');
  });

  /* ==========================================================================
     4. NAVBAR SCROLL & MOBILE MENU
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollProgressBar) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const percent = (window.scrollY / scrollTotal) * 100;
        scrollProgressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      }
    }
  });

  hamburger?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navMenu?.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      navMenu.classList.remove('active');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ==========================================================================
     5. HERO TYPING EFFECT
     ========================================================================== */
  const typedTextSpan = document.getElementById('typedText');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 110;
  const erasingDelay = 60;
  const newRoleDelay = 1800;

  const typeRoles = () => {
    const activeRoles = currentLang === 'en' ? rolesEN : rolesID;
    const currentRole = activeRoles[roleIndex % activeRoles.length];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = newRoleDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % activeRoles.length;
      speed = 400;
    }

    setTimeout(typeRoles, speed);
  };

  if (typedTextSpan) {
    typeRoles();
  }

  /* ==========================================================================
     6. HERO PARALLAX EFFECT
     ========================================================================== */
  const shapes = document.querySelectorAll('.shape');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 0.7;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  /* ==========================================================================
     7. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const animatedElements = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right, .about-text-card, .timeline-item, .stat-card, .skill-card, .contact-card'
  );
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px 80px 0px' }
    );

    animatedElements.forEach((el) => revealObserver.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('active'));
  }

  /* ==========================================================================
     8. GENERIC CAROUSEL FUNCTION (PROJECTS & CERTIFICATES)
     ========================================================================== */
  const setupCarousel = ({ trackId, prevBtnId, nextBtnId, dotsContainerId, cardSelector, intervalTime = 4000, itemsPerView }) => {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsContainerId);
    const cards = document.querySelectorAll(cardSelector);

    if (!track || cards.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval = null;

    const getVisibleCount = () => {
      if (itemsPerView) return itemsPerView;
      return window.innerWidth <= 1024 ? 1 : 2;
    };

    const getMaxIndex = () => {
      return Math.max(0, cards.length - getVisibleCount());
    };

    const createDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalSteps = getMaxIndex() + 1;
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        if (i === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      const dots = dotsContainer?.querySelectorAll('.carousel-dot');
      dots?.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      currentSlide = Math.max(0, Math.min(index, maxIdx));

      const card = cards[0];
      const gap = 24;
      const cardWidth = card.getBoundingClientRect().width;
      const amountToMove = (cardWidth + gap) * currentSlide;

      track.style.transform = `translateX(-${amountToMove}px)`;
      updateDots();
    };

    prevBtn?.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      const target = currentSlide === 0 ? maxIdx : currentSlide - 1;
      goToSlide(target);
      resetAutoSlide();
    });

    nextBtn?.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      const target = currentSlide >= maxIdx ? 0 : currentSlide + 1;
      goToSlide(target);
      resetAutoSlide();
    });

    const startAutoSlide = () => {
      if (intervalTime <= 0) return;
      autoSlideInterval = setInterval(() => {
        const maxIdx = getMaxIndex();
        const next = currentSlide >= maxIdx ? 0 : currentSlide + 1;
        goToSlide(next);
      }, intervalTime);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    };

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => startAutoSlide());

    createDots();
    startAutoSlide();

    window.addEventListener('resize', () => {
      createDots();
      goToSlide(currentSlide);
    });
  };

  // Initialize Projects Carousel
  setupCarousel({
    trackId: 'projectTrack',
    prevBtnId: 'prevProj',
    nextBtnId: 'nextProj',
    dotsContainerId: 'projectDots',
    cardSelector: '#projectTrack .project-card',
    intervalTime: 4500
  });

  // Initialize Hobby Carousel
  setupCarousel({
    trackId: 'hobbyTrack',
    prevBtnId: 'prevHobby',
    nextBtnId: 'nextHobby',
    dotsContainerId: 'hobbyDots',
    cardSelector: '#hobbyTrack .hobby-slide',
    intervalTime: 6000,
    itemsPerView: 1
  });

  // Initialize Certificates Carousel
  setupCarousel({
    trackId: 'certTrack',
    prevBtnId: 'prevCert',
    nextBtnId: 'nextCert',
    dotsContainerId: 'certDots',
    cardSelector: '#certTrack .cert-card',
    intervalTime: 4000
  });

  /* ==========================================================================
     9. LIGHTBOX (PROJECTS & CERTIFICATES FULLSCREEN PREVIEW)
     ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = (src, title) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Lightbox for Certificates
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const title = card.querySelector('h3, h4')?.textContent || card.getAttribute('data-title') || '';
      if (src) openLightbox(src, title);
    });
  });

  // Lightbox for Projects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src') || card.querySelector('.project-img')?.getAttribute('src');
      const title = card.querySelector('.project-title')?.textContent || '';
      if (src) openLightbox(src, title);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      closeLightbox();
    }
  });
});
