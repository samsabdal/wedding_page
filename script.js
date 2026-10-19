/**
 * ROYAL ISLAMIC WEDDING INVITATION — JAVASCRIPT ENGINE
 * Groom: MD Karimullah | Bride: Hina Quadri
 * Date: 28th October 2026 | Timezone: Asia/Kolkata (IST)
 */

(function () {
  'use strict';

  /* ==========================================================================
     0. CANONICAL PUBLIC INVITATION URL (CLOUDFLARE PAGES PRODUCTION)
     ========================================================================== */
  const PUBLIC_SITE_URL = 'https://wedding-page-1xp.pages.dev/';

  /* ==========================================================================
     1. VENUE CONFIGURATION & CONSTANTS (MANDATORY EXACT LINKS)
     ========================================================================== */
  const VENUES = {
    marriage: {
      name: 'Royal Palace Mandap',
      city: 'Bhadrak, Odisha',
      locationUrl: 'https://maps.app.goo.gl/vZppiagNp6Ta55o1A',
      directionsUrl: 'https://maps.app.goo.gl/vZppiagNp6Ta55o1A',
      coords: '21.050037, 86.523113',
      address: 'Royal Palace Mandap, Bhadrak, Odisha, India',
    },
    reception: {
      name: 'Topiwale Baba Mandap',
      city: 'Dhamnagar, Bhadrak, Odisha',
      locationUrl: 'https://maps.app.goo.gl/XXBM2FHdq89V7njF8',
      directionsUrl: 'https://maps.app.goo.gl/XXBM2FHdq89V7njF8',
      coords: '20.919323, 86.438584',
      address: 'Topiwale Baba Mandap, Dhamnagar, Bhadrak, Odisha, India',
    },
  };

  // Wire up venue buttons to guaranteed directions destinations
  function setupVenueButtons() {
    const marriageDirBtn = document.getElementById('marriageDirBtn');
    const marriageTimelineDirBtn = document.getElementById('marriageTimelineDirBtn');
    const receptionDirBtn = document.getElementById('receptionDirBtn');
    const receptionTimelineDirBtn = document.getElementById('receptionTimelineDirBtn');

    if (marriageDirBtn) {
      marriageDirBtn.href = VENUES.marriage.directionsUrl;
      marriageDirBtn.target = '_blank';
      marriageDirBtn.rel = 'noopener noreferrer';
    }
    if (marriageTimelineDirBtn) {
      marriageTimelineDirBtn.href = VENUES.marriage.directionsUrl;
      marriageTimelineDirBtn.target = '_blank';
      marriageTimelineDirBtn.rel = 'noopener noreferrer';
    }
    if (receptionDirBtn) {
      receptionDirBtn.href = VENUES.reception.directionsUrl;
      receptionDirBtn.target = '_blank';
      receptionDirBtn.rel = 'noopener noreferrer';
    }
    if (receptionTimelineDirBtn) {
      receptionTimelineDirBtn.href = VENUES.reception.directionsUrl;
      receptionTimelineDirBtn.target = '_blank';
      receptionTimelineDirBtn.rel = 'noopener noreferrer';
    }
  }


  /* ==========================================================================
     2. ACCURATE COUNTDOWN TIMER (Asia/Kolkata: Oct 28, 2026, 05:00 AM IST)
     ========================================================================== */
  // 05:00 AM IST (UTC+5:30) on 28th October 2026 is 23:30 UTC on 27th October 2026
  const WEDDING_TIMESTAMP = Date.UTC(2026, 9, 27, 23, 30, 0);

  function pad(num) {
    return num < 10 ? '0' + num : String(num);
  }

  function initCountdown() {
    const elDays = document.getElementById('countdownDays');
    const elHours = document.getElementById('countdownHours');
    const elMins = document.getElementById('countdownMins');
    const elSecs = document.getElementById('countdownSecs');
    const countdownWrap = document.getElementById('countdownWrap');
    const countdownMessage = document.getElementById('countdownMessage');

    if (!elDays || !elHours || !elMins || !elSecs) return;

    function updateTimer() {
      const now = Date.now();
      const distance = WEDDING_TIMESTAMP - now;

      if (distance <= 0) {
        // Event has arrived or concluded — show celebratory banner without negative values
        if (countdownWrap) countdownWrap.style.display = 'none';
        if (countdownMessage) {
          countdownMessage.style.display = 'block';
          countdownMessage.innerHTML = `
            <div class="countdown-completed-banner">
              <span class="arabic-dua block text-xl mb-1">بَارَكَ ٱللَّٰهُ لَكُمَا</span>
              <p class="font-serif text-lg font-bold text-gold-champagne">The Blessed Wedding Celebrations are Underway!</p>
              <p class="text-xs text-ivory-dim mt-1">May Allah bless MD Karimullah & Hina Quadri with infinite bliss and harmony.</p>
            </div>
          `;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      elDays.textContent = pad(days);
      elHours.textContent = pad(hours);
      elMins.textContent = pad(mins);
      elSecs.textContent = pad(secs);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ==========================================================================
     3. CALENDAR ACTIONS (.ICS DOWNLOAD & GOOGLE CALENDAR)
     ========================================================================== */
  function setupCalendarActions() {
    const googleCalBtn = document.getElementById('googleCalLink');
    const downloadIcsBtn = document.getElementById('downloadIcsBtn');
    const modalCalBtn = document.getElementById('openCalModalBtn');
    const dockCalBtn = document.getElementById('dockCalBtn');
    const calModal = document.getElementById('calendarModal');
    const calModalClose = document.getElementById('calendarModalClose');

    // Google Calendar URL
    const gCalParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Wedding of MD Karimullah & Hina Quadri',
      dates: '20261028T050000/20261028T220000',
      ctz: 'Asia/Kolkata',
      details:
        'Nikah-e-Masnoon: 05:00 AM | Dawat-e-Walima Lunch: 12:00 PM | Rukhsati: 05:00 PM\nVenue: Royal Palace Mandap, Bhadrak, Odisha, India\n\nInvitation: ' +
        PUBLIC_SITE_URL,
      location: 'Royal Palace Mandap, Bhadrak, Odisha, India',
    });
    const gCalUrl = 'https://calendar.google.com/calendar/render?' + gCalParams.toString();

    if (googleCalBtn) {
      googleCalBtn.href = gCalUrl;
    }

    // Modal handlers
    function openCalModal(e) {
      if (e) e.preventDefault();
      if (calModal) calModal.classList.add('active');
    }

    function closeCalModal() {
      if (calModal) calModal.classList.remove('active');
    }

    if (modalCalBtn) modalCalBtn.addEventListener('click', openCalModal);
    if (dockCalBtn) dockCalBtn.addEventListener('click', openCalModal);
    if (calModalClose) calModalClose.addEventListener('click', closeCalModal);

    if (calModal) {
      calModal.addEventListener('click', function (e) {
        if (e.target === calModal) closeCalModal();
      });
    }

    // .ICS file generator and download
    if (downloadIcsBtn) {
      downloadIcsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const icsContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//MD Karimullah & Hina Quadri//Wedding Invitation//EN',
          'CALSCALE:GREGORIAN',
          'METHOD:PUBLISH',
          'BEGIN:VTIMEZONE',
          'TZID:Asia/Kolkata',
          'BEGIN:STANDARD',
          'DTSTART:19700101T000000',
          'TZOFFSETFROM:+0530',
          'TZOFFSETTO:+0530',
          'TZNAME:IST',
          'END:STANDARD',
          'END:VTIMEZONE',
          'BEGIN:VEVENT',
          'UID:wedding-karimullah-hina-20261028@islamicwedding.invitation',
          'DTSTAMP:20261019T000000Z',
          'DTSTART;TZID=Asia/Kolkata:20261028T050000',
          'DTEND;TZID=Asia/Kolkata:20261028T220000',
          'SUMMARY:Wedding Ceremony — MD Karimullah & Hina Quadri',
          'DESCRIPTION:Insha Allah\\, you are cordially invited to celebrate the auspicious Nikah of MD Karimullah and Hina Quadri.\\n\\nProgramme:\\n- Nikah-e-Masnoon: 05:00 AM\\n- Dawat-e-Walima / Lunch: 12:00 PM\\n- Rukhsati: 05:00 PM\\n\\nInvitation Website: ' +
            PUBLIC_SITE_URL,
          'URL:' + PUBLIC_SITE_URL,
          'LOCATION:Royal Palace Mandap\\, Bhadrak\\, Odisha\\, India',
          'STATUS:CONFIRMED',
          'SEQUENCE:0',
          'BEGIN:VALARM',
          'TRIGGER:-P1D',
          'ACTION:DISPLAY',
          'DESCRIPTION:Reminder: Wedding of MD Karimullah & Hina Quadri tomorrow',
          'END:VALARM',
          'END:VEVENT',
          'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'MD_Karimullah_Hina_Quadri_Wedding.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showToast('Wedding calendar invite (.ics) downloaded!');
        closeCalModal();
      });
    }
  }

  /* ==========================================================================
     4. SHARE INVITATION (WEB SHARE API, WHATSAPP & CLIPBOARD COPY)
     ========================================================================== */
  function setupShareActions() {
    const shareBtn = document.getElementById('shareInvitationBtn');
    const navShareBtn = document.getElementById('navShareBtn');
    const drawerShareBtn = document.getElementById('drawerShareBtn');
    const copyLinkBtn = document.getElementById('copyInvitationLinkBtn');

    const sharePayload = {
      title: 'MD Karimullah & Hina Quadri | Wedding Invitation',
      text: 'You are warmly invited to celebrate the wedding of MD Karimullah & Hina Quadri.',
      url: PUBLIC_SITE_URL,
    };

    // Copy invitation link to clipboard with execCommand fallback
    function copyInvitationLink(showToastOnSuccess = true) {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard
          .writeText(PUBLIC_SITE_URL)
          .then(() => {
            if (showToastOnSuccess) showToast('Invitation link copied to clipboard!');
          })
          .catch(() => {
            fallbackExecCommandCopy(showToastOnSuccess);
          });
      } else {
        fallbackExecCommandCopy(showToastOnSuccess);
      }
    }

    function fallbackExecCommandCopy(showToastOnSuccess = true) {
      try {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = PUBLIC_SITE_URL;
        tempTextarea.style.position = 'fixed';
        tempTextarea.style.top = '-9999px';
        tempTextarea.style.left = '-9999px';
        tempTextarea.setAttribute('readonly', '');
        document.body.appendChild(tempTextarea);
        tempTextarea.focus();
        tempTextarea.select();
        tempTextarea.setSelectionRange(0, 99999);
        const successful = document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        if (successful) {
          if (showToastOnSuccess) showToast('Invitation link copied to clipboard!');
        } else {
          showToast('Could not copy link. URL: ' + PUBLIC_SITE_URL);
        }
      } catch (err) {
        showToast('Could not copy link. URL: ' + PUBLIC_SITE_URL);
      }
    }

    // WhatsApp Sharing Endpoint: https://api.whatsapp.com/send?text=
    function openWhatsAppShare() {
      const waText =
        'Assalamu Alaikum! You are cordially invited to celebrate the wedding of MD Karimullah & Hina Quadri on Wednesday, 28th October 2026. Insha\'Allah!\n\n' +
        'View Invitation & Details:\n' +
        PUBLIC_SITE_URL;
      const waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(waText);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    function handleShare(e) {
      if (e) e.preventDefault();

      if (navigator.share) {
        navigator
          .share(sharePayload)
          .then(() => {
            showToast('Thank you for sharing!');
          })
          .catch((err) => {
            // Gracefully ignore user cancellation
            if (err && (err.name === 'AbortError' || err.code === 20)) {
              return;
            }
            // For other failures, fall back to copying link
            copyInvitationLink(true);
          });
      } else {
        // Fallback for browsers without Web Share API: copy link to clipboard
        copyInvitationLink(true);
      }
    }

    if (shareBtn) shareBtn.addEventListener('click', handleShare);
    if (navShareBtn) navShareBtn.addEventListener('click', handleShare);
    if (drawerShareBtn) drawerShareBtn.addEventListener('click', handleShare);
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', function (e) {
        e.preventDefault();
        copyInvitationLink(true);
      });
    }
  }

  /* ==========================================================================
     5. MUSIC & AMBIENT SOUND (USER-INITIATED ONLY — STRICTLY NO AUTOPLAY)
     ========================================================================== */
  function setupAudioPlayer() {
    const audioEl = document.getElementById('bgAudio');
    const musicBtn = document.getElementById('dockMusicBtn');
    const navMusicBtn = document.getElementById('navMusicBtn');

    if (!audioEl || !musicBtn) return;

    let isPlaying = false;
    let audioCtx = null;
    let synthTimer = null;

    // Meditative soft eastern pentatonic chimes synthesizer for fallback
    function startAmbientSynth() {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) audioCtx = new AudioContextClass();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // Warm C major / meditative pentatonic
        function playChime() {
          if (!isPlaying) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const note = notes[Math.floor(Math.random() * notes.length)];

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.035, audioCtx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 4.0);

          synthTimer = setTimeout(playChime, 1600 + Math.random() * 2200);
        }
        playChime();
      } catch (err) {
        console.warn('Ambient synth unavailable:', err);
      }
    }

    function stopAmbientSynth() {
      if (synthTimer) clearTimeout(synthTimer);
      if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend();
      }
    }

    function setPlayingState(playing) {
      isPlaying = playing;
      if (playing) {
        musicBtn.classList.remove('paused');
        musicBtn.setAttribute('aria-label', 'Pause background music');
        if (navMusicBtn) navMusicBtn.classList.add('text-gold-light');
      } else {
        musicBtn.classList.add('paused');
        musicBtn.setAttribute('aria-label', 'Play background music');
        if (navMusicBtn) navMusicBtn.classList.remove('text-gold-light');
      }
    }

    function toggleAudio(e) {
      if (e) e.preventDefault();

      if (isPlaying) {
        audioEl.pause();
        stopAmbientSynth();
        setPlayingState(false);
        showToast('Music paused');
      } else {
        audioEl.volume = 0.35;
        const playPromise = audioEl.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlayingState(true);
              showToast('Playing background music ♪');
            })
            .catch(() => {
              // If external MP3 blocked or failed, seamlessly fall back to ambient synth
              setPlayingState(true);
              startAmbientSynth();
              showToast('Playing ambient melody ♪');
            });
        }
      }
    }

    musicBtn.addEventListener('click', toggleAudio);
    if (navMusicBtn) navMusicBtn.addEventListener('click', toggleAudio);
  }

  /* ==========================================================================
     6. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER WITH ROBUST FALLBACK)
     ========================================================================== */
  function setupScrollReveals() {
    const revealElements = document.querySelectorAll(
      '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up'
    );

    function checkReveals() {
      const triggerBottom = (window.innerHeight || document.documentElement.clientHeight) * 0.95;
      revealElements.forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top <= triggerBottom) {
          el.classList.add('is-revealed');
        }
      });
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers: show everything immediately
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -10px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Immediate check on initial page load
    checkReveals();
    window.addEventListener('scroll', throttle(checkReveals, 120), { passive: true });

    // Failsafe timer: ensures content is never trapped in opacity:0 if observers are suppressed
    setTimeout(() => {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }, 1200);
  }

  /* ==========================================================================
     7. INTERACTIVE CANVAS GOLD DUST PARTICLES (LIGHTWEIGHT & OPTIMIZED)
     ========================================================================== */
  function initGoldDustCanvas() {
    const canvas = document.getElementById('goldDustCanvas');
    if (!canvas) return;

    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      // Density: ~35-45 particles maximum for silky 60fps on mobile
      const count = Math.min(42, Math.floor((width * height) / 24000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.0 + 0.5,
          vx: (Math.random() - 0.5) * 0.25,
          vy: Math.random() * 0.2 + 0.08,
          alpha: Math.random() * 0.45 + 0.1,
          pulseSpeed: Math.random() * 0.012 + 0.005,
          pulseDirection: 1,
        });
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse alpha
        p.alpha += p.pulseSpeed * p.pulseDirection;
        if (p.alpha >= 0.65) p.pulseDirection = -1;
        if (p.alpha <= 0.08) p.pulseDirection = 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 211, 160, ${p.alpha})`;
        ctx.shadowColor = 'rgba(201, 163, 91, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', debounce(resize, 180));
    resize();
    render();
  }

  /* ==========================================================================
     8. NAVIGATION TRACKING & MOBILE DRAWER ENGINE
     ========================================================================== */
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.top-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
    const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

    // Active navigation scroll spy
    function highlightNav() {
      const scrollPos = window.scrollY + 140;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', throttle(highlightNav, 100));

    // Mobile Drawer Open / Close
    function openMobileDrawer() {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
      }
    }

    function closeMobileDrawer() {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

    // Close drawer when any section link is clicked
    mobileDrawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
        closeMobileDrawer();
      }
    });
  }

  /* ==========================================================================
     9. UTILITY FUNCTIONS (TOAST, DEBOUNCE, THROTTLE)
     ========================================================================== */
  let toastTimeout = null;
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function debounce(fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /* ==========================================================================
     10. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    setupVenueButtons();
    initCountdown();
    setupCalendarActions();
    setupShareActions();
    setupAudioPlayer();
    setupScrollReveals();
    initGoldDustCanvas();
    setupNavigation();
  });
})();
