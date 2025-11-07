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

const TRAILER_EMBED_URL = "https://www.youtube.com/embed/1xV4f2ZA4xo?autoplay=1&rel=0";
const HERO_TITLE = "Астронавт: Последняя миссия";

const modalState = {
  element: null,
  content: null,
  lastFocused: null,
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

function getToastIcon(type) {
  switch (type) {
    case "success":
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.17 16.17 5 12l1.41-1.41 2.76 2.76 8.42-8.42L19 6.34 9.17 16.17Z"/></svg>`;
    case "warning":
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 21h22L12 2Zm0 6 5 9H7l5-9Zm-1 10h2v2h-2v-2Z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1 4v6h2v-6h-2Z"/></svg>`;
  }
}

function showToast(message, type = "info") {
  const container = document.querySelector("[data-toast-container]");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <span class="toast__icon">${getToastIcon(type)}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  const hide = () => {
    toast.style.transition = "opacity 240ms ease, transform 240ms ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  };

  setTimeout(hide, 4200);
  toast.addEventListener("click", hide);
}

function setupModal() {
  const element = document.querySelector("[data-modal]");
  if (!element) return;
  modalState.element = element;
  modalState.content = element.querySelector("#modal-content");

  element.addEventListener("click", (event) => {
    const trigger = event.target instanceof HTMLElement ? event.target.closest('[data-modal-close]') : null;
    if (trigger) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalState.element.hasAttribute("hidden")) {
      closeModal();
    }
  });
}

function focusFirstElement(container) {
  const selectors = ['button', '[href]', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])'];
  let focusable = container.querySelector(selectors.join(","));
  if (!(focusable instanceof HTMLElement)) {
    focusable = modalState.element?.querySelector('[data-modal-close]') ?? null;
  }
  if (focusable instanceof HTMLElement) {
    focusable.focus({ preventScroll: true });
  }
}

function openModal(options) {
  if (!modalState.element || !modalState.content) return;
  const { title, description, body = "", actions = [] } = options ?? {};
  modalState.lastFocused = document.activeElement;
  modalState.content.innerHTML = `
    ${title ? `<h3 class="modal__title" id="modal-title">${title}</h3>` : ""}
    ${description ? `<p class="modal__description">${description}</p>` : ""}
    ${body}
    ${actions.length ? `<div class="modal__actions"></div>` : ""}
  `;

  if (actions.length) {
    const actionsContainer = modalState.content.querySelector(".modal__actions");
    actions.forEach((action, index) => {
      const variant = action.variant ? `button--${action.variant}` : "button--primary";
      const button = document.createElement("button");
      button.type = "button";
      button.className = `button ${variant}`;
      button.textContent = action.label;
      if (typeof action.onClick === "function") {
        button.addEventListener("click", (event) => action.onClick(event, closeModal));
      }
      if (action.autofocus) {
        button.autofocus = true;
      }
      button.dataset.modalAction = String(index);
      actionsContainer?.appendChild(button);
    });
  }

  modalState.element.removeAttribute("hidden");
  modalState.element.classList.add("modal--open");
  document.body.classList.add("is-locked");
  focusFirstElement(modalState.content);
}

function closeModal() {
  if (!modalState.element || !modalState.content) return;
  modalState.element.classList.remove("modal--open");

  const finalize = () => {
    modalState.element.setAttribute("hidden", "");
    const iframe = modalState.content.querySelector("iframe");
    if (iframe) {
      iframe.src = iframe.src;
    }
    modalState.content.innerHTML = "";
    document.body.classList.remove("is-locked");
    if (modalState.lastFocused instanceof HTMLElement) {
      modalState.lastFocused.focus({ preventScroll: true });
    }
    modalState.lastFocused = null;
  };

  const duration = parseFloat(getComputedStyle(modalState.element).transitionDuration) || 0;
  window.setTimeout(finalize, duration ? duration * 1000 : 0);
}

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
    item.addEventListener('click', (event) => {
      event.preventDefault();
      items.forEach((btn) => btn.classList.remove('menu__item--active'));
      item.classList.add('menu__item--active');
      const { target } = item.dataset;
      if (target) {
        const section = document.querySelector(target);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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

function setupHeroActions() {
  const watchButton = document.querySelector('[data-action="watch"]');
  if (watchButton) {
    watchButton.addEventListener('click', () => {
      openModal({
        title: `Начать просмотр — «${HERO_TITLE}»`,
        description:
          'Эпизоды будут доступны сразу после подключения плеера. Пока вы можете выбрать, с чего продолжить просмотр.',
        body: `
          <ul class="modal__list">
            <li><span>Серия 1</span><span>«Обратный отсчёт»</span></li>
            <li><span>Серия 2</span><span>«Первая стыковка»</span></li>
            <li><span>Серия 3</span><span>«Потерянный сигнал»</span></li>
          </ul>
        `,
        actions: [
          {
            label: 'Продолжить с 12:45',
            variant: 'primary',
            onClick: (_, close) => {
              close();
              showToast('Мы сохранили вашу позицию. Плеер появится вместе с бэкендом.', 'success');
            },
          },
          {
            label: 'Начать сначала',
            variant: 'secondary',
            onClick: (_, close) => {
              close();
              showToast('Начинаем с первой серии. Уведомим, как только будет готово.', 'info');
            },
          },
        ],
      });
    });
  }

  const favoriteButton = document.querySelector('[data-action="favorite"]');
  if (favoriteButton) {
    favoriteButton.addEventListener('click', () => {
      const isActive = favoriteButton.classList.toggle('button--selected');
      favoriteButton.setAttribute('aria-pressed', String(isActive));
      showToast(
        isActive
          ? 'Фильм добавлен в избранное. Синхронизация с аккаунтом появится позже.'
          : 'Фильм удалён из избранного.',
        isActive ? 'success' : 'info'
      );
    });
  }

  const trailerButtons = document.querySelectorAll('[data-action="trailer"]');
  trailerButtons.forEach((button) =>
    button.addEventListener('click', () => {
      openModal({
        title: `Трейлер — «${HERO_TITLE}»`,
        description: 'Полноценный просмотр будет доступен на платформе Codex Cinema сразу после релиза.',
        body: `
          <div class="modal__video">
            <iframe
              src="${TRAILER_EMBED_URL}"
              title="Трейлер фильма ${HERO_TITLE}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        `,
        actions: [
          {
            label: 'Добавить напоминание',
            variant: 'secondary',
            onClick: (_, close) => {
              close();
              showToast('Напоминание отправим за день до премьеры.', 'success');
            },
          },
        ],
      });
    })
  );
}

function setupSubscription() {
  const subscribeButton = document.querySelector('[data-action="subscribe"]');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      openModal({
        title: 'Codex+ — премиальная подписка',
        description: 'Получите доступ к эксклюзивным релизам, офлайн-режиму и синхронизации устройств.',
        body: `
          <ul class="modal__list">
            <li><span>4K/8K контент</span><span>Без ограничений</span></li>
            <li><span>Совместный просмотр</span><span>До 4 друзей</span></li>
            <li><span>Эксклюзивы Codex</span><span>Каждую неделю</span></li>
          </ul>
        `,
        actions: [
          {
            label: 'Оформить за 499 ₽',
            variant: 'primary',
            onClick: (_, close) => {
              close();
              showToast('Заявка на подписку отправлена. Мы свяжемся с вами после авторизации.', 'success');
            },
          },
          {
            label: 'Подробнее',
            variant: 'ghost',
            onClick: (_, close) => {
              close();
              showToast('Скоро появится страница с тарифами и условиями.', 'info');
            },
          },
        ],
      });
    });
  }
}

function setupTrialActivation() {
  const trialButton = document.querySelector('[data-action="trial"]');
  if (trialButton) {
    trialButton.addEventListener('click', () => {
      showToast('7-дневный пробный период активируется сразу после входа в аккаунт.', 'success');
    });
  }
}

function setupProfileShortcut() {
  const profileButton = document.querySelector('.navbar__profile');
  if (profileButton) {
    profileButton.addEventListener('click', () => {
      openModal({
        title: 'Мой профиль',
        description: 'Следите за прогрессом, создавайте подборки и управляйте подпиской в одном месте.',
        body: `
          <ul class="modal__list">
            <li><span>История просмотров</span><span>Синхронизация с устройствами</span></li>
            <li><span>Избранное</span><span>Доступно офлайн</span></li>
            <li><span>Личные рекомендации</span><span>На основе вашего настроения</span></li>
          </ul>
        `,
        actions: [
          {
            label: 'Перейти в настройки',
            variant: 'primary',
            onClick: (_, close) => {
              close();
              showToast('Настройки профиля появятся после подключения бэкенда.', 'info');
            },
          },
          {
            label: 'Закрыть',
            variant: 'ghost',
            onClick: (_, close) => close(),
          },
        ],
      });
    });
  }
}

function init() {
  setupModal();
  renderGrid('trending');
  renderTimeline();
  renderCollections();
  setupTabs();
  setupMenu();
  setupHeroParallax();
  setupNavbar();
  setupHeroActions();
  setupSubscription();
  setupTrialActivation();
  setupProfileShortcut();
}

document.addEventListener('DOMContentLoaded', init);
