# MovieHost

Готовый видеохостинг для фильмов на ASP.NET Core 8 и React + Vite.

## Возможности

- Каталог фильмов с поиском, фильтрами и сортировками
- Страница фильма с плеером (HLS/mp4/embed), переключением источников и рейтингом
- Голосование лайк/дизлайк с защитой от накрутки (IP + fingerprint)
- Админ-панель для добавления фильмов, жанров и источников
- EF Core (SQLite по умолчанию) с миграциями и сидированием данных
- Docker Compose для развёртывания и GitHub Actions для CI

## Стек

- Backend: ASP.NET Core 8, EF Core, Swagger
- Frontend: React 18, Vite, TypeScript, Tailwind CSS
- БД: SQLite (легко переключается на PostgreSQL)

## Структура проекта

```
MovieHost/
  backend/
    Controllers/
    Data/
    DTOs/
    Migrations/
    Models/
    Services/
    MovieHost.csproj
  frontend/
    src/
      api/
      components/
      i18n/
      pages/
    package.json
  docker-compose.yml
  README.md
```

## Запуск

### Локально

1. Backend
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

2. Frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Открыть http://localhost:5173

### Docker

```bash
docker-compose up --build
```

Frontend доступен на http://localhost:4173, API — http://localhost:5000.

## CI

В `.github/workflows/ci.yml` настроен GitHub Actions workflow, который собирает backend и frontend, а также применяет миграции к PostgreSQL (для проверки совместимости).

## Скриншоты (placeholder)

![Home placeholder](https://via.placeholder.com/1280x720.png?text=MovieHost+Home)
![Catalog placeholder](https://via.placeholder.com/1280x720.png?text=MovieHost+Catalog)

## Конфигурация

- Admin токен задаётся через `Admin:Token` в `appsettings.json` или переменную окружения `Admin__Token`.
- Разрешённый origin фронтенда — `FrontendOrigin`.

## Миграции

EF Core автоматически применяет миграции при старте приложения. Дополнительно миграции можно применить командой:

```bash
dotnet ef database update
```
