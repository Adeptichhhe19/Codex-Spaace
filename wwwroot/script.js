const API_BASE = window.__API_BASE__ ?? "";

const state = {
  hero: null,
  movies: {},
  timeline: [],
  collections: [],
};

async function fetchJSON(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Accept": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Ошибка запроса: ${response.status}`);
  }
  return response.json();
}

function updateTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text ?? "—";
  }
}

function updateAttribute(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) {
    if (value) {
      element.setAttribute(attribute, value);
    } else {
      element.removeAttribute(attribute);
    }
  }
}

function renderHero(data) {
  if (!data) return;
  const heroSection = document.querySelector('[data-hero]');
  updateAttribute("[data-hero-poster]", "src", data.poster);
  updateAttribute("[data-hero-poster]", "alt", data.title);
  updateTextContent("[data-hero-poster-badge]", data.meta?.badge ?? "Премьера недели");
  updateTextContent("[data-hero-meta-badge]", data.meta?.badge);
  updateTextContent("[data-hero-meta-format]", data.meta?.format);
  updateTextContent("[data-hero-title]", data.title);
  updateTextContent("[data-hero-subtitle]", data.subtitle);
  updateTextContent("[data-hero-stat-imdb]", data.meta?.imdb);
  updateTextContent("[data-hero-stat-kinopoisk]", data.meta?.kinopoisk);
  updateTextContent("[data-hero-stat-premiere]", data.meta?.premiere);
  updateTextContent("[data-hero-detail-genre]", data.meta?.genre);
  updateTextContent("[data-hero-detail-director]", data.meta?.director);
  updateTextContent("[data-hero-detail-duration]", data.meta?.duration);
  updateTextContent("[data-hero-detail-age]", data.meta?.age);
  if (heroSection) {
    heroSection.style.setProperty('--hero-background', `url('${data.poster}')`);
  }
}

function createCard(item) {
  return `
    <article class="card">
      <div class="card__thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="card__gradient"></div>
        <div class="card__badge">${item.badge ?? ""}</div>
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
  const items = state.movies[type] ?? [];
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
  container.innerHTML = state.timeline
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
  container.innerHTML = state.collections
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

function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function renderSearchResults(container, items) {
  if (!items.length) {
    container.innerHTML = '<div class="search__empty">Ничего не найдено</div>';
    container.hidden = false;
    return;
  }
  container.innerHTML = items
    .map(
      (item) => `
        <button class="search__result" type="button">
          <span class="search__result-title">${item.title}</span>
          <span class="search__result-meta">${item.year} • ${item.genre}</span>
        </button>
      `
    )
    .join('');
  container.hidden = false;
}

function setupSearch() {
  const wrapper = document.querySelector('[data-search]');
  if (!wrapper) return;
  const input = wrapper.querySelector('input[type="search"]');
  const results = wrapper.querySelector('[data-search-results]');
  if (!input || !results) return;

  const closeResults = () => {
    results.hidden = true;
  };

  const performSearch = debounce(async () => {
    const query = input.value.trim();
    if (!query) {
      closeResults();
      return;
    }
    try {
      const data = await fetchJSON(`/api/search?q=${encodeURIComponent(query)}`);
      renderSearchResults(results, data);
    } catch (error) {
      results.innerHTML = `<div class="search__error">${error.message}</div>`;
      results.hidden = false;
    }
  }, 300);

  input.addEventListener('input', performSearch);
  input.addEventListener('focus', () => {
    if (results.innerHTML.trim()) {
      results.hidden = false;
    }
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      closeResults();
    }
  });
}

async function loadInitialData() {
  try {
    const [heroData, moviesData, timelineData, collectionsData] = await Promise.all([
      fetchJSON('/api/hero'),
      fetchJSON('/api/movies'),
      fetchJSON('/api/timeline'),
      fetchJSON('/api/collections'),
    ]);

    state.hero = heroData;
    state.movies = moviesData;
    state.timeline = timelineData;
    state.collections = collectionsData;

    renderHero(heroData);
    renderGrid('trending');
    renderTimeline();
    renderCollections();
  } catch (error) {
    const layout = document.querySelector('.layout');
    if (layout) {
      layout.innerHTML = `
        <div class="error">
          <h2>Не удалось загрузить данные</h2>
          <p>${error.message}</p>
          <button class="button button--primary" type="button" data-retry>Повторить попытку</button>
        </div>
      `;
      layout.querySelector('[data-retry]')?.addEventListener('click', () => {
        layout.innerHTML = '';
        loadInitialData();
      });
    }
  }
}

function init() {
  loadInitialData();
  setupTabs();
  setupMenu();
  setupHeroParallax();
  setupNavbar();
  setupSearch();
}

document.addEventListener('DOMContentLoaded', init);
