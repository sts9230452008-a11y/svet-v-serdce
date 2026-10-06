const toast = document.querySelector('#toast');
const toastText = document.querySelector('#toast-text');
const closeToast = document.querySelector('#close-toast');
closeToast?.addEventListener('click', () => toast.classList.remove('show'));

document.querySelector('.menu-button').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
});

// The room uses local mock data now and keeps the same shape that a realtime
// database can return later: id, author, prayer, tier, and normalized position.
const stage = document.querySelector('#candle-stage');
const modal = document.querySelector('#candle-modal');
const roomCta = document.querySelector('#room-cta');
const primaryButton = document.querySelector('.primary-button');
const reviewButton = document.querySelector('#review-button');
const reviewModal = document.querySelector('#review-modal');
const reviewClose = document.querySelector('#review-close');
const reviewSubmit = document.querySelector('#review-submit');
const quoteGrid = document.querySelector('#quote-grid');
const modalClose = document.querySelector('#modal-close');
const modalSubmit = document.querySelector('#modal-submit');
const balanceButton = document.querySelector('#balance-button');
const balanceValue = document.querySelector('#balance-value');
const supportButton = document.querySelector('#support-button');
const balanceModal = document.querySelector('#balance-modal');
const balanceClose = document.querySelector('#balance-close');
const topupAmount = document.querySelector('#topup-amount');
const topupSubmit = document.querySelector('#topup-submit');
const roomVisitors = document.querySelector('#room-visitors');
const roomCandleCount = document.querySelector('#room-candle-count');
const soundToggle = document.querySelector('#sound-toggle');
const findCandleButton = document.querySelector('#find-candle');
const tierCards = [...document.querySelectorAll('.tier-card')];
const previewCandle = document.querySelector('#preview-candle');
const previewTitle = document.querySelector('#preview-title');
const previewTime = document.querySelector('#preview-time');
const previewNote = document.querySelector('#preview-note');
const intentionField = document.querySelector('#modal-intention');
const churchMusic = document.querySelector('#church-music');
const musicTracks = Array.from({ length: 21 }, (_, index) => `Музыка/${String(index + 1).padStart(2, '0')}-track.mp3`);
let musicTrackIndex = 0;
let lastMusicTrackIndex = -1;

const roomNames = ['Анна', 'Сергей', 'Елена', 'Николай', 'Мария', 'Татьяна', 'Алексей', 'Ольга', 'Ирина', 'Дмитрий', 'Надежда', 'Михаил'];
const roomPrayers = [
  'Господи, помоги моей маме восстановиться после болезни и вернуться к спокойной жизни.',
  'Прошу здоровья моим детям, защити их от болезней и дурных людей.',
  'Помоги нам с мужем сохранить семью и научиться снова слышать друг друга.',
  'Господи, дай сил пережить этот тяжёлый период и не потерять надежду.',
  'Прошу, чтобы сын благополучно вернулся домой и нашёл правильную дорогу.',
  'Помоги дочери справиться с тревогой, поверить в себя и закончить учёбу.',
  'Господи, исцели моего отца и поддержи врачей, которые его лечат.',
  'Прошу мира в нашем доме, терпения в разговорах и доброты между близкими.',
  'Помоги найти работу, которой хватит на семью и которая не разрушит здоровье.',
  'Господи, благослови предстоящую операцию и дай нам хорошие новости.',
  'Прошу защитить нашу семью в дороге и благополучно привести нас к месту.',
  'Помоги мне выбраться из долгов и честно справиться со всеми обязательствами.',
  'Господи, дай мудрости принять решение, от которого зависит наша дальнейшая жизнь.',
  'Прошу, чтобы у нас получилось завести ребёнка, о котором мы так давно мечтаем.',
  'Помоги брату отказаться от зависимости и вернуться к нормальной жизни.',
  'Господи, утешь тех, кто сегодня остался один, и пошли им добрых людей.',
  'Прошу сил для бабушки, чтобы она меньше болела и не чувствовала себя одинокой.',
  'Помоги сдать экзамены и не растеряться от страха в самый важный день.',
  'Господи, примири нас с родными, пусть обида не разрушает нашу семью.',
  'Прошу честного и спокойного решения в деле, которое долго не даёт нам покоя.',
  'Помоги пережить утрату и научи жить дальше с благодарностью и любовью.',
  'Господи, сохрани моего любимого человека и верни его из дальней поездки.',
  'Прошу здоровья мужу, который много работает и почти не отдыхает.',
  'Помоги мне избавиться от паники, уснуть спокойно и просыпаться без страха.',
  'Господи, дай нам возможность закончить ремонт и вернуть в дом тепло.',
  'Прошу, чтобы конфликт на работе разрешился мирно и без несправедливости.',
  'Помоги ребёнку привыкнуть к новой школе и найти хороших друзей.',
  'Господи, направь меня к человеку, с которым можно построить добрую семью.',
  'Прошу сохранить любовь, несмотря на расстояние и сложные обстоятельства.',
  'Помоги оплатить лечение и не опустить руки перед большими расходами.',
  'Господи, дай выдержки не отвечать злом на зло и не ожесточиться.',
  'Прошу, чтобы сегодня разрешилась проблема, которую мы не можем решить сами.',
  'Помоги вернуть доверие сына и найти слова, которые он сможет услышать.',
  'Господи, благослови наш переезд и помоги начать жизнь на новом месте.',
  'Прошу защиты для всех, кто сейчас находится там, где опасно.',
  'Помоги мне простить близкого человека и перестать возвращаться к прошлому.',
  'Господи, дай сил ухаживать за больным родным и не забывать о себе.',
  'Прошу, чтобы начальство поступило справедливо и не лишило семью заработка.',
  'Помоги мужу найти в себе силы вернуться к вере и к семье.',
  'Господи, сохрани детей от дурного влияния и научи нас быть мудрыми родителями.',
  'Прошу благополучного рождения ребёнка и здоровья маме и малышу.',
  'Помоги найти потерянного человека и поскорее получить от него весточку.',
  'Господи, дай моей семье спокойную ночь и мирное утро.',
  'Прошу помощи в учёбе, чтобы знания не пропадали и труд принёс результат.',
  'Помоги не сорваться, когда становится трудно, и увидеть выход из ситуации.',
  'Господи, устрой всё к лучшему в вопросе, который я не могу изменить.',
  'Прошу здоровья всем, кто молится рядом со мной за своих близких.',
  'Помоги нам выплатить ипотеку и не потерять дом из-за трудностей.',
  'Господи, дай доброго спутника жизни моей сестре и защити её сердце.',
  'Прошу избавить дом от ссор, зависти и постоянного напряжения.',
  'Помоги пройти собеседование и получить возможность начать всё заново.',
  'Господи, поддержи друга, который скрывает свою боль и боится попросить помощи.',
  'Прошу, чтобы лечение принесло облегчение, а боль отступила.',
  'Помоги мне быть терпеливее с родителями и чаще говорить им слова любви.',
  'Господи, прими душу усопшего и даруй утешение всем, кто по нему скорбит.',
  'Прошу сохранить память о тех, кого уже нет рядом, и не дать нам забыть добро.',
  'Помоги принять правильное решение перед важным разговором.',
  'Господи, пусть в нашей семье будет достаточно сил, здоровья и хлеба на каждый день.'
];
const roomIntentions = ['Мир в душе', 'Благодарность', 'Успех и удача', 'Достаток и изобилие', 'Счастье и радость', 'Здоровье и благо', 'Любовь и семья', 'Защита от бед', 'Мудрость, учёба', 'Упокой'];
let roomCandleId = 0;
let chosenTier = { price: 10, hours: 1, kind: 'small' };
let dragState = null;
const candleStorageKey = 'svet-v-serdce-candles';
// Fill this locally with the YooMoney wallet number before testing payments.
const YOOMONEY_RECEIVER = '4100118107278253';
const YOOMONEY_RETURN_URL = window.location.protocol === 'http:' || window.location.protocol === 'https:'
  ? (() => {
    const returnUrl = new URL(window.location.href);
    returnUrl.search = '';
    returnUrl.hash = '';
    returnUrl.searchParams.set('payment', 'return');
    return returnUrl.toString();
  })()
  : 'https://svet-v-serce.ru/';
const PAYMENT_MODE = 'yoomoney'; // 'demo' for local testing, 'yoomoney' for the real form.
const pendingPaymentKey = 'svet-v-serdce-pending-payment';
const balanceStorageKey = 'svet-v-serdce-balance';
const pendingCandleKey = 'svet-v-serdce-pending-candle';
let hourlyCandleCount = null;
const candleVariants = [
  { className: 'slim', width: 11, radius: '3px 3px 2px 2px', colors: ['#9b6428', '#f2c77d', '#a56c2c'] },
  { className: 'pillar', width: 25, radius: '7px 7px 3px 3px', colors: ['#82532a', '#e5aa58', '#925c27'] },
  { className: 'tapered', width: 16, radius: '48% 48% 2px 2px', colors: ['#b1722f', '#f7d58d', '#b46f2e'] },
  { className: 'ivory', width: 19, radius: '5px 5px 2px 2px', colors: ['#a38a65', '#f1e0b6', '#b69b6d'] },
  { className: 'wine', width: 17, radius: '4px 4px 2px 2px', colors: ['#6c3026', '#c96e42', '#7d3629'] },
  { className: 'glass', width: 21, radius: '7px 7px 3px 3px', colors: ['#6a5540', '#e7b56c', '#654a32'] }
];

function seeded(index, salt) {
  const value = Math.sin(index * 999 + salt * 17.13) * 43758.5453;
  return value - Math.floor(value);
}

function formatRemaining(hours) {
  if (hours < 1) return 'меньше часа';
  const value = Math.ceil(hours);
  const word = value === 1 ? 'час' : value < 5 ? 'часа' : 'часов';
  return `${value} ${word}`;
}

function maxHoursForKind(kind) {
  return { small: 1, medium: 3, large: 6, premium: 12 }[kind] || 1;
}

function scheduleCandleRemoval(candle, expiresAt) {
  const remaining = Math.max(0, expiresAt - Date.now());
  candle.dataset.expiresAt = String(expiresAt);
  const remainingLabel = candle.querySelector('.remaining-time');
  if (remainingLabel) remainingLabel.textContent = `горит ещё ${formatRemaining(remaining / 3600000)}`;
  window.setTimeout(() => {
    candle.classList.add('burning-out');
    window.setTimeout(() => {
      candle.remove();
      updateRoomCandleCount();
      const activeCandles = getSavedCandles().filter((item) => item.expiresAt > Date.now() && item.expiresAt !== expiresAt);
      localStorage.setItem(candleStorageKey, JSON.stringify(activeCandles));
    }, 1200);
  }, remaining);
}

function updateRoomCandleCount() {
  if (roomCandleCount && stage) roomCandleCount.textContent = String(stage.querySelectorAll('.room-candle').length);
}

function getSavedCandles() {
  try {
    return JSON.parse(localStorage.getItem(candleStorageKey) || '[]');
  } catch {
    return [];
  }
}

function saveCandle(candleData) {
  const saved = getSavedCandles().filter((item) => item.expiresAt > Date.now());
  saved.push(candleData);
  localStorage.setItem(candleStorageKey, JSON.stringify(saved));
}

function normalizeSavedCandles() {
  const now = Date.now();
  const normalized = getSavedCandles()
    .map((item) => {
      const maxHours = maxHoursForKind(item.kind);
      const savedPrayer = String(item.prayer || 'Пусть в сердце будет мир и свет');
      const separator = savedPrayer.indexOf(': ');
      const intention = item.intention || (separator > -1 ? savedPrayer.slice(0, separator) : 'Мир в душе');
      const prayer = item.intention ? savedPrayer : separator > -1 ? savedPrayer.slice(separator + 2) : savedPrayer;
      return { ...item, intention, prayer, hours: Math.min(Number(item.hours) || maxHours, maxHours), expiresAt: Math.min(Number(item.expiresAt), now + maxHours * 3600000) };
    })
    .filter((item) => item.expiresAt > now);
  localStorage.setItem(candleStorageKey, JSON.stringify(normalized));
  return normalized;
}

function findMyCandle() {
  const saved = getSavedCandles().filter((item) => item.expiresAt > Date.now());
  if (!saved.length) {
    toastText.textContent = 'Пока нет свечи, поставленной с этого устройства.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 4500);
    return;
  }
  const target = saved[saved.length - 1];
  const candles = [...stage.querySelectorAll('.room-candle')];
  const candle = candles.find((item) => Number(item.dataset.expiresAt) === Number(target.expiresAt) && item.dataset.name === target.name);
  if (!candle) return;
  document.querySelector('#room')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  candle.classList.remove('found-candle');
  window.requestAnimationFrame(() => candle.classList.add('found-candle'));
  window.setTimeout(() => candle.classList.remove('found-candle'), 5000);
}

function makeRoomCandle({ name, intention, prayer, tier = 'standard', kind, x, y, hours = 7, expiresAt, highlight = false, owner = false, generated = false } = {}) {
  const index = roomCandleId;
  const variant = candleVariants[index % candleVariants.length];
  const candle = document.createElement('div');
  const visualKind = kind || (tier === 'premium' ? 'premium' : index % 3 === 0 ? 'medium' : 'small');
  const maxHours = maxHoursForKind(visualKind);
  const normalizedHours = Math.min(Number(hours) || maxHours, maxHours);
  const effectiveExpiresAt = Math.min(Number(expiresAt) || Date.now() + normalizedHours * 3600000, Date.now() + maxHours * 3600000);
  candle.className = `room-candle ${visualKind}${tier === 'premium' ? ' premium' : ''}${highlight ? ' new-candle' : ''}${generated ? ' generated-candle' : ''}`;
  candle.dataset.id = String(index);
  candle.dataset.x = String(x ?? (7 + seeded(index, 1) * 86));
  candle.dataset.y = String(y ?? (16 + seeded(index, 2) * 68));
  candle.dataset.name = name || roomNames[index % roomNames.length];
  candle.dataset.intention = intention || roomIntentions[index % roomIntentions.length];
  candle.dataset.prayer = prayer || roomPrayers[index % roomPrayers.length];
  candle.dataset.hours = String(normalizedHours);
  candle.style.left = `${candle.dataset.x}%`;
  candle.style.top = `${candle.dataset.y}%`;
  candle.style.setProperty('--candle-h', `${39 + seeded(index, 4) * 27}px`);
  candle.style.setProperty('--flicker', `${1.2 + seeded(index, 5) * 1.6}s`);
  candle.style.setProperty('--candle-w', `${variant.width + Math.round(seeded(index, 6) * 4)}px`);
  candle.style.setProperty('--candle-radius', variant.radius);
  candle.style.setProperty('--wax-start', variant.colors[0]);
  candle.style.setProperty('--wax-mid', variant.colors[1]);
  candle.style.setProperty('--wax-end', variant.colors[2]);
  candle.style.setProperty('--flame-w', `${11 + Math.round(seeded(index, 7) * 8)}px`);
  candle.style.setProperty('--flame-h', `${19 + Math.round(seeded(index, 8) * 13)}px`);
  candle.innerHTML = `<span class="room-flame"></span><span class="candle-tooltip"><strong></strong><small class="candle-intention"></small><small class="candle-prayer"></small><em class="remaining-time"></em></span>`;
  candle.querySelector('strong').textContent = candle.dataset.name;
  candle.querySelector('.candle-intention').textContent = `За что: ${candle.dataset.intention}`;
  candle.querySelector('.candle-prayer').textContent = `Молитва: ${candle.dataset.prayer}`;
  candle.querySelector('.remaining-time').textContent = `горит ещё ${formatRemaining(Number(candle.dataset.hours))}`;
  candle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 && event.pointerType !== 'touch') return;
    event.preventDefault();
    const bounds = stage.getBoundingClientRect();
    dragState = { candle, bounds, moved: false, offsetX: event.clientX - candle.getBoundingClientRect().left - candle.offsetWidth / 2, offsetY: event.clientY - candle.getBoundingClientRect().top - candle.offsetHeight / 2 };
    candle.setPointerCapture?.(event.pointerId);
    candle.style.zIndex = '9';
  });
  stage.appendChild(candle);
  updateRoomCandleCount();
  roomCandleId += 1;
  scheduleCandleRemoval(candle, effectiveExpiresAt);
  return candle;
}

function getHourlyCandleCount() {
  const now = new Date();
  const daySeed = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000);
  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const base = mobile
    ? 24 + Math.abs((daySeed * 17 + now.getHours() * 11) % 19)
    : 60 + Math.abs((daySeed * 31 + now.getHours() * 47) % 91);
  hourlyCandleCount = hourlyCandleCount === base ? (base === 150 ? 149 : base + 1) : base;
  return hourlyCandleCount;
}

function seedRoom() {
  const savedCount = normalizeSavedCandles().length;
  const targetCount = getHourlyCandleCount();
  const generatedCount = Math.max(0, targetCount - savedCount);
  for (let i = 0; i < generatedCount; i += 1) {
    const kind = i % 13 === 0 ? 'premium' : i % 4 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small';
    const intention = roomIntentions[i % roomIntentions.length];
    const hours = maxHoursForKind(kind);
    const alreadyBurned = seeded(i, 9) * hours * 0.75;
    const prayer = roomPrayers[i % roomPrayers.length];
    makeRoomCandle({ intention, prayer, hours, expiresAt: Date.now() + (hours - alreadyBurned) * 3600000, tier: kind === 'premium' ? 'premium' : 'standard', kind, generated: true });
  }
}

function refreshHourlyCandles() {
  stage?.querySelectorAll('.generated-candle').forEach((candle) => candle.remove());
  seedRoom();
  updateRoomCandleCount();
}

function scheduleHourlyRefresh() {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setMinutes(60, 0, 0);
  window.setTimeout(() => {
    refreshHourlyCandles();
    scheduleHourlyRefresh();
  }, Math.max(1000, nextHour.getTime() - now.getTime()));
}

function restoreSavedCandles() {
  normalizeSavedCandles()
    .filter((item) => item.expiresAt > Date.now())
    .forEach((item) => makeRoomCandle({ ...item, highlight: false }));
  localStorage.setItem(candleStorageKey, JSON.stringify(getSavedCandles().filter((item) => item.expiresAt > Date.now())));
}

function updateRoomVisitors() {
  if (!roomVisitors) return;
  const now = new Date();
  const dayProgress = (now.getHours() * 60 + now.getMinutes()) / (24 * 60);
  const count = Math.round(5 + 84 * Math.sin(Math.PI * dayProgress));
  roomVisitors.textContent = String(Math.max(5, Math.min(89, count)));
}

document.addEventListener('pointermove', (event) => {
  if (!dragState) return;
  const { candle, bounds } = dragState;
  const x = Math.max(1, Math.min(98, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.max(7, Math.min(94, ((event.clientY - bounds.top) / bounds.height) * 100));
  if (Math.abs(x - Number(candle.dataset.x)) + Math.abs(y - Number(candle.dataset.y)) > 1) dragState.moved = true;
  candle.dataset.x = String(x);
  candle.dataset.y = String(y);
  candle.style.left = `${x}%`;
  candle.style.top = `${y}%`;
});

document.addEventListener('pointerup', () => {
  if (!dragState) return;
  const { candle, moved } = dragState;
  candle.style.zIndex = '2';
  if (!moved && window.matchMedia('(max-width: 900px)').matches) {
    stage.querySelectorAll('.room-candle.candle-selected').forEach((item) => {
      if (item !== candle) item.classList.remove('candle-selected');
    });
    candle.classList.toggle('candle-selected');
  }
  dragState = null;
});

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

roomCta?.addEventListener('click', openModal);
findCandleButton?.addEventListener('click', findMyCandle);
primaryButton?.addEventListener('click', (event) => { event.preventDefault(); openModal(); });
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

function openReviewModal() {
  reviewModal?.classList.add('open');
  reviewModal?.setAttribute('aria-hidden', 'false');
  document.querySelector('#review-name')?.focus();
}

function closeReviewModal() {
  reviewModal?.classList.remove('open');
  reviewModal?.setAttribute('aria-hidden', 'true');
}

reviewButton?.addEventListener('click', openReviewModal);
reviewClose?.addEventListener('click', closeReviewModal);
reviewModal?.addEventListener('click', (event) => { if (event.target === reviewModal) closeReviewModal(); });
reviewSubmit?.addEventListener('click', () => {
  const name = document.querySelector('#review-name')?.value.trim() || 'Гость';
  const message = document.querySelector('#review-text')?.value.trim();
  if (!message) return;
  const pendingReviews = JSON.parse(localStorage.getItem('svet-v-serdce-pending-reviews') || '[]');
  pendingReviews.push({ name, message, submittedAt: new Date().toISOString(), status: 'pending' });
  localStorage.setItem('svet-v-serdce-pending-reviews', JSON.stringify(pendingReviews));
  document.querySelector('#review-name').value = '';
  document.querySelector('#review-text').value = '';
  closeReviewModal();
  toastText.textContent = 'Спасибо! Отзыв отправлен на модерацию администрации сайта.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 6000);
});

const tierNames = { small: 'Маленькая свеча', medium: 'Средняя свеча', large: 'Большая свеча', premium: 'Алтарная свеча' };
const tierNotes = { small: 'Тихое тёплое пламя', medium: 'Мягкий свет для молитвы', large: 'Яркое сияние вокруг', premium: 'Особое золотое пламя' };
function updatePreview() {
  previewCandle.className = `preview-candle ${chosenTier.kind}`;
  previewTitle.textContent = tierNames[chosenTier.kind];
  previewTime.textContent = `Горит ${chosenTier.hours} ${chosenTier.hours === 1 ? 'час' : 'часа'}`;
  previewNote.textContent = tierNotes[chosenTier.kind];
  modalSubmit.textContent = `${PAYMENT_MODE === 'demo' ? 'Поставить свечу' : 'Оплатить'} · ${chosenTier.price} ₽`;
}

function buildCandleData() {
  const name = document.querySelector('#modal-name').value.trim() || 'Гость';
  const prayer = document.querySelector('#modal-wish').value.trim() || 'Пусть в сердце будет мир и свет';
  const intention = intentionField?.value || 'Мир в душе';
  return {
    id: `my-candle-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    intention,
    prayer,
    price: chosenTier.price,
    hours: chosenTier.hours,
    kind: chosenTier.kind,
    tier: chosenTier.price === 100 ? 'premium' : 'standard',
    x: 42 + Math.random() * 16,
    y: 38 + Math.random() * 18,
    expiresAt: Date.now() + chosenTier.hours * 3600000
  };
}

function showPaymentMessage(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 6500);
}

function getBalance() {
  const value = Number(localStorage.getItem(balanceStorageKey));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function updateBalance() {
  if (balanceValue) balanceValue.textContent = `${getBalance().toFixed(0)} ₽`;
}

function setBalance(value) {
  localStorage.setItem(balanceStorageKey, String(Math.max(0, Math.round(value))));
  updateBalance();
}

function openBalanceModal(amount = 50) {
  if (!balanceModal) return;
  topupAmount.value = String(Math.max(10, Math.ceil(amount)));
  topupSubmit.textContent = `Пополнить · ${topupAmount.value} ₽`;
  balanceModal.classList.add('open');
  balanceModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeBalanceModal() {
  balanceModal?.classList.remove('open');
  balanceModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function completeCandlePlacement(candleData) {
  localStorage.removeItem(pendingPaymentKey);
  makeRoomCandle({ ...candleData, highlight: true });
  saveCandle(candleData);
  roomVisitors.textContent = String(Number(roomVisitors.textContent) + 1);
  const hours = Number(candleData.hours) || chosenTier.hours;
  showPaymentMessage(`${candleData.name}, твоя свеча будет гореть ${hours} ${hours === 1 ? 'час' : 'часа'}.`);
  closeModal();
  document.querySelector('#modal-name').value = '';
  document.querySelector('#modal-wish').value = '';
}

function startYooMoneyPayment(candleData) {
  if (PAYMENT_MODE === 'demo') {
    completeCandlePlacement(candleData);
    return;
  }

  if (!YOOMONEY_RECEIVER) {
    showPaymentMessage('Укажите номер кошелька YooMoney в начале script.js, чтобы включить оплату.');
    return;
  }

  const label = candleData.id.slice(0, 64);
  localStorage.setItem(pendingPaymentKey, JSON.stringify({ type: 'topup', label, amount: chosenTier.price, candleData }));
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://yoomoney.ru/quickpay/confirm';
  form.innerHTML = `
    <input type="hidden" name="receiver" value="${YOOMONEY_RECEIVER}">
    <input type="hidden" name="quickpay-form" value="button">
    <input type="hidden" name="paymentType" value="AC">
    <input type="hidden" name="sum" value="${chosenTier.price}">
    <input type="hidden" name="label" value="${label}">
    <input type="hidden" name="successURL" value="${YOOMONEY_RETURN_URL}">
  `;
  document.body.appendChild(form);
  form.submit();
  form.remove();
  showPaymentMessage('Переходим к оплате YooMoney. После успешного перевода вы вернётесь на сайт.');
}

function startTopupPayment(amount, candleData = null) {
  if (PAYMENT_MODE === 'demo') {
    setBalance(getBalance() + amount);
    if (candleData && getBalance() >= chosenTier.price) {
      setBalance(getBalance() - chosenTier.price);
      completeCandlePlacement(candleData);
    } else {
      showPaymentMessage(`Баланс пополнен на ${amount} ₽.`);
    }
    closeBalanceModal();
    return;
  }
  if (!YOOMONEY_RECEIVER) {
    showPaymentMessage('Укажите номер кошелька YooMoney, чтобы включить пополнение.');
    return;
  }
  const paymentId = `topup-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(pendingPaymentKey, JSON.stringify({ type: 'topup', label: paymentId.slice(0, 64), amount, candleData }));
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://yoomoney.ru/quickpay/confirm';
  form.innerHTML = `<input type="hidden" name="receiver" value="${YOOMONEY_RECEIVER}"><input type="hidden" name="quickpay-form" value="button"><input type="hidden" name="paymentType" value="AC"><input type="hidden" name="sum" value="${amount}"><input type="hidden" name="label" value="${paymentId.slice(0, 64)}"><input type="hidden" name="successURL" value="${YOOMONEY_RETURN_URL}">`;
  document.body.appendChild(form);
  form.submit();
  form.remove();
  closeBalanceModal();
  showPaymentMessage('Переходим к оплате. После успешного перевода вернитесь на сайт.');
}

function restorePaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment') !== 'return') return;
  const raw = localStorage.getItem(pendingPaymentKey);
  if (!raw) {
    showPaymentMessage('Платёж завершён, но данные свечи не найдены на этом устройстве.');
    return;
  }
  try {
    const pending = JSON.parse(raw);
    if (pending.type !== 'topup' || !pending.amount) throw new Error('Invalid pending payment.');
    setBalance(getBalance() + Number(pending.amount));
    const candlePrice = Number(pending.candleData?.price) || 0;
    if (pending.candleData?.id && candlePrice > 0 && getBalance() >= candlePrice) {
      setBalance(getBalance() - candlePrice);
      completeCandlePlacement(pending.candleData);
    } else {
      localStorage.removeItem(pendingPaymentKey);
      showPaymentMessage(`Баланс пополнен на ${pending.amount} ₽. Теперь выберите свечу.`);
      window.setTimeout(() => openBalanceModal(50), 250);
    }
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('payment');
    window.history.replaceState({}, document.title, cleanUrl);
  } catch {
    localStorage.removeItem(pendingPaymentKey);
    showPaymentMessage('Не удалось восстановить данные свечи после оплаты.');
  }
}

tierCards.forEach((card) => card.addEventListener('click', () => {
  tierCards.forEach((item) => item.classList.remove('selected'));
  card.classList.add('selected');
  chosenTier = { price: Number(card.dataset.price), hours: Number(card.dataset.hours), kind: card.dataset.kind };
  updatePreview();
}));

modalSubmit?.addEventListener('click', () => {
  const candleData = buildCandleData();
  if (getBalance() < chosenTier.price) {
    localStorage.setItem(pendingCandleKey, JSON.stringify(candleData));
    openBalanceModal(Math.max(50, chosenTier.price - getBalance()));
    return;
  }
  setBalance(getBalance() - chosenTier.price);
  completeCandlePlacement(candleData);
});

balanceButton?.addEventListener('click', () => openBalanceModal(50));
supportButton?.addEventListener('click', () => openBalanceModal(200));
balanceClose?.addEventListener('click', closeBalanceModal);
balanceModal?.addEventListener('click', (event) => { if (event.target === balanceModal) closeBalanceModal(); });
topupAmount?.addEventListener('input', () => {
  const amount = Math.max(10, Number(topupAmount.value) || 10);
  topupSubmit.textContent = `Пополнить · ${amount} ₽`;
});
topupSubmit?.addEventListener('click', () => {
  const amount = Math.max(10, Math.min(100000, Math.round(Number(topupAmount.value) || 50)));
  const pendingCandle = JSON.parse(localStorage.getItem(pendingCandleKey) || 'null');
  localStorage.removeItem(pendingCandleKey);
  startTopupPayment(amount, pendingCandle);
});

updatePreview();
updateBalance();
restorePaymentReturn();

function startMusic() {
  if (!churchMusic) return;
  if (musicTracks.length > 1) {
    do {
      musicTrackIndex = Math.floor(Math.random() * musicTracks.length);
    } while (musicTrackIndex === lastMusicTrackIndex);
  }
  lastMusicTrackIndex = musicTrackIndex;
  churchMusic.src = musicTracks[musicTrackIndex];
  churchMusic.volume = 0.28;
  churchMusic.play().catch(() => {});
  soundToggle.setAttribute('aria-pressed', 'true');
  soundToggle.querySelector('span').textContent = 'звук включён';
}

function stopMusic() {
  churchMusic?.pause();
  if (soundToggle) {
    soundToggle.setAttribute('aria-pressed', 'false');
    soundToggle.querySelector('span').textContent = 'звук выключен';
  }
}

churchMusic?.addEventListener('ended', () => {
  if (soundToggle?.getAttribute('aria-pressed') === 'true') startMusic();
});

soundToggle?.addEventListener('click', () => {
  if (churchMusic?.paused) startMusic();
  else stopMusic();
});

if (stage) {
  normalizeSavedCandles();
  seedRoom();
  restoreSavedCandles();
  updateRoomCandleCount();
  scheduleHourlyRefresh();
}
updateRoomVisitors();
window.setInterval(updateRoomVisitors, 60000);
