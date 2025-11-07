import { useEffect, useState } from 'react';
import { moviesApi, HighlightsResponse } from '../api/client';
import { MovieCard } from '../components/MovieCard';
import { strings, defaultLocale } from '../i18n/strings';

const t = strings[defaultLocale];

export function HomePage() {
  const [data, setData] = useState<HighlightsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moviesApi
      .highlights()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>{t.loading}</div>;
  }

  if (!data) {
    return <div className="text-sm text-slate-400">Не удалось загрузить данные.</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-white">{t.hits}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.hits.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-white">{t.newest}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.newest.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
