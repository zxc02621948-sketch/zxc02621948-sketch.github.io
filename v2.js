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
    proofLabel: '查看正式案例',
    detailLink: 'service-web.html'
  },
  chat: {
    code: 'ROUTE_02 / AI CUSTOMER SERVICE',
    status: '適合想先處理商品導購、預約引導或常見問題的店家',
    title: '先讓客人完成下一步，需要時再加入補問與真人接手。',
    text: '可以從商品推薦、直購或預約連結開始；問題較複雜時，再升級成多輪補問、通知真人與對話摘要。',
    input: '商品／服務資料、預約方式、常見問題',
    output: '可依需求升級的對話入口',
    option: 'AI 導購／客服',
    proofLink: 'https://lin.ee/RNYMLFM',
    proofLabel: '加入 LINE 測試版 Demo',
    demoLink: 'https://service.aicreateaworld.com/ai-kefu-playground/',
    demoLabel: '開啟網頁版 Demo',
    detailLink: 'service-ai-kefu.html',
    proofNote: 'LINE 與網頁 Demo 均為獨立測試環境，可自由操作。'
  },
  flow: {
    code: 'ROUTE_03 / WORKFLOW AUTOMATION',
    status: '適合重複整理信件、同步庫存、發通知與製作報表',
    title: '訂單、信件與資料收到後，依規則送到下一個步驟。',
    text: '串接表單、Email、訂單、庫存、試算表與既有工具，處理分類、同步、定期報表及失敗通知。',
    input: '訂單、信件、表單與排程事件',
    output: '會自行接續並留下紀錄的流程',
    option: '流程自動化',
    proofLink: 'service-n8n.html#automation-cases',
    proofLabel: '查看實際流程',
    detailLink: 'service-n8n.html'
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
    meta: ['品牌官網','SEO','網頁 AI 諮詢','維運'], link: 'https://www.fullyjet.com/', label: '查看正式網站'
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
const serviceLink = document.querySelector('#serviceLink');
const serviceProofNote = document.querySelector('#serviceProofNote');
const servicePanel = document.querySelector('#servicePanel');
let currentService = 'web';

function selectService(key) {
  const data = serviceData[key];
  if (!data) return;
  currentService = key;
  serviceNodes.forEach(node => {
    const active = node.dataset.service === key;
    node.classList.toggle('active', active);
    node.setAttribute('aria-selected', String(active));
    node.tabIndex = active ? 0 : -1;
    if (active) servicePanel.setAttribute('aria-labelledby', node.id);
  });
  Object.keys(consoleFields).forEach(field => { consoleFields[field].textContent = data[field]; });
  serviceProofLink.href = data.proofLink;
  serviceProofLink.firstChild.textContent = `${data.proofLabel} `;
  serviceDemoLink.hidden = !data.demoLink;
  if (data.demoLink) {
    serviceDemoLink.href = data.demoLink;
    serviceDemoLink.firstChild.textContent = `${data.demoLabel} `;
  }
  serviceLink.href = data.detailLink || data.proofLink;
  serviceProofNote.hidden = !data.proofNote;
  serviceProofNote.textContent = data.proofNote || '';
}

serviceNodes.forEach((node, index) => {
  node.addEventListener('click', () => selectService(node.dataset.service));
  node.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + serviceNodes.length) % serviceNodes.length;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % serviceNodes.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = serviceNodes.length - 1;
    serviceNodes[next].focus();
    selectService(serviceNodes[next].dataset.service);
  });
});

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

const revealItems = [...document.querySelectorAll('.systems-head,.control-room,.projects-head,.project-field,.project-drawer,.process-head,.process-board,.objection-card,.studio-about-label,.studio-about-copy,.studio-about-facts,.contact h2')];
revealItems.forEach(item => item.classList.add('reveal-item'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); }
  }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('shown'));
