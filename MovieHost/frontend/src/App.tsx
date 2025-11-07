import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { CatalogPage } from './pages/Catalog';
import { MoviePage } from './pages/Movie';
import { AdminPage } from './pages/Admin';
import { strings, defaultLocale } from './i18n/strings';

const t = strings[defaultLocale];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary text-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`;

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            {t.appTitle}
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/catalog" className={navClass}>
              {t.catalog}
            </NavLink>
            <NavLink to="/admin" className={navClass}>
              {t.adminTitle}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
