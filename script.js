/**
 * HARISANKAR T - CYBERSECURITY PORTFOLIO JAVASCRIPT
 * Features:
 * 1. Neon Lightbox Modal (Click-to-Enlarge for Profile & Certificates)
 * 2. Theme Switcher (Dark / Light Mode)
 * 3. Mobile Navigation & Drawer Toggle
 * 4. Active Nav Link on Scroll (Intersection Observer)
 * 5. About Me "Read More" Toggle
 * 6. Smooth Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. NEON LIGHTBOX MODAL (Click-to-Enlarge)
  // =========================================================================
  const modal = document.getElementById('neon-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openNeonModal({ img, title, badge, date, desc, link }) {
    if (!modal) return;
    
    modalImg.src = img || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80';
    modalImg.alt = title || 'Preview';
    modalTitle.textContent = title || 'Credential Preview';
    modalBadge.textContent = badge || 'Verified';
    modalDate.textContent = date || '';
    modalDesc.textContent = desc || 'Detailed credential information.';
    
    if (modalLink) {
      modalLink.href = link || '#';
      if (link && link !== '#') {
        modalLink.style.display = 'inline-flex';
      } else {
        modalLink.style.display = 'inline-flex';
        modalLink.href = 'https://example.com/verify-credential';
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeNeonModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock scroll
  }

  // Attach modal trigger to Profile Picture
  const profilePicCard = document.getElementById('profile-pic-card');
  const profileImg = document.getElementById('profile-img');

  if (profilePicCard && profileImg) {
    profilePicCard.addEventListener('click', () => {
      openNeonModal({
        img: profileImg.src,
        title: profilePicCard.getAttribute('data-title') || 'Harisankar T',
        badge: profilePicCard.getAttribute('data-badge') || 'About Me',
        date: profilePicCard.getAttribute('data-date') || '2026',
        desc: profilePicCard.getAttribute('data-desc') || 'Aspiring Cybersecurity Professional & SOC Analyst based in Palakkad, Kerala.',
        link: 'https://example.com/about-harisankar'
      });
    });
  }

  // Attach modal trigger to all Certification Cards
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger twice if clicking button directly
      const title = card.getAttribute('data-title');
      const badge = card.getAttribute('data-badge');
      const date = card.getAttribute('data-date');
      const desc = card.getAttribute('data-desc');
      const img = card.getAttribute('data-img');
      const link = card.getAttribute('data-link');

      openNeonModal({
        img,
        title,
        badge,
        date,
        desc,
        link
      });
    });
  });

  // Modal Close Listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeNeonModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeNeonModal);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeNeonModal();
    }
  });

  // =========================================================================
  // 2. THEME SWITCHER (Dark / Light Mode)
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleSm = document.getElementById('theme-toggle-sm');

  // Load persisted theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleSm) themeToggleSm.addEventListener('click', toggleTheme);

  // =========================================================================
  // 3. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('sidebar');

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('mobile-open');
    });

    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== menuToggleBtn) {
        sidebar.classList.remove('mobile-open');
      }
    });

    // Close when clicking any nav link
    const sidebarNavLinks = sidebar.querySelectorAll('.nav-link');
    sidebarNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
      });
    });
  }

  // =========================================================================
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (Intersection Observer)
  // =========================================================================
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');

  function updateActiveNav(activeId) {
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNav(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // =========================================================================
  // 5. READ MORE TOGGLE IN BIO
  // =========================================================================
  const readMoreBtn = document.getElementById('read-more-btn');
  const bioExtended = document.getElementById('bio-extended');

  if (readMoreBtn && bioExtended) {
    readMoreBtn.addEventListener('click', () => {
      const isOpen = bioExtended.classList.contains('open');
      if (isOpen) {
        bioExtended.classList.remove('open');
        readMoreBtn.querySelector('span').textContent = 'Read More';
      } else {
        bioExtended.classList.add('open');
        readMoreBtn.querySelector('span').textContent = 'Show Less';
      }
    });
  }

  // =========================================================================
  // 6. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
