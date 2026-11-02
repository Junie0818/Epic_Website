/**
 * Epic SJSU Campus Ministry — Core Application Engine
 * High Performance, Semantic State Management
 * Strict: Zero Emojis, Pure SVG Vectors
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAuth();
  initLifeGroupFilters();
  initCalendarFilters();
  initFlyerStudio();
  initContactForm();
});

/* ==========================================================================
   1. Navigation & Tab Routing System
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo, [data-target-tab]');
  const pages = document.querySelectorAll('.tab-page');

  function switchTab(tabId) {
    if (!tabId) tabId = 'welcome';
    tabId = tabId.replace('#', '');

    const targetPage = document.getElementById(tabId);
    if (!targetPage) return;

    pages.forEach(page => page.classList.remove('active'));
    targetPage.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-tab') === tabId);
    });

    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.getAttribute('data-tab') || link.getAttribute('data-target-tab') || 'welcome';
      switchTab(tab);
    });
  });

  // Handle URL hash on load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    switchTab(initialHash);
  } else {
    switchTab('welcome');
  }

  // Header scroll shadow effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Authentication & Student Leader State
   ========================================================================== */
function initAuth() {
  const modal = document.getElementById('loginModal');
  const btnOpenModal = document.getElementById('btnOpenSignIn');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const loginForm = document.getElementById('loginForm');
  const btnDemoLogin = document.getElementById('btnDemoLogin');
  const btnSignOut = document.getElementById('btnSignOut');

  const signInBtnContainer = document.getElementById('signInActionWrapper');
  const userBadgeContainer = document.getElementById('userBadgeContainer');
  const lockedStudio = document.getElementById('flyerStudioLocked');
  const activeStudio = document.getElementById('flyerStudioActive');
  const btnUnlockStudio = document.getElementById('btnUnlockStudio');

  function updateAuthState(user) {
    if (user) {
      if (signInBtnContainer) signInBtnContainer.style.display = 'none';
      if (userBadgeContainer) userBadgeContainer.classList.add('logged-in');
      if (lockedStudio) lockedStudio.classList.add('hidden');
      if (activeStudio) activeStudio.classList.add('visible');
    } else {
      if (signInBtnContainer) signInBtnContainer.style.display = 'block';
      if (userBadgeContainer) userBadgeContainer.classList.remove('logged-in');
      if (lockedStudio) lockedStudio.classList.remove('hidden');
      if (activeStudio) activeStudio.classList.remove('visible');
    }
  }

  // Check saved state
  const currentUser = localStorage.getItem('epic_sjsu_user');
  updateAuthState(currentUser ? JSON.parse(currentUser) : null);

  function openModal() {
    if (modal) modal.classList.add('open');
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
  }

  if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
  if (btnUnlockStudio) btnUnlockStudio.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function loginAsLeader(email, name) {
    const userData = {
      name: name || 'Student Leader',
      email: email || 'leader@sjsu.edu',
      role: 'Core Team Leader'
    };
    localStorage.setItem('epic_sjsu_user', JSON.stringify(userData));
    updateAuthState(userData);
    closeModal();
  }

  if (btnDemoLogin) {
    btnDemoLogin.addEventListener('click', () => {
      loginAsLeader('leader@sjsu.edu', 'Marcus Chen');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      loginAsLeader(email, 'Marcus Chen');
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener('click', () => {
      localStorage.removeItem('epic_sjsu_user');
      updateAuthState(null);
    });
  }
}

/* ==========================================================================
   3. Community & Life Group Filters
   ========================================================================== */
function initLifeGroupFilters() {
  const filterButtons = document.querySelectorAll('.lifegroup-filter-btn');
  const cards = document.querySelectorAll('.lifegroup-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Events Calendar Category Filtering & RSVP
   ========================================================================== */
function initCalendarFilters() {
  const chips = document.querySelectorAll('.cal-chip');
  const eventRows = document.querySelectorAll('.event-row-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const category = chip.getAttribute('data-category');
      eventRows.forEach(row => {
        if (category === 'all' || row.getAttribute('data-category') === category) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // RSVP toggle buttons
  const rsvpButtons = document.querySelectorAll('.btn-rsvp');
  rsvpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRsvpd = btn.getAttribute('data-rsvpd') === 'true';
      const countEl = btn.querySelector('.rsvp-count');
      let count = parseInt(countEl.textContent, 10);

      if (isRsvpd) {
        btn.setAttribute('data-rsvpd', 'false');
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        countEl.textContent = count - 1;
        btn.querySelector('.rsvp-status').textContent = 'RSVP';
      } else {
        btn.setAttribute('data-rsvpd', 'true');
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        countEl.textContent = count + 1;
        btn.querySelector('.rsvp-status').textContent = 'Confirmed';
      }
    });
  });
}

/* ==========================================================================
   5. Canva-Style Flyer Creator Studio
   ========================================================================== */
function initFlyerStudio() {
  const templates = {
    large_group: {
      title: 'Epic Large Group',
      subtitle: 'Finding Purpose in College',
      date: 'Thursday, Nov 12',
      time: '7:00 PM - 8:45 PM',
      location: 'SJSU Student Union, Rm 2A',
      contact: 'Instagram: @epicsjsu',
      theme: 'theme-classic',
      bgImg: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
    },
    boba_social: {
      title: 'Boba & Board Games',
      subtitle: 'Free Milk Tea & Community Hangout',
      date: 'Friday, Nov 20',
      time: '6:30 PM - 9:00 PM',
      location: 'MLK Library 2nd Floor Patio',
      contact: 'All Majors & Years Welcome',
      theme: 'theme-gold',
      bgImg: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80'
    },
    freshman_welcome: {
      title: 'Freshman Night',
      subtitle: 'Free Pizza, New Friends, Campus Tips',
      date: 'Tuesday, Nov 17',
      time: '5:30 PM - 7:30 PM',
      location: 'Tower Lawn (Near Arch)',
      contact: 'Rides provided from CV dorms',
      theme: 'theme-classic',
      bgImg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    },
    fall_retreat: {
      title: 'Fall Camp Retreat',
      subtitle: '3 Days in the Redwood Mountains',
      date: 'Nov 27 - Nov 29',
      time: 'Departing SJSU 4:00 PM',
      location: 'Santa Cruz Mountains',
      contact: 'Register at epicsjsu.org/retreat',
      theme: 'theme-slate',
      bgImg: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'
    }
  };

  const canvasEl = document.getElementById('liveFlyerCanvas');
  const titleInput = document.getElementById('flyerInputTitle');
  const subtitleInput = document.getElementById('flyerInputSubtitle');
  const dateInput = document.getElementById('flyerInputDate');
  const timeInput = document.getElementById('flyerInputTime');
  const locationInput = document.getElementById('flyerInputLocation');
  const contactInput = document.getElementById('flyerInputContact');
  const themeSelect = document.getElementById('flyerSelectTheme');
  const templateSelect = document.getElementById('flyerSelectTemplate');

  const displayTitle = document.getElementById('flyerDisplayTitle');
  const displaySubtitle = document.getElementById('flyerDisplaySubtitle');
  const displayDate = document.getElementById('flyerDisplayDate');
  const displayTime = document.getElementById('flyerDisplayTime');
  const displayLocation = document.getElementById('flyerDisplayLocation');
  const displayContact = document.getElementById('flyerDisplayContact');

  function renderFlyer() {
    if (!canvasEl) return;
    if (displayTitle) displayTitle.textContent = titleInput.value;
    if (displaySubtitle) displaySubtitle.textContent = subtitleInput.value;
    if (displayDate) displayDate.textContent = dateInput.value;
    if (displayTime) displayTime.textContent = timeInput.value;
    if (displayLocation) displayLocation.textContent = locationInput.value;
    if (displayContact) displayContact.textContent = contactInput.value;

    canvasEl.className = 'flyer-canvas ' + themeSelect.value;
  }

  // Template select listener
  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      const t = templates[e.target.value];
      if (!t) return;
      titleInput.value = t.title;
      subtitleInput.value = t.subtitle;
      dateInput.value = t.date;
      timeInput.value = t.time;
      locationInput.value = t.location;
      contactInput.value = t.contact;
      themeSelect.value = t.theme;
      canvasEl.style.backgroundImage = `url('${t.bgImg}')`;
      renderFlyer();
    });
  }

  // Live input bindings
  [titleInput, subtitleInput, dateInput, timeInput, locationInput, contactInput, themeSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', renderFlyer);
      input.addEventListener('change', renderFlyer);
    }
  });

  // Print flyer trigger
  const btnPrint = document.getElementById('btnPrintFlyer');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Download flyer as PNG
  const btnDownload = document.getElementById('btnDownloadFlyer');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      downloadFlyerCanvas();
    });
  }

  function downloadFlyerCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');

    // Background fill
    ctx.fillStyle = themeSelect.value === 'theme-gold' ? '#1c1503' : (themeSelect.value === 'theme-slate' ? '#0f172a' : '#0b1b3d');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Gold Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 16;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Header Tag
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SAN JOSÉ STATE UNIVERSITY  |  EPIC MINISTRY', canvas.width / 2, 160);

    // Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 84px "Playfair Display", Georgia, serif';
    ctx.fillText(titleInput.value, canvas.width / 2, 320);

    // Subtitle
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitleInput.value, canvas.width / 2, 420);

    // Content Card Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(140, 540, canvas.width - 280, 580);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.strokeRect(140, 540, canvas.width - 280, 580);

    // Details Text
    ctx.textAlign = 'left';
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';

    const leftX = 220;
    ctx.fillText('DATE:', leftX, 640);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(dateInput.value, leftX + 160, 640);

    ctx.fillStyle = '#d4af37';
    ctx.fillText('TIME:', leftX, 760);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(timeInput.value, leftX + 160, 760);

    ctx.fillStyle = '#d4af37';
    ctx.fillText('PLACE:', leftX, 880);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(locationInput.value, leftX + 160, 880);

    ctx.fillStyle = '#d4af37';
    ctx.fillText('INFO:', leftX, 1000);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(contactInput.value, leftX + 160, 1000);

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ALL SJSU STUDENTS WELCOME', canvas.width / 2, 1340);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Connect on Instagram: @epicsjsu  •  epicsjsu.org', canvas.width / 2, 1420);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Epic_SJSU_Flyer_${titleInput.value.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

/* ==========================================================================
   6. Contact Form Intake
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('connectIntakeForm');
  const alertBox = document.getElementById('connectSuccessMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Connecting...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Info & Get Connected';
        if (alertBox) {
          alertBox.style.display = 'block';
          setTimeout(() => {
            alertBox.style.display = 'none';
          }, 6000);
        }
      }, 700);
    });
  }
}
