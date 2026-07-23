// Shared site behaviour: external links, back-to-top control and custom cursor.
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const siteHeader = document.querySelector('.v2-nav');
const siteNavigation = siteHeader?.querySelector('nav');

if (siteHeader && siteNavigation) {
  if (!siteNavigation.id) siteNavigation.id = 'site-navigation';
  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'mobile-nav-toggle';
  menuButton.setAttribute('aria-controls', siteNavigation.id);
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open navigation menu' : '開啟導覽選單');
  menuButton.innerHTML = '<span></span><span></span><span></span>';
  siteHeader.insertBefore(menuButton, siteHeader.querySelector('.mobile-lang-switch'));

  const closeMenu = () => {
    siteHeader.classList.remove('mobile-nav-open');
    document.body.classList.remove('mobile-menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open navigation menu' : '開啟導覽選單');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = !siteHeader.classList.contains('mobile-nav-open');
    siteHeader.classList.toggle('mobile-nav-open', isOpen);
    document.body.classList.toggle('mobile-menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen
      ? (document.documentElement.lang === 'en' ? 'Close navigation menu' : '關閉導覽選單')
      : (document.documentElement.lang === 'en' ? 'Open navigation menu' : '開啟導覽選單'));
  });

  siteNavigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  addEventListener('resize', () => {
    if (innerWidth > 980) closeMenu();
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (siteHeader.classList.contains('mobile-nav-open') && !siteHeader.contains(event.target)) closeMenu();
  });
}

const toTop = document.createElement('button');
toTop.type = 'button';
toTop.className = 'to-top';
toTop.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Back to top' : '回到頁面頂端');
toTop.innerHTML = `<span aria-hidden="true">↑</span><small>${document.documentElement.lang === 'en' ? 'TOP' : 'TOP'}</small>`;
document.body.append(toTop);

const syncToTop = () => {
  toTop.classList.toggle('show', window.scrollY > Math.max(520, window.innerHeight * .7));
};
addEventListener('scroll', syncToTop, { passive: true });
syncToTop();
toTop.addEventListener('click', () => {
  const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
  scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const useCustomCursor = cursorDot && cursorRing && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches;

if (useCustomCursor) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let pointerSeen = false;
  let contrastFrame = 0;

  const syncCursorContrast = target => {
    if (!pointerSeen) return;
    const currentTarget = target || document.elementFromPoint(mouseX, mouseY);
    document.body.classList.toggle('cursor-contrast', Boolean(currentTarget?.closest('.contact,.contact-sec')));
  };

  addEventListener('pointermove', event => {
    if (!pointerSeen) {
      pointerSeen = true;
      ringX = event.clientX;
      ringY = event.clientY;
      document.body.classList.add('cursor-ready');
    }
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.transform = `translate(${mouseX - cursorDot.offsetWidth / 2}px,${mouseY - cursorDot.offsetHeight / 2}px)`;
    syncCursorContrast(event.target);
  });

  addEventListener('scroll', () => {
    cancelAnimationFrame(contrastFrame);
    contrastFrame = requestAnimationFrame(() => syncCursorContrast());
  }, { passive: true });

  addEventListener('pointerover', event => {
    if (event.target.closest('a,button,label,[role="button"]')) document.body.classList.add('cursor-link');
  });
  addEventListener('pointerout', event => {
    if (!event.relatedTarget?.closest?.('a,button,label,[role="button"]')) document.body.classList.remove('cursor-link');
  });
  addEventListener('blur', () => document.body.classList.remove('cursor-link', 'cursor-contrast'));

  const followCursor = () => {
    if (pointerSeen) {
      ringX += (mouseX - ringX) * .16;
      ringY += (mouseY - ringY) * .16;
      cursorRing.style.transform = `translate(${ringX - cursorRing.offsetWidth / 2}px,${ringY - cursorRing.offsetHeight / 2}px)`;
    }
    requestAnimationFrame(followCursor);
  };
  followCursor();
}
