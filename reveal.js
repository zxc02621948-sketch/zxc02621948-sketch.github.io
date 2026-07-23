const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .01, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.rv').forEach((el, i) => {
  const startsInView = el.getBoundingClientRect().top < window.innerHeight;
  el.style.transitionDelay = startsInView ? (Math.min(i, 4) * 40) + 'ms' : '0ms';
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

  const requestedCase = () => {
    const requested = location.hash.slice(1);
    return validTargets.has(requested) ? requested : null;
  };

  const syncCaseFromUrl = () => {
    const target = requestedCase();
    if (!target) return;

    const activeTarget = caseChoices.find(choice => choice.classList.contains('active'))?.dataset.caseTarget;
    if (target !== activeTarget) selectCase(target, false);
  };

  const requested = requestedCase();
  selectCase(requested || caseChoices[0].dataset.caseTarget, Boolean(requested));
  window.addEventListener('popstate', syncCaseFromUrl);
  window.addEventListener('hashchange', syncCaseFromUrl);
}
