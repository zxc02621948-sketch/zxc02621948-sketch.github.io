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

const finePointer = matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches;
if (finePointer) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  document.body.classList.add('cursor-ready');

  addEventListener('pointermove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX - 3}px,${mouseY - 3}px)`;
  });

  function followPointer() {
    ringX += (mouseX - ringX) * .16;
    ringY += (mouseY - ringY) * .16;
    ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px,${ringY - ring.offsetHeight / 2}px)`;
    requestAnimationFrame(followPointer);
  }
  followPointer();

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('pointerenter', () => document.body.classList.add('cursor-link'));
    link.addEventListener('pointerleave', () => document.body.classList.remove('cursor-link'));
  });
}
