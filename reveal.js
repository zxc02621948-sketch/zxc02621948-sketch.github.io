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

// 保留瀏覽器原本的捲動位置；需要時提供明確的回到頂端操作
const toTop = document.createElement('button');
toTop.type = 'button';
toTop.className = 'to-top';
toTop.setAttribute('aria-label', '回到頁面頂端');
const toTopArrow = document.createElement('span');
toTopArrow.textContent = '↑';
const toTopLabel = document.createElement('small');
toTopLabel.textContent = 'TOP';
toTop.append(toTopArrow, toTopLabel);
document.body.append(toTop);

const syncToTop = () => toTop.classList.toggle('show', window.scrollY > Math.max(520, window.innerHeight * .7));
window.addEventListener('scroll', syncToTop, { passive: true });
syncToTop();

toTop.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

// 站內連結用相對路徑，站外一律是完整網址 → 全部開新分頁
document.querySelectorAll('a[href^="http"]').forEach(a => {
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});
