/* ═══════════════════════════════════════════════════════════
   ELRHOS — Shared JavaScript
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ───────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        revealObserver.unobserve(el.target);
      }
    });
  }, { threshold: 0.10 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── Mobile nav ──────────────────────────────────────── */
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Sticky nav style on scroll ─────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 40
        ? 'rgba(13,16,23,0.96)'
        : 'rgba(13,16,23,0.82)';
    }, { passive: true });
  }

  /* ── Active nav link ─────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) link.classList.add('active');
    if (currentPage === '' && href === 'index.html') link.classList.add('active');
  });

  /* ── Smooth counter animation ────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ── Tab components ──────────────────────────────────── */
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const triggers = tabGroup.querySelectorAll('[data-tab-trigger]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        triggers.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        trigger.classList.add('active');
        const panel = tabGroup.querySelector(`[data-tab-panel="${trigger.dataset.tabTrigger}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ── Copy to clipboard ───────────────────────────────── */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ¡Copiado!`;
        btn.style.color = 'var(--green)';
        setTimeout(() => { btn.innerHTML = original; btn.style.color = ''; }, 2000);
      });
    });
  });

  /* ── Feedback form ───────────────────────────────────── */
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = feedbackForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ¡Enviado! Gracias`;
      btn.disabled = true;
      btn.style.background = 'var(--green)';
      btn.style.color = '#0D1017';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        feedbackForm.reset();
      }, 3500);
    });
  }

});
