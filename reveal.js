const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i, 6) * 55) + 'ms';
  io.observe(el);
});

// 站內連結用相對路徑，站外一律是完整網址 → 全部開新分頁
document.querySelectorAll('a[href^="http"]').forEach(a => {
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});
