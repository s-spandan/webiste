document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate');
  const navLinks = document.querySelectorAll('.nav-links a');
  const staggeredItems = document.querySelectorAll('.feature-card, .progress-row, .detail-block');

  animatedElements.forEach((element, index) => {
    element.style.setProperty('--delay', `${index * 70}ms`);
  });

  staggeredItems.forEach((item, index) => {
    item.style.setProperty('--item-delay', `${index * 85}ms`);
  });

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(element => element.classList.add('animate-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -70px 0px'
  });

  animatedElements.forEach(element => revealObserver.observe(element));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(item => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    });
  });
});
