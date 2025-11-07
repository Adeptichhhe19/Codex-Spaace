export const strings = {
  ru: {
    appTitle: 'MovieHost',
    hits: 'Хиты',
    newest: 'Новинки',
    catalog: 'Каталог',
    searchPlaceholder: 'Поиск фильмов...',
    genreFilter: 'Жанр',
    yearFilter: 'Год',
    sortLabel: 'Сортировать',
    sortPopularity: 'Популярность',
    sortRating: 'Рейтинг',
    sortDate: 'Дата',
    watch: 'Смотреть',
    duration: 'Длительность',
    country: 'Страна',
    genres: 'Жанры',
    description: 'Описание',
    likes: 'Лайк',
    dislikes: 'Дизлайк',
    adminTitle: 'Админка',
    adminTokenPlaceholder: 'Токен администратора',
    adminCreateMovie: 'Создать фильм',
    sources: 'Источники',
    addSource: 'Добавить источник',
    save: 'Сохранить',
    delete: 'Удалить',
    noMovies: 'Фильмы не найдены',
    loading: 'Загрузка...',
    rating: 'Рейтинг',
    views: 'Просмотры',
    back: 'Назад'
  }
} as const;

export type Locale = keyof typeof strings;
export const defaultLocale: Locale = 'ru';
