// Improvements:
// - Responsive nav toggle
// - Collapse/expand article info reliably
// - Back-to-top button visibility
// - Smooth anchor scrolling for animal images

(() => {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(() => {
    // NAV TOGGLE (robust per-header)
    const navToggleBtns = Array.from(document.querySelectorAll('.collapseNav'));
    function closeNavElement(navEl) {
      if (!navEl) return;
      navEl.classList.remove('open');
      navEl.style.maxHeight = '0px';
      navEl.style.overflow = 'hidden';
    }
    function openNavElement(navEl) {
      if (!navEl) return;
      navEl.classList.add('open');
      // allow layout to settle before reading scrollHeight
      requestAnimationFrame(() => {
        navEl.style.maxHeight = navEl.scrollHeight + 'px';
        navEl.style.overflow = 'hidden';
      });
    }

    navToggleBtns.forEach(btn => {
      // find the .contentNav that belongs to this header/button
      const header = btn.closest('header') || document;
      const contentNav = header.querySelector('.contentNav');

      // Accessibility attributes
      if (contentNav) {
        const navId = contentNav.id || ('contentNav-' + Math.random().toString(36).slice(2,8));
        contentNav.id = navId;
        btn.setAttribute('aria-controls', navId);
        btn.setAttribute('aria-expanded', 'false');
      }

      // initial state depending on screen size
      if (contentNav) {
        if (window.innerWidth <= 900) {
          contentNav.style.maxHeight = '0px';
          contentNav.style.overflow = 'hidden';
        } else {
          // remove inline styles so desktop layout is natural
          contentNav.style.maxHeight = '';
          contentNav.style.overflow = '';
        }
      }

      btn.addEventListener('click', (e) => {
        if (!contentNav) return;
        e.stopPropagation();
        const isOpen = contentNav.classList.contains('open');
        if (isOpen) {
          closeNavElement(contentNav);
          btn.setAttribute('aria-expanded','false');
        } else {
          openNavElement(contentNav);
          btn.setAttribute('aria-expanded','true');
        }
      });

      // Close nav when a link inside it is clicked (mobile friendly)
      if (contentNav) {
        contentNav.addEventListener('click', (ev) => {
          const link = ev.target.closest('a');
          if (link && window.innerWidth <= 900) {
            closeNavElement(contentNav);
            btn.setAttribute('aria-expanded','false');
          }
        });
      }
    });

    // reset nav styles on resize to keep behavior consistent
    window.addEventListener('resize', () => {
      navToggleBtns.forEach(btn => {
        const header = btn.closest('header') || document;
        const contentNav = header.querySelector('.contentNav');
        if (!contentNav) return;
        if (window.innerWidth <= 900) {
          // collapse on mobile by default
          contentNav.style.maxHeight = '0px';
          contentNav.style.overflow = 'hidden';
          contentNav.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        } else {
          // allow natural desktop layout
          contentNav.style.maxHeight = '';
          contentNav.style.overflow = '';
          contentNav.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        }
      });
    });

    // Close open navs when clicking outside (mobile)
    document.addEventListener('click', (ev) => {
      if (window.innerWidth > 900) return;
      navToggleBtns.forEach(btn => {
        const header = btn.closest('header') || document;
        const contentNav = header.querySelector('.contentNav');
        if (!contentNav) return;
        if (!contentNav.classList.contains('open')) return;
        const clickedInside = ev.target.closest('.contentNav') || ev.target.closest('.collapseNav');
        if (!clickedInside) {
          closeNavElement(contentNav);
          btn.setAttribute('aria-expanded','false');
        }
      });
    });

    // Close open navs with Escape key on mobile
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        navToggleBtns.forEach(btn => {
          const header = btn.closest('header') || document;
          const contentNav = header.querySelector('.contentNav');
          if (!contentNav) return;
          if (contentNav.classList.contains('open')) {
            closeNavElement(contentNav);
            btn.setAttribute('aria-expanded','false');
          }
        });
      }
    });

    // COLLAPSIBLE ARTICLE INFO
    const collapsibles = Array.from(document.querySelectorAll('.collapse.articleInfo'));
    collapsibles.forEach(button => {
      const content = button.nextElementSibling;
      // set initial state
      if (content) {
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0px';
        content.style.transition = 'max-height 0.35s ease';
      }
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        if (!content) return;
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
          content.style.maxHeight = '0px';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    // Smooth scroll for internal anchor links (animal images)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // BACK TO TOP button behavior
    const btnTopo = document.getElementById('btnTopo');
    if (btnTopo) {
      btnTopo.style.display = 'none';
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btnTopo.style.display = 'block';
        else btnTopo.style.display = 'none';
      });
    }
  });
})();