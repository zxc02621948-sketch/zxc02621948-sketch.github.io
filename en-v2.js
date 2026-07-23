const revealTargets = [...document.querySelectorAll('.en-reveal')];
revealTargets.forEach(item => item.classList.add('reveal-item'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('shown');
      observer.unobserve(entry.target);
    }
  }), { threshold: .1, rootMargin: '0px 0px -6% 0px' });
  revealTargets.forEach(item => observer.observe(item));
} else {
  revealTargets.forEach(item => item.classList.add('shown'));
}
