const DATASETS = {
  trending: [
    {
      title: "Крушёная машина",
      rating: 8.3,
      year: 2024,
      genre: "Фантастика, боевик",
      badge: "тренд",
      image:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Городской гуру",
      rating: 9.1,
      year: 2025,
      genre: "Драма, триллер",
      badge: "эксклюзив",
      image:
        "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Тайна синего купола",
      rating: 8.8,
      year: 2023,
      genre: "Научная фантастика",
      badge: "премьера",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Секретный город",
      rating: 8.5,
      year: 2024,
      genre: "Мистерия, триллер",
      badge: "новое",
      image:
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Шёпот туманной долины",
      rating: 8.9,
      year: 2024,
      genre: "Фэнтези",
      badge: "рекомендация",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Неоновые улицы",
      rating: 9.2,
      year: 2025,
      genre: "Киберпанк, драма",
      badge: "новинка",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    },
  ],
  premieres: [
    {
      title: "Орбита тени",
      rating: 8.7,
      year: 2025,
      genre: "Фантастика, триллер",
      badge: "премьера",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Дыхание океана",
      rating: 8.4,
      year: 2024,
      genre: "Приключения",
      badge: "эксклюзив",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Марсианский дневник",
      rating: 8.6,
      year: 2025,
      genre: "Документальный",
      badge: "IMAX",
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80",
    },
  ],
  exclusive: [
    {
      title: "Неоновая одиссея",
      rating: 9.4,
      year: 2024,
      genre: "Фантастика",
      badge: "ультра",
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Тихая высота",
      rating: 9.1,
      year: 2023,
      genre: "Драма",
      badge: "авторское",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    },
  ],
  top250: [
    {
      title: "Вершина",
      rating: 9.9,
      year: 1994,
      genre: "Классика",
      badge: "легенда",
      image:
        "https://images.unsplash.com/photo-1495562569060-2eec283d3391?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Наследие",
      rating: 9.7,
      year: 2003,
      genre: "Драма",
      badge: "топ",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

const timeline = [
  {
    title: "Премьера сериала \"Лунный причал\"",
    meta: "12 марта • 21:00",
    description: "Только на Codex Cinema: пост-шоу с актёрами сразу после финала.",
  },
  {
    title: "Онлайн-синема \"Неоновые улицы\"",
    meta: "14 марта • 20:00",
    description: "Виртуальный показ с поддержкой пространственного звука и чатом зрителей.",
  },
  {
    title: "Стрим режиссёра Джессики Варлей",
    meta: "16 марта • 19:30",
    description: "Инсайты о съёмках \"Астронавта\" и эксклюзивные раскадровки.",
  },
];

const collections = [
  {
    title: "Ночь неонового мегаполиса",
    meta: "12 фильмов • 4K HDR",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Артхаус на выходные",
    meta: "8 фильмов • Dolby Vision",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Галактический марафон",
    meta: "15 фильмов • IMAX",
    image:
      "https://images.unsplash.com/photo-1517814767949-6d09c2933d90?auto=format&fit=crop&w=1200&q=80",
  },
];

function createCard(item) {
  return `
    <article class="card">
      <div class="card__thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="card__gradient"></div>
        <div class="card__badge">${item.badge}</div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${item.title}</h3>
        <div class="card__meta">
          <span class="card__rating">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 9.19 8.26 2 9.27l5 4.87L5.82 21 12 17.27 18.18 21 17 14.14l5-4.87-7.19-1.01L12 2Z"/></svg>
            ${item.rating}
          </span>
          <span>${item.year}</span>
        </div>
        <div class="card__genres">${item.genre}</div>
      </div>
    </article>
  `;
}

function renderGrid(type) {
  const grid = document.querySelector('[data-grid="trending"]');
  if (!grid) return;
  const items = DATASETS[type] ?? [];
  if (!items.length) {
    grid.innerHTML = `
      <div class="empty">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16l-8-4-8 4V5Z"/></svg>
        <span>Здесь пока пусто. Выберите другую категорию.</span>
      </div>
    `;
    return;
  }
  grid.innerHTML = items.map(createCard).join("");
}

function renderTimeline() {
  const container = document.querySelector('[data-grid="timeline"]');
  if (!container) return;
  container.innerHTML = timeline
    .map(
      (item) => `
        <div class="timeline__item">
          <span class="timeline__meta">${item.meta}</span>
          <h5 class="timeline__title">${item.title}</h5>
          <p class="timeline__description">${item.description}</p>
        </div>
      `
    )
    .join("");
}

function renderCollections() {
  const container = document.querySelector('[data-grid="collections"]');
  if (!container) return;
  container.innerHTML = collections
    .map(
      (item) => `
        <article class="collection">
          <div class="collection__image" style="background-image:url('${item.image}')"></div>
          <div class="collection__overlay"></div>
          <div class="collection__body">
            <h3 class="collection__title">${item.title}</h3>
            <span class="collection__meta">${item.meta}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function setupTabs() {
  const tabs = document.querySelectorAll('[data-filter]');
  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      tabs.forEach((btn) => btn.classList.remove('tabs__item--active'));
      tab.classList.add('tabs__item--active');
      renderGrid(tab.dataset.filter);
    })
  );
}

function setupMenu() {
  const items = document.querySelectorAll('.menu__item');
  items.forEach((item) =>
    item.addEventListener('click', () => {
      items.forEach((btn) => btn.classList.remove('menu__item--active'));
      item.classList.add('menu__item--active');
    })
  );
}

function setupHeroParallax() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--cursor-x', `${x}%`);
    hero.style.setProperty('--cursor-y', `${y}%`);
  });
}

function setupNavbar() {
  const navbar = document.querySelector('[data-navbar]');
  if (!navbar) return;
  const toggleState = () => {
    if (window.scrollY > 16) {
      navbar.classList.add('navbar--solid');
    } else {
      navbar.classList.remove('navbar--solid');
    }
  };
  toggleState();
  window.addEventListener('scroll', toggleState, { passive: true });
}

function init() {
  renderGrid('trending');
  renderTimeline();
  renderCollections();
  setupTabs();
  setupMenu();
  setupHeroParallax();
  setupNavbar();
}

document.addEventListener('DOMContentLoaded', init);
