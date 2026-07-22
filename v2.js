const serviceData = {
  web: {
    code: 'ROUTE_01 / BRAND WEBSITE',
    status: '適合需要官網介紹服務與接收詢問的品牌',
    title: '把服務說清楚，讓客戶知道怎麼聯絡或下單。',
    text: '整理品牌內容、服務項目、案例與聯絡方式；需要時也能加上客服、表單或通知功能。',
    input: '品牌資料、服務內容、案例',
    output: '可營業的品牌網站',
    option: '品牌網站',
    proofLink: '#projects',
    proofLabel: '查看正式案例'
  },
  chat: {
    code: 'ROUTE_02 / AI CUSTOMER SERVICE',
    status: '適合經常收到產品、尺寸與服務問題的店家',
    title: '常見問題由系統先回答，需要判斷時再轉給真人。',
    text: '系統會依照你提供的資料回答，也能繼續詢問必要資訊。遇到無法確認的內容，就把對話內容一起轉交真人。',
    input: '產品資料、FAQ、客戶提問',
    output: '有邊界的自動回覆流程',
    option: 'AI 客服',
    proofLink: 'https://lin.ee/RNYMLFM',
    proofLabel: '加入 LINE 測試版 Demo',
    demoLink: 'https://service.aicreateaworld.com/ai-kefu-playground/',
    demoLabel: '開啟網頁版 Demo',
    detailLink: 'service-ai-kefu.html',
    proofNote: 'LINE 與網頁 Demo 均為獨立測試環境，可自由操作。'
  },
  flow: {
    code: 'ROUTE_03 / WORKFLOW AUTOMATION',
    status: '適合每天重複複製資料、發通知與整理紀錄',
    title: '資料收到後，自動分類、通知並送到下一個工具。',
    text: '串接表單、Email、LINE、試算表與既有工具，處理資料同步、定期報表和失敗通知。',
    input: '表單、訂單、排程事件',
    output: '會自己接續的工作流程',
    option: '流程自動化',
    proofLink: 'service-n8n.html',
    proofLabel: '查看流程完整說明'
  },
  data: {
    code: 'ROUTE_04 / DATA SYSTEM',
    status: '適合需要查詢資料或自行更新內容的業主',
    title: '自己查資料、更新內容，需要時也能匯出紀錄。',
    text: '依照實際工作方式設計欄位、篩選、權限、匯出與管理畫面，日常更新不必每次找人修改。',
    input: '表單紀錄、圖片、客戶資料',
    output: '可操作的查詢與管理後台',
    option: '資料系統',
    proofLink: 'https://service.aicreateaworld.com/survey-system-demo/',
    proofLabel: '試用問卷 Demo',
    detailLink: 'service-form.html'
  },
  quote: {
    code: 'ROUTE_05 / QUOTE ENGINE',
    status: '適合品項多、計價規則固定但人工報價耗時的工作',
    title: 'AI 讀取需求，價格仍照你的目錄與規則計算。',
    text: '系統先找出需求中的品項與數量，再比對供應商目錄並依規則計算。不確定的項目會標記出來，交由人工確認。',
    input: '文字需求、商品目錄、計價規則',
    output: '有資料來源的報價內容',
    option: 'AI 報價',
    proofLink: 'https://service.aicreateaworld.com/ai-quote-demo/',
    proofLabel: '試用報價 Demo',
    detailLink: 'service-quote.html'
  }
};

const projectData = {
  fulijie: {
    number: '01', tag: '正式營運案例 · WEBSITE + AI', title: '富立傑木作裝修',
    text: '從品牌官網、內容整理到網頁 AI 諮詢流程獨立完成；目前持續服務實際客戶並負責上線後維運。',
    meta: ['品牌官網','SEO','AI 客服','維運'], link: 'https://www.fullyjet.com/', label: '查看正式網站'
  },
  quote: {
    number: '02', tag: '海外客戶專案 · QUOTE ENGINE', title: 'AI 報價助手',
    text: '把技師輸入的施工需求整理成品項與數量，依供應商目錄和確定規則計價；找不到的內容保留待確認。',
    meta: ['LLM 抽取','目錄比對','規則計價','API'], link: 'https://service.aicreateaworld.com/ai-quote-demo/', label: '操作報價 Demo'
  },
  survey: {
    number: '03', tag: '需求系統原型 · DATA JOURNEY', title: '引導式問卷系統',
    text: '根據填答者身分與上一題答案顯示下一步，後台可查詢、篩選與匯出，把散亂需求轉成可用資料。',
    meta: ['條件題目','後台查詢','資料篩選','匯出'], link: 'https://service.aicreateaworld.com/survey-system-demo/', label: '操作問卷 Demo'
  },
  aicreate: {
    number: '04', tag: '自有產品 · CONTENT PLATFORM', title: 'AI 創界',
    text: '自行完成並持續營運的圖片、音樂與影片內容平台，包含帳號、媒體處理、內容審核、搜尋及多項 API。',
    meta: ['Next.js','MongoDB','多媒體','持續營運'], link: 'https://aicreateaworld.com/', label: '前往 AI 創界'
  }
};

const serviceNodes = [...document.querySelectorAll('.service-node')];
const consoleFields = {
  code: document.querySelector('#serviceCode'), status: document.querySelector('#serviceStatus'),
  title: document.querySelector('#serviceTitle'), text: document.querySelector('#serviceText'),
  input: document.querySelector('#serviceInput'), output: document.querySelector('#serviceOutput')
};
const serviceProofLink = document.querySelector('#serviceProofLink');
const serviceDemoLink = document.querySelector('#serviceDemoLink');
const serviceDetailLink = document.querySelector('#serviceDetailLink');
const serviceProofNote = document.querySelector('#serviceProofNote');
let currentService = 'web';

function selectService(key) {
  const data = serviceData[key];
  if (!data) return;
  currentService = key;
  serviceNodes.forEach(node => {
    const active = node.dataset.service === key;
    node.classList.toggle('active', active);
    node.setAttribute('aria-selected', String(active));
  });
  Object.keys(consoleFields).forEach(field => { consoleFields[field].textContent = data[field]; });
  serviceProofLink.href = data.proofLink;
  serviceProofLink.firstChild.textContent = `${data.proofLabel} `;
  serviceDemoLink.hidden = !data.demoLink;
  if (data.demoLink) {
    serviceDemoLink.href = data.demoLink;
    serviceDemoLink.firstChild.textContent = `${data.demoLabel} `;
  }
  serviceDetailLink.hidden = !data.detailLink;
  if (data.detailLink) serviceDetailLink.href = data.detailLink;
  serviceProofNote.hidden = !data.proofNote;
  serviceProofNote.textContent = data.proofNote || '';
}

serviceNodes.forEach(node => node.addEventListener('click', () => selectService(node.dataset.service)));

const projectNodes = [...document.querySelectorAll('.project-node')];
const projectFields = {
  number: document.querySelector('#projectNumber'), tag: document.querySelector('#projectTag'),
  title: document.querySelector('#projectTitle'), text: document.querySelector('#projectText')
};
const projectMeta = document.querySelector('#projectMeta');
const projectLink = document.querySelector('#projectLink');
const projectDrawer = document.querySelector('.project-drawer');

function selectProject(key) {
  const data = projectData[key];
  if (!data) return;
  projectNodes.forEach(node => {
    const active = node.dataset.project === key;
    node.classList.toggle('active', active);
    node.setAttribute('aria-pressed', String(active));
  });
  Object.keys(projectFields).forEach(field => { projectFields[field].textContent = data[field]; });
  projectMeta.innerHTML = data.meta.map(item => `<span>${item}</span>`).join('');
  projectLink.href = data.link;
  projectLink.firstChild.textContent = `${data.label} `;
  projectDrawer.classList.remove('is-updating');
  requestAnimationFrame(() => projectDrawer.classList.add('is-updating'));
}

projectDrawer.addEventListener('animationend', () => projectDrawer.classList.remove('is-updating'));

projectNodes.forEach(node => node.addEventListener('click', () => {
  selectProject(node.dataset.project);
  if (window.innerWidth <= 1100) {
    window.setTimeout(() => projectDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }
}));

const requestedProject = new URLSearchParams(window.location.search).get('project');
if (requestedProject && projectData[requestedProject]) selectProject(requestedProject);

const buildInputs = [...document.querySelectorAll('.build-options input')];
const estimatePrice = document.querySelector('#estimatePrice');
const selectedSummary = document.querySelector('#selectedSummary');
const estimateNote = document.querySelector('#estimateNote');

function updateEstimate() {
  const selected = buildInputs.filter(input => input.checked);
  if (!selected.length) {
    estimatePrice.textContent = '尚未選擇';
    selectedSummary.textContent = '可複選，請勾選需要的功能。';
    estimateNote.textContent = '實際費用仍會依資料整理、頁面數量、串接方式與維護需求確認。';
    return;
  }
  const total = selected.reduce((sum, input) => sum + Number(input.value), 0);
  const lower = selected.length > 1 ? Math.ceil(total * .9 / 1000) * 1000 : total;
  const upper = Math.ceil(total * 1.25 / 1000) * 1000;
  estimatePrice.textContent = `NT$${lower.toLocaleString('zh-TW')}～${upper.toLocaleString('zh-TW')}`;
  selectedSummary.textContent = `已選 ${selected.length} 項：${selected.map(input => input.dataset.label).join('、')}。`;
  estimateNote.textContent = selected.length > 1
    ? '區間下限已納入共用資料、帳號或後台的情況；資料量、串接與例外處理較複雜時，費用會接近上限。'
    : '實際費用仍會依資料整理、頁面數量、串接方式與維護需求確認。';
}

buildInputs.forEach(input => input.addEventListener('change', updateEstimate));
document.querySelector('#serviceLink').addEventListener('click', () => {
  const target = buildInputs.find(input => input.dataset.label === serviceData[currentService].option);
  if (target) { target.checked = true; updateEstimate(); }
});

const revealItems = [...document.querySelectorAll('.systems-head,.control-room,.projects-head,.project-field,.project-drawer,.builder-title,.builder-board,.objection-card,.contact h2')];
revealItems.forEach(item => item.classList.add('reveal-item'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); }
  }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('shown'));

const finePointer = matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches;
if (finePointer) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.body.classList.add('cursor-ready');
  addEventListener('pointermove', event => {
    mouseX = event.clientX; mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX - dot.offsetWidth / 2}px,${mouseY - dot.offsetHeight / 2}px)`;
    document.body.classList.toggle('cursor-contrast', Boolean(event.target.closest('.contact,.contact-sec')));
  });
  function follow() {
    ringX += (mouseX - ringX) * .16; ringY += (mouseY - ringY) * .16;
    ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px,${ringY - ring.offsetHeight / 2}px)`;
    requestAnimationFrame(follow);
  }
  follow();
  document.querySelectorAll('a,button,label').forEach(element => {
    element.addEventListener('pointerenter', () => document.body.classList.add('cursor-link'));
    element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-link'));
  });
}
