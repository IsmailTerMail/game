(() => {
  const root = document.documentElement;
  const loader = document.getElementById('loading-screen');
  const clock = document.getElementById('journey-clock');
  const progressFill = document.getElementById('progress-fill');
  const progressNumber = document.getElementById('progress-number');
  const progressTrack = document.getElementById('progress-track');
  const progressLabel = document.getElementById('progress-label');
  const welcome = document.getElementById('welcome-screen');
  const site = document.getElementById('site-shell');
  const enterButton = document.getElementById('enter-universe');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const journeyDuration = reduceMotion ? 1 : 5000;
  const defaultTitle = document.title;
  const languageButtons = Array.from(document.querySelectorAll('[data-language-toggle]'));
  const originalText = new WeakMap();
  let currentLanguage = 'mixed';

  const translations = {
    'A LITTLE UNIVERSE, MADE JUST FOR YOU': 'SEMESTA KECIL YANG DIBUAT KHUSUS UNTUKMU',
    'A little world': 'Dunia kecil', 'for Ika.': 'untuk Ika.',
    'Made with love, just for Ika': 'Dibuat dengan cinta, khusus untuk Ika',
    'Preparing a little world for you...': 'Menyiapkan dunia kecil untukmu...',
    'Gathering little stars and flowers...': 'Mengumpulkan bintang dan bunga kecil...',
    'Your little universe is ready.': 'Semesta kecilmu sudah siap.',
    'preparing your little world': 'menyiapkan dunia kecilmu',
    'A LITTLE WORLD, MADE WITH LOVE': 'DUNIA KECIL YANG DIBUAT DENGAN CINTA',
    'A LITTLE UNIVERSE, MADE FOR YOU': 'SEMESTA KECIL YANG DIBUAT UNTUKMU',
    'Welcome to Your': 'Selamat Datang di', 'Little Universe, Ika.': 'Semesta Kecilmu, Ika.',
    'Somewhere among the stars, flowers, and little dreams, I made a place just for you.': 'Di antara bintang, bunga, dan mimpi kecil, aku membuat tempat khusus untukmu.',
    'Dear, Ika.': 'Ika tersayang,',
    'Somewhere in this universe, there is someone who makes everything feel a little more beautiful. And this little universe was made just for you.': 'Di semesta ini, ada seseorang yang membuat segalanya terasa sedikit lebih indah. Dan semesta kecil ini dibuat khusus untukmu.',
    "Welcome to your little world, Ika. Take your time, there's no need to rush. I hope you find a little warmth in every word waiting here.": 'Selamat datang di dunia kecilmu, Ika. Nikmati perlahan, tak perlu terburu-buru. Semoga setiap kata di sini memberimu sedikit kehangatan.',
    'Take your time, little one. This world is yours.': 'Nikmati perlahan, sayang. Dunia ini milikmu.',
    'Enter My Little Universe': 'Masuk ke Semesta Kecilku', 'Created with love, Zaza': 'Dibuat dengan cinta, Zaza', 'by Zaza': 'oleh Zaza',
    'Our Beginning': 'Awal Cerita Kita', 'My Letter': 'Surat untuk Ika', 'Open When': 'Buka Saat...',
    'The Stars': 'Bintang-bintang', 'Final Letter': 'Surat Penutup', 'Daftar bagian': 'Daftar bagian',
    '01 · Our Little Beginning': '01 · Awal Kecil Kita', '02 · A Letter for Ika': '02 · Surat untuk Ika',
    '03 · Things I Love About You': '03 · Hal yang Kusukai Darimu', '04 · Open When...': '04 · Buka Saat...',
    '05 · A Few Words for You': '05 · Beberapa Kata untukmu', '06 · Little Stories': '06 · Cerita Kecil',
    '07 · Somewhere Between the Stars': '07 · Di Antara Bintang', '08 · Please Remember': '08 · Ingatlah Ini',
    '09 · Wishes for You': '09 · Harapanku untukmu', '10 · My Promises': '10 · Janjiku',
    '11 · A Little Note from the Cats': '11 · Pesan Kecil dari Para Kucing', '12 · Until the Next Page': '12 · Sampai Halaman Berikutnya',
    'A SMALL PLACE FOR YOUR WORDS': 'RUANG KECIL UNTUK KATA-KATAMU',
    'Our Little': 'Awal Kecil', 'Beginning': 'Kita',
    'Somewhere in this universe, I made a little world just for you.': 'Di suatu tempat di semesta ini, aku membuat dunia kecil khusus untukmu.',
    'This little universe is yours, Ika. And I hope it makes you feel loved, appreciated, and remembered.': 'Semesta kecil ini milikmu, Ika. Semoga kamu merasa disayangi, dihargai, dan selalu diingat.',
    'TURN THE PAGE': 'BALIK HALAMAN', 'A LETTER FOR IKA': 'SURAT UNTUK IKA',
    'A LETTER': 'Surat', 'for Ika': 'untuk Ika', 'Some things are easier to say, one page at a time.': 'Ada hal-hal yang lebih mudah disampaikan, satu halaman demi satu halaman.',
    'A LETTER, SEALED WITH LOVE': 'SURAT YANG DISEGEL DENGAN CINTA',
    'For Ika, whenever you feel like reading.': 'Untuk Ika, kapan pun kamu ingin membacanya.',
    'Touch to open': 'Sentuh untuk membuka', 'Fold the letter': 'Tutup suratnya',
    'I hope life treats you gently, and I hope you never forget how much your existence matters.': 'Semoga hidup memperlakukanmu dengan lembut, dan semoga kamu tak pernah lupa bahwa kehadiranmu begitu berarti.',
    'With all the affection I may not always know how to put into words,': 'Dengan segenap kasih yang kadang sulit kuungkapkan lewat kata-kata,',
    'A FEW THINGS, OUT OF SO MANY': 'BEBERAPA HAL DARI SEKIAN BANYAK',
    'Things I Love': 'Hal yang Kusukai', 'About You': 'Darimu',
    'Your Smile': 'Senyummu', 'Your Kind Heart': 'Hatimu yang Baik', 'Your Little Habits': 'Kebiasaan Kecilmu',
    'Your Lovely Mind': 'Pikiran Indahmu', 'Your Presence': 'Kehadiranmu', 'Your Brave Side': 'Sisi Beraninya',
    'Your Soft Side': 'Sisi Lembutmu', 'Simply Being You': 'Menjadi Dirimu Sendiri',
    "You don't have to be anyone else.": 'Kamu tak perlu menjadi orang lain.',
    'OPEN WHEN...': 'BUKA SAAT...', 'For the days when': 'Untuk hari-hari saat', 'you need a little note.': 'kamu butuh pesan kecil.',
    'FOR EVERY KIND OF DAY': 'UNTUK SETIAP JENIS HARI',
    'Open When You Feel Sad': 'Buka Saat Kamu Sedih', 'Open When You Feel Tired': 'Buka Saat Kamu Lelah',
    'Open When You Miss Me': 'Buka Saat Kamu Merindukanku', 'Open When You Feel Insecure': 'Buka Saat Kamu Merasa Ragu pada Diri Sendiri',
    'Open When You Think You Are Not Enough': 'Buka Saat Kamu Merasa Tidak Cukup Baik',
    'Open When You Need Motivation': 'Buka Saat Kamu Butuh Semangat',
    "Open When You Can't Fall Asleep": 'Buka Saat Kamu Sulit Tidur',
    'Open When You Forget How Special You Are': 'Buka Saat Kamu Lupa Betapa Istimewanya Dirimu',
    'Ika, kalau hari ini terasa berat, tidak apa-apa untuk berhenti sebentar. Kamu tidak harus memaksakan diri terlihat baik-baik saja. Menangis bukan berarti kamu lemah, dan merasa sedih bukan berarti kamu gagal. Ambil waktu untuk bernapas, istirahat, dan pelan-pelan kembali menemukan tenangmu. I hope tomorrow feels a little kinder to you.': 'Ika, kalau hari ini terasa berat, tidak apa-apa untuk berhenti sebentar. Kamu tidak harus memaksakan diri terlihat baik-baik saja. Menangis bukan berarti kamu lemah, dan merasa sedih bukan berarti kamu gagal. Ambil waktu untuk bernapas, istirahat, dan pelan-pelan kembali menemukan tenangmu. Semoga besok terasa sedikit lebih ramah kepadamu.',
    'Kalau kamu sedang merindukanku, semoga pesan ini bisa menjadi pengingat kecil bahwa ada seseorang yang juga menyimpan banyak cerita tentangmu. Mungkin sekarang kita tidak sedang berada di tempat yang sama, tetapi kita masih bisa saling menyapa, bercerita, dan menjaga hubungan dengan baik. Sending you a little hug from here.': 'Kalau kamu sedang merindukanku, semoga pesan ini bisa menjadi pengingat kecil bahwa ada seseorang yang juga menyimpan banyak cerita tentangmu. Mungkin sekarang kita tidak sedang berada di tempat yang sama, tetapi kita masih bisa saling menyapa, bercerita, dan menjaga hubungan dengan baik. Kukirim pelukan kecil dari sini.',
    'Ika, jangan terlalu sering membandingkan dirimu dengan orang lain, ya. Setiap orang punya waktunya sendiri untuk tumbuh. Kamu tidak perlu menjadi seperti siapa pun agar pantas dihargai. Ada banyak hal baik dalam dirimu yang mungkin belum selalu kamu lihat. Please be gentle with yourself.': 'Ika, jangan terlalu sering membandingkan dirimu dengan orang lain, ya. Setiap orang punya waktunya sendiri untuk tumbuh. Kamu tidak perlu menjadi seperti siapa pun agar pantas dihargai. Ada banyak hal baik dalam dirimu yang mungkin belum selalu kamu lihat. Berbaikhatilah kepada dirimu sendiri.',
    'Sudah malam, jadi jangan terlalu banyak memikirkan hal yang belum tentu bisa kamu selesaikan sekarang. Tarik napas pelan, lepaskan beban hari ini sedikit demi sedikit, lalu izinkan dirimu beristirahat. Semoga tidurmu nyaman dan besok kamu bangun dengan perasaan yang lebih ringan. Good night, little star.': 'Sudah malam, jadi jangan terlalu banyak memikirkan hal yang belum tentu bisa kamu selesaikan sekarang. Tarik napas pelan, lepaskan beban hari ini sedikit demi sedikit, lalu izinkan dirimu beristirahat. Semoga tidurmu nyaman dan besok kamu bangun dengan perasaan yang lebih ringan. Selamat malam, bintang kecil.',
    'A FEW WORDS FOR YOU': 'BEBERAPA KATA UNTUKMU', 'A Few Words': 'Beberapa Kata', 'for You': 'untukmu',
    'TULIPS & ROSES': 'TULIP & MAWAR', 'A LITTLE TULIP FOR YOU': 'TULIP KECIL UNTUKMU',
    'A ROSE WITH WARM WISHES': 'MAWAR DENGAN HARAPAN HANGAT', 'You deserve kindness, too.': 'Kamu juga pantas diperlakukan dengan baik.',
    'LITTLE STORIES': 'CERITA KECIL', 'SMALL MOMENTS, KEPT CLOSE': 'MOMEN KECIL YANG TERSIMPAN',
    'Little': 'Cerita', 'Stories': 'Kecil', 'The Beginning': 'Awal Mula', 'Getting Closer': 'Semakin Dekat',
    'The Little Things': 'Hal-Hal Kecil', 'Across the Distance': 'Melintasi Jarak', 'More Stories Ahead': 'Masih Banyak Cerita di Depan',
    'A SKY THAT MAKES ME THINK OF YOU': 'LANGIT YANG MENGINGATKANKU PADAMU',
    'SOMEWHERE BETWEEN THE STARS': 'DI SUATU TEMPAT DI ANTARA BINTANG',
    'Somewhere Between': 'Di Antara', 'the Stars': 'Bintang-bintang',
    'For the girl who finds beauty in the moon, the sky, and everything beyond it.': 'Untuk perempuan yang menemukan keindahan pada bulan, langit, dan segala sesuatu di baliknya.',
    'THE MOON — MY FAVORITE MOON': 'BULAN — BULAN FAVORITKU', 'THE SKY — A SKY FULL OF WISHES': 'LANGIT — PENUH HARAPAN',
    'THE CLOUDS — SOFT LIKE YOU': 'AWAN — LEMBUT SEPERTIMU', 'THE STARS — YOU ARE MY LITTLE STAR': 'BINTANG — KAMU BINTANG KECILKU',
    'THE MILKY WAY — A UNIVERSE WITHIN YOU': 'GALAKSI BIMA SAKTI — SEMESTA DI DALAM DIRIMU',
    'A LITTLE THOUGHT': 'SEBUAH RENUNGAN KECIL',
    'If I could give you one thing, I would give you the ability to see yourself through my eyes. Maybe then, you would understand how beautiful your existence really is.': 'Kalau aku bisa memberimu satu hal, aku ingin memberimu kemampuan untuk melihat dirimu melalui mataku. Mungkin dengan begitu, kamu akan mengerti betapa indahnya keberadaanmu.',
    'PLEASE REMEMBER': 'INGATLAH INI', 'A SMALL REMINDER, WHENEVER YOU NEED IT': 'PESAN KECIL, KAPAN PUN KAMU MEMBUTUHKANNYA',
    'Ten little things': 'Sepuluh hal kecil', 'to keep close.': 'yang selalu diingat.',
    'SEBELUMNYA': 'SEBELUMNYA', 'BERIKUTNYA': 'BERIKUTNYA',
    'WISHES FOR YOU': 'HARAPANKU UNTUKMU', 'THINGS I HOPE LIFE BRINGS YOU': 'HAL BAIK YANG KUHARAP HADIR DALAM HIDUPMU',
    'A few wishes,': 'Beberapa harapan,', 'from my heart.': 'dari hatiku.',
    'MY PROMISES': 'JANJIKU', 'THINGS I WILL KEEP LEARNING': 'HAL-HAL YANG AKAN TERUS KUPERBAIKI',
    'Promises I want': 'Janji yang ingin', 'to keep.': 'kutepati.',
    'A LITTLE NOTE FROM THE CATS': 'PESAN KECIL DARI PARA KUCING', 'A TINY PAUSE FOR A SOFTER DAY': 'JEDA KECIL UNTUK HARI YANG LEBIH TENANG',
    'LITTLE CAT MESSAGES': 'PESAN KECIL DARI KUCING', 'A Little Note': 'Pesan Kecil', 'from the Cats': 'dari Para Kucing',
    'Sending you a tiny meow and a warm hug.': 'Kukirimkan sapaan kecil dan pelukan hangat untukmu.',
    'Meow! Satu permainan kecil untuk Ika. ♡': 'Meong! Satu permainan kecil untuk Ika. ♡',
    'Purr... pesan kecilnya sudah sampai. ♡': 'Meong... pesan kecilnya sudah sampai. ♡',
    'If today feels cloudy, I hope tomorrow brings a little sunshine.': 'Jika hari ini terasa mendung, semoga besok membawa sedikit sinar matahari.',
    'One soft meow for my favorite girl. ♡': 'Satu meong lembut untuk perempuan kesukaanku. ♡',
    'UNTIL THE NEXT PAGE': 'SAMPAI HALAMAN BERIKUTNYA', 'THE LAST PAGE, FOR NOW': 'HALAMAN TERAKHIR, UNTUK SAAT INI',
    'FINAL LETTER': 'SURAT TERAKHIR', 'Until the': 'Sampai di', 'Next Page': 'Halaman Berikutnya',
    'THE LAST PAGE': 'HALAMAN TERAKHIR', 'FOR IKA · ZAZA': 'UNTUK IKA · ZAZA',
    'And wherever life takes you, I hope you never forget this little universe was made with a lot of affection, just for you.': 'Ke mana pun hidup membawamu, semoga kamu tak pernah lupa bahwa semesta kecil ini dibuat dengan penuh kasih, khusus untukmu.',
    'With love,': 'Dengan cinta,', 'And this is not the end of your story.': 'Dan ini bukan akhir dari ceritamu.',
    'There are still so many beautiful things waiting for you, Ika.': 'Masih banyak hal indah yang menantimu, Ika.',
    'With love, Zaza': 'Dengan cinta, Zaza', 'made with affection by Zaza': 'dibuat dengan penuh kasih oleh Zaza',
    'Our Little Beginning': 'Awal Kecil Kita', 'A Letter for Ika': 'Surat untuk Ika',
    'Things I Love About You': 'Hal yang Kusukai Darimu', 'A Few Words for You': 'Beberapa Kata untukmu',
    'Somewhere Between the Stars': 'Di Antara Bintang', 'Please Remember': 'Ingatlah Ini',
    'Wishes for You': 'Harapanku untukmu', 'My Promises': 'Janjiku', 'A Little Note from the Cats': 'Pesan Kecil dari Para Kucing',
    'Until the Next Page': 'Sampai Halaman Berikutnya',
  };

  const setLanguage = (language) => {
    currentLanguage = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const trimmed = source.trim();
      if (!trimmed) continue;
      const translated = language === 'id' ? translations[trimmed] : null;
      const leading = source.match(/^\s*/u)?.[0] ?? '';
      const trailing = source.match(/\s*$/u)?.[0] ?? '';
      node.nodeValue = `${leading}${translated ?? trimmed}${trailing}`;
    }
    document.querySelectorAll('[data-copy-en][data-copy-id]').forEach((element) => {
      element.textContent = language === 'id' ? element.dataset.copyId : element.dataset.copyEn;
    });
    root.dataset.language = language;
    document.title = language === 'id' ? "Semesta Kecil Ika — Dari Zaza untuk Ika" : defaultTitle;
    if (progressTrack) progressTrack.setAttribute('aria-label', language === 'id' ? 'Progres animasi pembukaan' : 'Opening sequence progress');
    if (progressLabel) progressLabel.textContent = language === 'id' ? 'menyiapkan dunia kecilmu' : 'preparing your little world';
    languageButtons.forEach((button) => {
      const translated = language === 'id';
      button.setAttribute('aria-pressed', String(translated));
      button.setAttribute('aria-label', translated ? 'Tampilkan kembali teks bahasa Inggris' : 'Terjemahkan teks bahasa Inggris ke Bahasa Indonesia');
      button.querySelector('.language-toggle-code').textContent = translated ? 'EN' : 'ID';
      button.querySelector('.language-toggle-label').textContent = translated ? 'Teks asli' : 'Terjemahkan';
    });
  };

  languageButtons.forEach((button) => button.addEventListener('click', () => {
    setLanguage(currentLanguage === 'id' ? 'mixed' : 'id');
  }));

  const setDynamicCopy = (element, english, indonesian) => {
    if (!english) {
      delete element.dataset.copyEn;
      delete element.dataset.copyId;
      element.textContent = '';
      return;
    }
    element.dataset.copyEn = english;
    element.dataset.copyId = indonesian;
    element.textContent = currentLanguage === 'id' ? indonesian : english;
  };

  site.inert = true;
  site.setAttribute('aria-hidden', 'true');

  let journeyComplete = false;
  let assetsComplete = false;
  let finishing = false;
  let journeyStart = performance.now();

  const setProgress = (value) => {
    const percent = Math.max(0, Math.min(100, Math.round(value)));
    progressFill.style.width = `${percent}%`;
    progressNumber.textContent = `${percent}%`;
    progressTrack.setAttribute('aria-valuenow', String(percent));
  };

  const loadingAnimation = typeof clock.getAnimations === 'function' ? clock.getAnimations()[0] : null;
  if (loadingAnimation && Number.isFinite(loadingAnimation.currentTime)) {
    journeyStart -= Number(loadingAnimation.currentTime);
  }

  const updateJourneyProgress = (now) => {
    if (finishing) return;
    const percent = Math.min(92, ((now - journeyStart) / journeyDuration) * 92);
    setProgress(percent);
    if (percent < 92 && !finishing) requestAnimationFrame(updateJourneyProgress);
  };
  requestAnimationFrame(updateJourneyProgress);

  const windowLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
  const fontsReady = document.fonts?.ready ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
  const imagesReady = Promise.all(Array.from(document.images).map((image) => {
    if (image.complete) return Promise.resolve();
    if (typeof image.decode === 'function') return image.decode().catch(() => undefined);
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }));

  const revealWelcomeWhenReady = async () => {
    if (!journeyComplete || !assetsComplete || finishing) return;
    finishing = true;
    setProgress(100);
    progressLabel.textContent = currentLanguage === 'id' ? 'Semesta kecilmu sudah siap.' : 'Your little universe is ready.';
    loader.classList.add('is-ready');
    const fade = loader.animate(
      [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(5px)' }],
      { duration: reduceMotion ? 0 : 650, easing: 'cubic-bezier(.22,.75,.2,1)', fill: 'forwards' },
    );
    try { await fade.finished; } catch { /* The reader may leave during the transition. */ }
    loader.remove();
    welcome.inert = false;
    welcome.setAttribute('aria-hidden', 'false');
    welcome.classList.add('is-visible');
    requestAnimationFrame(() => enterButton.focus({ preventScroll: true }));
  };

  const onJourneyEnd = (event) => {
    if (event.animationName !== 'loader-clock') return;
    journeyComplete = true;
    revealWelcomeWhenReady();
  };
  clock.addEventListener('animationend', onJourneyEnd);
  window.setTimeout(() => {
    if (journeyComplete) return;
    journeyComplete = true;
    revealWelcomeWhenReady();
  }, journeyDuration + 180);
  if (loadingAnimation?.playState === 'finished') journeyComplete = true;

  Promise.all([windowLoaded, fontsReady, imagesReady]).then(() => {
    assetsComplete = true;
    revealWelcomeWhenReady();
  });
  if (journeyComplete) revealWelcomeWhenReady();

  const welcomeCat = document.getElementById('welcome-cat');
  const welcomeCatResponse = document.getElementById('welcome-cat-response');

  enterButton.addEventListener('click', async () => {
    enterButton.disabled = true;
    welcomeCat.classList.add('is-running');
    site.inert = false;
    site.setAttribute('aria-hidden', 'false');
    site.classList.add('is-entered');
    const fade = welcome.animate(
      [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(5px)' }],
      { duration: reduceMotion ? 0 : 660, easing: 'cubic-bezier(.22,.75,.2,1)', fill: 'forwards' },
    );
    try { await fade.finished; } catch { /* The reader may navigate away mid-transition. */ }
    welcome.inert = true;
    welcome.setAttribute('aria-hidden', 'true');
    welcome.remove();
    document.getElementById('home').scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  welcomeCat.addEventListener('click', () => {
    welcomeCat.classList.remove('is-winking');
    void welcomeCat.offsetWidth;
    welcomeCat.classList.add('is-winking');
    setDynamicCopy(welcomeCatResponse, 'Meow! I am here to welcome Ika, too. ♡', 'Meong! Aku juga ikut menyambut Ika. ♡');
    welcomeCatResponse.classList.add('is-visible');
  });

  const revealSections = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.07 });
    revealSections.forEach((section) => revealObserver.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add('is-in-view'));
  }

  const openCards = Array.from(document.querySelectorAll('.open-card'));
  openCards.forEach((card) => card.addEventListener('toggle', () => {
    if (!card.open) return;
    openCards.forEach((otherCard) => {
      if (otherCard !== card) otherCard.open = false;
    });
  }));

  const reminders = [
    'Jangan lupa makan, bahkan ketika sedang sibuk.',
    'Kalau lelah, istirahatlah. Kamu tidak harus memaksakan semuanya.',
    'Jangan mengukur nilai dirimu dari pendapat semua orang.',
    'Kamu boleh berkata tidak pada hal yang membuatmu tidak nyaman.',
    'Jangan takut meminta bantuan ketika memang membutuhkannya.',
    'Tetap jaga kesehatan, tidur yang cukup, dan beri waktu untuk dirimu sendiri.',
    'Jangan membandingkan prosesmu dengan perjalanan orang lain.',
    'Kamu boleh berubah pikiran dan belajar dari kesalahan.',
    'Tetap punya waktu untuk hal-hal yang kamu sukai.',
    'Apa pun yang sedang kamu hadapi, jangan lupa bahwa kamu juga pantas diperlakukan dengan baik.',
  ];
  const reminderMessage = document.getElementById('reminder-message');
  const reminderCurrent = document.getElementById('reminder-current');
  const reminderPrevious = document.getElementById('reminder-prev');
  const reminderNext = document.getElementById('reminder-next');
  const reminderDots = document.getElementById('reader-dots');
  let activeReminder = 0;
  const dots = reminders.map((_, index) => {
    const dot = document.createElement('span');
    dot.className = `reader-dot${index === 0 ? ' is-active' : ''}`;
    reminderDots.append(dot);
    return dot;
  });
  const showReminder = (nextIndex) => {
    activeReminder = Math.max(0, Math.min(reminders.length - 1, nextIndex));
    reminderMessage.classList.add('is-changing');
    requestAnimationFrame(() => {
      reminderMessage.textContent = reminders[activeReminder];
      reminderCurrent.textContent = String(activeReminder + 1).padStart(2, '0');
      reminderPrevious.disabled = activeReminder === 0;
      reminderNext.disabled = activeReminder === reminders.length - 1;
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeReminder));
      reminderMessage.classList.remove('is-changing');
    });
  };
  reminderPrevious.addEventListener('click', () => showReminder(activeReminder - 1));
  reminderNext.addEventListener('click', () => showReminder(activeReminder + 1));

  const starButton = document.getElementById('starlight-button');
  const starBurst = starButton.querySelector('.starlight-burst');
  starButton.addEventListener('click', () => {
    const isLit = starButton.getAttribute('aria-pressed') !== 'true';
    starButton.setAttribute('aria-pressed', String(isLit));
    if (isLit) {
      starBurst.getAnimations().forEach((animation) => animation.cancel());
      starBurst.animate(
        [{ opacity: .9, transform: 'scale(.55)' }, { opacity: 0, transform: 'scale(2.1)' }],
        { duration: reduceMotion ? 0 : 760, easing: 'ease-out' },
      );
    }
  });

  const catPlayButton = document.getElementById('cat-play-button');
  const catReaction = document.getElementById('cat-reaction');
  catPlayButton.addEventListener('click', () => {
    catPlayButton.classList.remove('is-playing');
    void catPlayButton.offsetWidth;
    catPlayButton.classList.add('is-playing');
    setDynamicCopy(catReaction, 'Meow! A little game for Ika. ♡', 'Meong! Satu permainan kecil untuk Ika. ♡');
    catReaction.classList.add('is-visible');
  });

  document.querySelectorAll('.cat-bubble').forEach((bubble) => {
    bubble.addEventListener('click', () => {
      const isSelected = bubble.getAttribute('aria-pressed') !== 'true';
      document.querySelectorAll('.cat-bubble').forEach((other) => other.setAttribute('aria-pressed', 'false'));
      bubble.setAttribute('aria-pressed', String(isSelected));
      catPlayButton.classList.remove('is-playing');
      void catPlayButton.offsetWidth;
      catPlayButton.classList.add('is-playing');
      if (isSelected) setDynamicCopy(catReaction, 'Purr... your little message has arrived. ♡', 'Meong... pesan kecilnya sudah sampai. ♡');
      else setDynamicCopy(catReaction, '', '');
      catReaction.classList.toggle('is-visible', isSelected);
    });
  });

  const contentsMenu = document.querySelector('.contents-menu');
  contentsMenu.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
    contentsMenu.open = false;
  }));

  const quickLinks = Array.from(document.querySelectorAll('.quick-nav a'));
  const observedSections = quickLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentHash = `#${entry.target.id}`;
        quickLinks.forEach((link) => {
          if (link.getAttribute('href') === currentHash) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }
})();
