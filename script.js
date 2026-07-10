(() => {
  'use strict';

  // ===== DOM REFS =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    loading: $('#screen-loading'),
    q1: $('#screen-q1'),
    q2: $('#screen-q2'),
    hello: $('#screen-hello'),
    letter: $('#screen-letter'),
    happy: $('#screen-happy'),
    couple: $('#screen-couple'),
    bouquet: $('#screen-bouquet'),
    bye: $('#screen-bye'),
    final: $('#screen-final'),
  };

  let currentScreen = 'loading';
  let isTransitioning = false;

  // ===== SCREEN TRANSITION =====
  function showScreen(screenId) {
    if (isTransitioning) return;
    isTransitioning = true;

    Object.keys(screens).forEach((key) => {
      const el = screens[key];
      if (key === screenId) {
        el.classList.remove('fade-out');
        el.classList.add('active');
      } else {
        el.classList.remove('active');
        el.classList.add('fade-out');
      }
    });

    currentScreen = screenId;
    setTimeout(() => {
      isTransitioning = false;
    }, 800);
  }

  // ===== CREATE FLOATING ELEMENTS =====
  function createPetals() {
    const container = $('#petals-container');
    if (!container) return;
    const colors = ['pink', 'white', 'red'];
    for (let i = 0; i < 25; i++) {
      const petal = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      petal.className = `petal ${color}`;
      petal.style.left = Math.random() * 100 + '%';
      petal.style.width = (12 + Math.random() * 14) + 'px';
      petal.style.height = (18 + Math.random() * 16) + 'px';
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = Math.random() * 10 + 's';
      petal.style.opacity = 0.3 + Math.random() * 0.5;
      container.appendChild(petal);
    }
  }

  function createFloatingHearts(containerId, count = 12) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'float-heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (14 + Math.random() * 16) + 'px';
      heart.style.animationDuration = (8 + Math.random() * 12) + 's';
      heart.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(heart);
    }
  }

  // ===== LOADING SCREEN =====
  function initLoading() {
    createPetals();
    createFloatingHearts('floating-hearts-container', 15);

    setTimeout(() => {
      showScreen('q1');
      setupQuestion1();
    }, 5000);
  }

  // ===== QUESTION 1 BUTTONS =====
  let okByeClickCount = 0;
  let q1Resolved = false;

  function setupQuestion1() {
    const btnSorry = $('.btn-sorry');
    const btnOkBye = $('.btn-okbye');

    if (!btnSorry || !btnOkBye) return;

    const continueToQ2 = () => {
      if (q1Resolved) return;
      q1Resolved = true;
      showScreen('q2');
      initQ2();
    };

    btnSorry.addEventListener('click', continueToQ2);

    const moveToRandom = (el) => {
      const maxX = window.innerWidth - el.offsetWidth - 40;
      const maxY = window.innerHeight - el.offsetHeight - 40;
      const x = Math.max(20, Math.min(maxX, Math.random() * maxX));
      const y = Math.max(20, Math.min(maxY, Math.random() * maxY));
      el.style.position = 'fixed';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.zIndex = '100';
      el.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    };

    const handleOkBye = () => {
      if (q1Resolved) return;
      okByeClickCount++;

      const parent = document.getElementById('q1-buttons');
      if (!parent) return;

      if (okByeClickCount <= 3) {
        moveToRandom(btnOkBye);
      } else {
        const sorryBtn = parent.querySelector('.btn-sorry');
        if (sorryBtn) {
          const sorryRect = sorryBtn.getBoundingClientRect();
          const okByeRect = btnOkBye.getBoundingClientRect();

          sorryBtn.style.position = 'fixed';
          sorryBtn.style.left = okByeRect.left + 'px';
          sorryBtn.style.top = okByeRect.top + 'px';
          sorryBtn.style.zIndex = '100';
          sorryBtn.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

          btnOkBye.style.left = sorryRect.left + 'px';
          btnOkBye.style.top = sorryRect.top + 'px';

          btnOkBye.textContent = '❤️ I\'m Very Sorry';
          btnOkBye.className = 'btn btn-primary btn-sorry';

          sorryBtn.textContent = '❤️ I\'m Very Sorry';

          btnOkBye.removeEventListener('click', handleOkBye);
          btnOkBye.addEventListener('click', continueToQ2);
          sorryBtn.addEventListener('click', continueToQ2);
        }
      }
    };

    btnOkBye.addEventListener('click', handleOkBye);
  }

  // ===== QUESTION 2 =====
  let q2Initialized = false;

  function initQ2() {
    if (q2Initialized) return;
    q2Initialized = true;

    const mainText = $('.q2-main-text');
    const altText = $('.q2-alt-text');
    const btnSorry2 = $('.btn-sorry2');
    const btnTease = $('.btn-tease');

    if (!btnSorry2 || !btnTease || !mainText || !altText) return;

    let teased = false;

    const goToHello = () => {
      showScreen('hello');
      initHello();
    };

    btnSorry2.addEventListener('click', goToHello);

    btnTease.addEventListener('click', () => {
      if (teased) return;
      teased = true;
      mainText.classList.add('hidden');
      altText.classList.remove('hidden');
      btnTease.textContent = '❤️ Sorry Baby';
      btnTease.className = 'btn btn-primary';
      btnTease.addEventListener('click', goToHello, { once: true });
    });
  }

  // ===== HELLO BACCHU =====
  let helloInitialized = false;

  function initHello() {
    if (helloInitialized) return;
    helloInitialized = true;

    createPetalsInContainer('.hello-petals', 20);

    setTimeout(() => {
      showScreen('letter');
      initLetter();
    }, 2500);
  }

  function createPetalsInContainer(selector, count) {
    const container = document.querySelector(selector);
    if (!container) return;
    const colors = ['pink', 'white', 'red'];
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      petal.className = `petal ${color}`;
      petal.style.left = Math.random() * 100 + '%';
      petal.style.width = (12 + Math.random() * 14) + 'px';
      petal.style.height = (18 + Math.random() * 16) + 'px';
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = Math.random() * 6 + 's';
      petal.style.opacity = 0.3 + Math.random() * 0.5;
      container.appendChild(petal);
    }
  }

  // ===== LOVE LETTER =====
  let letterInitialized = false;

  function initLetter() {
    if (letterInitialized) return;
    letterInitialized = true;

    const envelope = $('#envelope-wrapper');
    const letterContent = $('#letter-content');

    if (!envelope || !letterContent) return;

    envelope.addEventListener('click', () => {
      envelope.classList.add('opened');
      letterContent.classList.remove('hidden');

      setTimeout(() => {
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 800);
    });

    const cutieeBtn = $('#btn-cutiee');
    if (cutieeBtn) {
      cutieeBtn.addEventListener('click', () => {
        showScreen('happy');
        initHappyButtons();
      });
    }
  }

  // ===== HAPPY QUESTION =====
  function initHappyButtons() {
    const btnYes = $('.btn-happy-yes');
    const btnNo = $('.btn-happy-no');

    if (!btnYes || !btnNo) return;

    btnYes.addEventListener('click', () => {
      showScreen('couple');
      initCouple();
    });

    btnNo.addEventListener('click', () => {
      btnNo.textContent = '❤️ Yes Of Course';
      btnNo.className = 'btn btn-primary btn-bounce';
      btnNo.addEventListener('click', () => {
        showScreen('couple');
        initCouple();
      }, { once: true });
    });
  }

  // ===== COUPLE PAGE =====
  let coupleInitialized = false;

  function initCouple() {
    if (coupleInitialized) return;
    coupleInitialized = true;

    const teddyLeft = $('#teddy-left');
    const teddyRight = $('#teddy-right');

    if (!teddyLeft || !teddyRight) return;

    createFloatingHearts('couple-hearts', 10);

    setTimeout(() => {
      teddyLeft.classList.add('hug-left');
      teddyRight.classList.add('hug-right');

      setTimeout(() => {
        showScreen('bouquet');
        initBouquet();
      }, 3000);
    }, 1000);
  }

  // ===== BOUQUET PAGE =====
  let bouquetInitialized = false;

  function initBouquet() {
    if (bouquetInitialized) return;
    bouquetInitialized = true;

    const bouquetLove = $('#bouquet-love');

    if (!bouquetLove) return;

    // After 3 seconds, show "Love You Deepak"
    setTimeout(() => {
      bouquetLove.classList.remove('hidden');

      // Then go to bye after another 3 seconds
      setTimeout(() => {
        showScreen('bye');
        initBye();
      }, 3000);
    }, 3000);
  }

  // ===== BYE QUESTION =====
  let byeInitialized = false;

  function initBye() {
    if (byeInitialized) return;
    byeInitialized = true;

    const btnBye = $('.btn-bye-bye');
    const btnNo = $('.btn-bye-no');

    if (!btnBye || !btnNo) return;

    btnNo.addEventListener('click', () => {
      showScreen('final');
      initFinal();
    });

    btnBye.addEventListener('click', () => {
      btnBye.textContent = 'Ohh U Want To Go? Okay Byee 💔';
      btnBye.className = 'btn btn-primary bye-changed';
      setTimeout(() => {
        showScreen('final');
        initFinal();
      }, 1800);
    });
  }

  // ===== FINAL CELEBRATION =====
  let finalInitialized = false;

  function initFinal() {
    if (finalInitialized) return;
    finalInitialized = true;

    createFinalParticles();
    createConfetti();
    createSparkles();
    createFlowerBurst();
  }

  function createFinalParticles() {
    const container = $('#final-particles');
    if (!container) return;

    const emojis = ['❤️', '💕', '🌸', '🌷', '🌹', '✨', '💖', '💗'];

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.fontSize = (16 + Math.random() * 20) + 'px';
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      container.appendChild(particle);
    }
  }

  function createConfetti() {
    const container = $('#final-particles');
    if (!container) return;

    const colors = ['#ff6b9d', '#ffb6c1', '#ff6b6b', '#ffd700', '#ff69b4', '#fff'];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (6 + Math.random() * 8) + 'px';
      confetti.style.height = (6 + Math.random() * 8) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.animationDuration = (6 + Math.random() * 8) + 's';
      confetti.style.animationDelay = Math.random() * 8 + 's';
      container.appendChild(confetti);
    }
  }

  function createSparkles() {
    const container = $('#final-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 5 + 's';
      sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(sparkle);
    }
  }

  function createFlowerBurst() {
    const container = $('#final-particles');
    if (!container) return;

    const flowers = ['🌸', '🌷', '🌹', '💐', '🌺', '🌻', '🌼', '🌿'];

    for (let i = 0; i < 24; i++) {
      const burst = document.createElement('div');
      burst.className = 'flower-burst';
      burst.textContent = flowers[Math.floor(Math.random() * flowers.length)];

      const angle = (360 / 24) * i + Math.random() * 20;
      const distance = 30 + Math.random() * 50;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance;

      burst.style.setProperty('--tx', tx + 'vw');
      burst.style.setProperty('--ty', ty + 'vh');
      burst.style.fontSize = (20 + Math.random() * 24) + 'px';
      burst.style.animationDelay = (0.3 + Math.random() * 0.8) + 's';
      burst.style.animationDuration = (1.5 + Math.random() * 1) + 's';
      container.appendChild(burst);
    }
  }

  // ===== START =====
  document.addEventListener('DOMContentLoaded', () => {
    initLoading();
  });

})();
