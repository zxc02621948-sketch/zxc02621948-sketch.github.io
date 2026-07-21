const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i, 6) * 55) + 'ms';
  io.observe(el);
});

// 首頁案例選擇器：保留所有內容於 HTML，載入後才切換為單一案例顯示
const caseChoices = [...document.querySelectorAll('[data-case-target]')];
const casePanels = [...document.querySelectorAll('[data-case-panel]')];

if (caseChoices.length && casePanels.length) {
  const validTargets = new Set(casePanels.map(panel => panel.id));

  const selectCase = (target, updateUrl = true) => {
    if (!validTargets.has(target)) return;

    caseChoices.forEach(choice => {
      const selected = choice.dataset.caseTarget === target;
      choice.classList.toggle('active', selected);
      choice.setAttribute('aria-selected', String(selected));
      choice.tabIndex = selected ? 0 : -1;
    });

    casePanels.forEach(panel => {
      const selected = panel.id === target;
      panel.hidden = !selected;
      panel.classList.remove('case-switching');
      if (selected) {
        void panel.offsetWidth;
        panel.classList.add('case-switching');
      }
    });

    if (updateUrl) history.replaceState(null, '', `#${target}`);
  };

  caseChoices.forEach((choice, index) => {
    choice.addEventListener('click', () => selectCase(choice.dataset.caseTarget));
    choice.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + caseChoices.length) % caseChoices.length;
      if (event.key === 'ArrowRight') next = (index + 1) % caseChoices.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = caseChoices.length - 1;
      caseChoices[next].focus();
      selectCase(caseChoices[next].dataset.caseTarget);
    });
  });

  const requested = location.hash.slice(1);
  selectCase(validTargets.has(requested) ? requested : caseChoices[0].dataset.caseTarget, Boolean(requested));
}

// 站內連結用相對路徑，站外一律是完整網址 → 全部開新分頁
document.querySelectorAll('a[href^="http"]').forEach(a => {
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});
