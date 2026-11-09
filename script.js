(() => {
  const root = document.documentElement;
  const loader = document.getElementById('loading-screen');
  const progress = document.getElementById('progress-fill');
  const progressNumber = document.getElementById('progress-number');
  const progressTrack = document.getElementById('progress-track');
  const site = document.getElementById('site-shell');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentProgress = 0;
  const setProgress = (value) => {
    currentProgress = Math.max(currentProgress, Math.min(100, Math.round(value)));
    progress.style.width = `${currentProgress}%`;
    progressNumber.textContent = `${currentProgress}%`;
    progressTrack.setAttribute('aria-valuenow', String(currentProgress));
  };

  const whenWindowLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

  const whenFontsReady = document.fonts?.ready
    ? document.fonts.ready.catch(() => undefined)
    : Promise.resolve();

  const whenImagesReady = Promise.all(Array.from(document.images).map((image) => {
    if (image.complete) return Promise.resolve();
    if (typeof image.decode === 'function') return image.decode().catch(() => undefined);
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }));

  // Each step follows a real browser milestone: parsed document, ready fonts,
  // decoded images, and the page's load event. Nothing waits on an arbitrary delay.
  setProgress(22);
  Promise.all([
    whenFontsReady.then(() => setProgress(53)),
    whenImagesReady.then(() => setProgress(78)),
    whenWindowLoaded.then(() => setProgress(91)),
  ]).then(async () => {
    setProgress(100);
    loader.classList.add('is-ready');
    loader.setAttribute('aria-label', 'Semesta kecil untuk Ika siap dibuka');
    site.classList.add('is-visible');
    site.setAttribute('aria-busy', 'false');
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const fade = loader.animate(
      [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(5px)' }],
      { duration: reduceMotion ? 0 : 720, easing: 'cubic-bezier(.22,.75,.2,1)', fill: 'forwards' },
    );
    loader.classList.add('is-closing');
    try { await fade.finished; } catch { /* The user may navigate away mid-transition. */ }
    loader.classList.add('is-hidden');
    loader.remove();
    root.classList.add('page-ready');
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-in-view'));
  }

  const starButtons = Array.from(document.querySelectorAll('.star-point'));
  const starNote = document.getElementById('star-note-text');
  const starNoteCard = document.querySelector('.star-note');
  starButtons.forEach((button) => {
    button.addEventListener('click', () => {
      starButtons.forEach((star) => {
        const selected = star === button;
        star.classList.toggle('is-selected', selected);
        star.setAttribute('aria-pressed', String(selected));
      });
      starNoteCard.classList.add('is-changing');
      requestAnimationFrame(() => {
        starNote.textContent = button.dataset.message;
        starNoteCard.classList.remove('is-changing');
      });
    });
  });

  const envelopeButton = document.getElementById('envelope-button');
  const letterDialog = document.getElementById('love-letter');
  const letterClose = document.getElementById('letter-close');
  const closeLetter = () => {
    if (!letterDialog.open) return;
    if (reduceMotion) {
      letterDialog.close();
      return;
    }
    const closing = letterDialog.animate(
      [{ opacity: 1, transform: 'translate(-50%, -47%) scale(1)' }, { opacity: 0, transform: 'translate(-50%, -43%) scale(.97)' }],
      { duration: 220, easing: 'ease-in', fill: 'forwards' },
    );
    closing.finished.then(() => {
      if (letterDialog.open) letterDialog.close();
    }).catch(() => {
      if (letterDialog.open) letterDialog.close();
    });
  };

  envelopeButton.addEventListener('click', () => {
    if (letterDialog.open) return;
    envelopeButton.setAttribute('aria-expanded', 'true');
    letterDialog.showModal();
    letterClose.focus();
  });
  letterClose.addEventListener('click', closeLetter);
  letterDialog.addEventListener('close', () => {
    envelopeButton.setAttribute('aria-expanded', 'false');
    letterDialog.getAnimations().forEach((animation) => animation.cancel());
    envelopeButton.focus({ preventScroll: true });
  });

  // Keep the compact navigation's current section visible to keyboard and screen-reader users.
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const navTargets = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && navTargets.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeHref = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === activeHref) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    navTargets.forEach((target) => sectionObserver.observe(target));
  }
})();
