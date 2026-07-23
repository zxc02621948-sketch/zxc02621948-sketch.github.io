document.querySelectorAll('.service-requirement-builder').forEach(builder => {
  const features = [...builder.querySelectorAll('.ai-features input[type="checkbox"]')];
  const title = builder.querySelector('.service-requirement-title');
  const items = builder.querySelector('.service-requirement-items');
  const note = builder.querySelector('.service-requirement-note');
  const copyButton = builder.querySelector('.service-requirement-copy');
  const status = builder.querySelector('.service-requirement-status');
  const result = builder.querySelector('.ai-estimate-result');
  const serviceName = builder.dataset.service || '訂製系統';

  if (!features.length || !title || !items) return;

  const mobileSummary = document.createElement('button');
  const mobileSummaryCount = document.createElement('span');
  const mobileSummaryAction = document.createElement('b');
  const resultId = result?.id || `requirement-summary-${Math.random().toString(36).slice(2, 9)}`;
  let builderVisible = false;
  let resultVisible = false;

  if (result) {
    result.id = resultId;
    result.tabIndex = -1;
    mobileSummary.type = 'button';
    mobileSummary.className = 'service-requirement-mobile-summary';
    mobileSummary.setAttribute('aria-controls', resultId);
    mobileSummaryCount.textContent = '尚未選擇功能';
    mobileSummaryAction.textContent = '查看需求摘要 ↓';
    mobileSummary.append(mobileSummaryCount, mobileSummaryAction);
    builder.append(mobileSummary);

    mobileSummary.addEventListener('click', () => {
      result.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
      window.setTimeout(() => result.focus({ preventScroll: true }), 450);
    });
  }

  const selectedFeatures = () => features.filter(input => input.checked);
  const syncMobileSummary = selected => {
    if (!result) return;
    mobileSummaryCount.textContent = selected.length ? `已選 ${selected.length} 項功能` : '尚未選擇功能';
    mobileSummary.classList.toggle('is-visible', selected.length > 0 && builderVisible && !resultVisible);
  };

  const render = message => {
    const selected = selectedFeatures();
    items.replaceChildren();

    if (!selected.length) {
      title.textContent = '尚未選擇功能';
      const item = document.createElement('li');
      item.className = 'is-empty';
      item.textContent = '從左側勾選想要的功能';
      items.append(item);
      if (copyButton) copyButton.disabled = true;
    } else {
      title.textContent = `已選 ${selected.length} 項功能`;
      selected.forEach(input => {
        const item = document.createElement('li');
        item.textContent = input.dataset.name;
        items.append(item);
      });
      if (copyButton) copyButton.disabled = false;
    }

    if (status) status.textContent = message || '';
    syncMobileSummary(selected);
  };

  if (result && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      builderVisible = entry.isIntersecting;
      syncMobileSummary(selectedFeatures());
    }).observe(builder);

    new IntersectionObserver(([entry]) => {
      resultVisible = entry.isIntersecting;
      syncMobileSummary(selectedFeatures());
    }, { threshold: .15 }).observe(result);
  } else {
    builderVisible = true;
  }

  features.forEach(input => input.addEventListener('change', () => render()));
  note?.addEventListener('input', () => { if (status) status.textContent = ''; });

  document.querySelectorAll('.service-package-apply').forEach(button => {
    button.addEventListener('click', () => {
      const preset = (button.dataset.preset || '').split(',').filter(Boolean);
      if (preset.length) {
        features.forEach(input => { input.checked = preset.includes(input.value); });
        render(`已套用「${button.dataset.package}」，可以繼續增減功能。`);
      } else {
        render('請從清單勾選需要的功能。');
      }

      builder.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => builder.querySelector('legend')?.focus({ preventScroll: true }), 450);
    });
  });

  copyButton?.addEventListener('click', async () => {
    const selected = selectedFeatures();
    if (!selected.length) return;

    const featureText = selected.map(input => input.dataset.name).join('、');
    const noteText = note?.value.trim();
    const noteLine = noteText ? `\n補充情況：${noteText}` : '';
    const summary = `您好，我想詢問${serviceName}。\n希望包含：${featureText}。${noteLine}\n想請你依資料量、流程與串接方式協助評估並提供正式報價。`;

    try {
      await navigator.clipboard.writeText(summary);
      if (status) status.textContent = '需求訊息已複製，可以貼到 LINE、WhatsApp 或 Email。';
    } catch {
      if (status) status.textContent = '瀏覽器無法自動複製，請截圖保留目前的勾選結果。';
    }
  });

  render();
});
