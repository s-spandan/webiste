// Professional Portfolio Interactions & Animations

// Toggle Profile Details with Smooth Animation
const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
const extraDetails = document.getElementById('extraDetails');

if (toggleDetailsBtn && extraDetails) {
  toggleDetailsBtn.addEventListener('click', () => {
    const isHidden = extraDetails.classList.toggle('hidden');
    toggleDetailsBtn.textContent = isHidden ? '→ Show Details' : '← Hide Details';

    // Add animation on reveal
    if (!isHidden) {
      extraDetails.style.animation = 'none';
      setTimeout(() => {
        extraDetails.style.animation = 'fadeInUp 0.6s ease-out';
      }, 10);
    }
  });
}

// Enhanced Card Interactions & Fade Effects
document.addEventListener('DOMContentLoaded', () => {
  const cardPopables = document.querySelectorAll('.card-popable');
  const strengthItems = document.querySelectorAll('.strength-item');
  const pageFrame = document.querySelector('.page-frame');
  const hero = document.querySelector('.hero');

  // Enhanced card-popable hover effects with smooth transitions
  cardPopables.forEach((card, index) => {
    // Stagger animation for initial load
    card.style.animationDelay = `${0.1 + index * 0.1}s`;

    card.addEventListener('mouseenter', () => {
      pageFrame.classList.add('card-popable-active');
      cardPopables.forEach(c => {
        if (c !== card) {
          c.classList.add('faded-out');
        }
      });
      // Fade other sections
      document.querySelectorAll('.summary-section, .section-block').forEach(section => {
        section.classList.add('faded-out');
      });
      if (hero) {
        hero.classList.add('faded-out');
      }
    });

    card.addEventListener('mouseleave', () => {
      pageFrame.classList.remove('card-popable-active');
      cardPopables.forEach(c => c.classList.remove('faded-out'));
      document.querySelectorAll('.summary-section, .section-block').forEach(section => {
        section.classList.remove('faded-out');
      });
      if (hero) {
        hero.classList.remove('faded-out');
      }
    });
  });

  // Enhanced strength-item click/tap interactions
  strengthItems.forEach((item, index) => {
    // Stagger animation for initial load
    item.style.animationDelay = `${0.2 + index * 0.05}s`;

    const toggleBtn = item.querySelector('.strength-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('expanded');

        // Haptic feedback for mobile devices
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      });
    }

    // Allow clicking on the item itself to toggle
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
  });

  // Smooth scroll reveal for animated elements
  const animatedElements = document.querySelectorAll('.animate');

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('animate-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        // Stagger child animations
        const children = entry.target.querySelectorAll('.strength-item');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.08}s`;
        });
      } else {
        entry.target.classList.remove('animate-visible');
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -100px 0px'
  });

  animatedElements.forEach(element => observer.observe(element));

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';

  // Enhance button interactions with ripple effect
  const buttons = document.querySelectorAll('.action-btn, .resume-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      // Prevent duplicates
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Performance optimization: lazy load section reveal
  const sections = document.querySelectorAll('.section-block, .summary-section, .card-grid');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => sectionObserver.observe(section));
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Allow Tab navigation through interactive elements
  const strengthItems = document.querySelectorAll('.strength-item');
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains('strength-toggle') || activeElement.classList.contains('strength-item')) {
      activeElement.click();
    }
  }
});

// Add accessibility announcements
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleDetailsBtn');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', function () {
      const isExpanded = !this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', isExpanded);
    });
  }
});
