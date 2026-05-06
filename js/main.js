/* ============================================================
   main.js — Shared JS utilities across all pages
   ============================================================ */

/* ── Scroll Reveal ────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ── Skill bars ───────────────────────────────────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.dataset.pct || '0';
        e.target.style.width = target + '%';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(el => observer.observe(el));
}

/* ── Project / Gallery filter ─────────────────────────────── */
function initFilter(filterSelector, itemSelector, dataAttr) {
  const btns  = document.querySelectorAll(filterSelector);
  const items = document.querySelectorAll(itemSelector);
  if (!btns.length || !items.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cats = (item.dataset[dataAttr] || '').split(',').map(c => c.trim());
        const show = filter === 'all' || cats.includes(filter);
        item.style.opacity = show ? '1' : '0';
        item.style.pointerEvents = show ? '' : 'none';
        item.style.transform = show ? '' : 'scale(.95)';
        item.style.transition = 'opacity .35s ease, transform .35s ease';
      });
    });
  });
}

/* ── Contact form ─────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      const success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 4000);
      }
    }, 1500);
  });
}

/* ── Gallery lightbox ─────────────────────────────────────── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn    = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src || item.querySelector('img')?.src || '';
      const alt = item.dataset.alt || '';
      if (lightboxImg) { lightboxImg.src = src; lightboxImg.alt = alt; }
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

/* ── Marquee duplicate ─────────────────────────────────────── */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  // Duplicate children for seamless loop
  const items = track.innerHTML;
  track.innerHTML = items + items;
}

/* ── Typed text effect ─────────────────────────────────────── */
function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const words = el.dataset.words?.split('|') || [];
  if (!words.length) return;

  let wordIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = words[wordIdx];
    el.textContent = word.slice(0, charIdx) + (Math.floor(Date.now() / 500) % 2 === 0 ? '|' : '');

    if (!deleting && charIdx < word.length) {
      charIdx++;
      setTimeout(tick, 80);
    } else if (!deleting && charIdx === word.length) {
      deleting = true;
      setTimeout(tick, 1800);
    } else if (deleting && charIdx > 0) {
      charIdx--;
      setTimeout(tick, 45);
    } else {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(tick, 300);
    }
  }
  tick();
}

/* ── Counter animation ─────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseInt(el.dataset.target || '0', 10);
    const duration = 1600;
    const start = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, { threshold: 0.6 });

    observer.observe(el);
  });
}

/* ── Init all ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSkillBars();
  initFilter('.filter-btn', '.project-card', 'category');
  initFilter('.filter-btn', '.gallery-item', 'category');
  initContactForm();
  initLightbox();
  initMarquee();
  initTyped();
  initCounters();
});