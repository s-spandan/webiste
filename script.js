const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
const extraDetails = document.getElementById('extraDetails');
const themeBtn = document.getElementById('themeBtn');

if (toggleDetailsBtn && extraDetails) {
  toggleDetailsBtn.addEventListener('click', () => {
    const isHidden = extraDetails.classList.toggle('hidden');
    toggleDetailsBtn.textContent = isHidden ? 'Show details' : 'Hide details';
  });
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? 'Light theme' : 'Switch theme';
  });
}

// Add pop-up hover effects for card-popable elements
document.addEventListener('DOMContentLoaded', () => {
  const cardPopables = document.querySelectorAll('.card-popable');
  const strengthItems = document.querySelectorAll('.strength-item');
  const pageFrame = document.querySelector('.page-frame');
  const hero = document.querySelector('.hero');
  
  // Handle card-popable hover effects
  cardPopables.forEach(card => {
    card.addEventListener('mouseenter', () => {
      pageFrame.classList.add('card-popable-active');
      cardPopables.forEach(c => {
        if (c !== card) {
          c.classList.add('faded-out');
        }
      });
      // Also fade other sections
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

  // Handle strength-item click toggle
  strengthItems.forEach(item => {
    const toggleBtn = item.querySelector('.strength-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('expanded');
      });
    }
    
    // Also allow clicking on the item itself to toggle
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
    });
  });

  const animatedElements = document.querySelectorAll('.animate');

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('animate-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      } else {
        entry.target.classList.remove('animate-visible');
      }
    });
  }, {
    threshold: 0.16,
  });

  animatedElements.forEach(element => observer.observe(element));
});
