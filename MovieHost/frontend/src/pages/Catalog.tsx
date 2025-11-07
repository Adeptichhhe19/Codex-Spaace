import { FormEvent, useEffect, useMemo, useState } from 'react';
import { genresApi, moviesApi } from '../api/client';
import { MovieCard } from '../components/MovieCard';
import { Genre, MovieSummary, PagedResult } from '../types';
import { strings, defaultLocale } from '../i18n/strings';

const t = strings[defaultLocale];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<number | undefined>();
  const [genre, setGenre] = useState<number | undefined>();
  const [sort, setSort] = useState<'popularity' | 'rating' | 'date'>('popularity');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PagedResult<MovieSummary> | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    genresApi.list().then(setGenres);
  }, []);

  useEffect(() => {
    setLoading(true);
    moviesApi
      .list({ q: query || undefined, year, genre, sort, page, pageSize: 12 })
      .then(setResult)
      .finally(() => setLoading(false));
  }, [query, year, genre, sort, page]);

  const totalPages = useMemo(() => {
    if (!result) return 0;
    return Math.ceil(result.total / result.pageSize);
  }, [result]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t.searchPlaceholder}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <select
            value={genre ?? ''}
            onChange={(e) => {
              setGenre(e.target.value ? Number(e.target.value) : undefined);
              setPage(1);
            }}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="">{t.genreFilter}</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <select
            value={year ?? ''}
            onChange={(e) => {
              setYear(e.target.value ? Number(e.target.value) : undefined);
              setPage(1);
            }}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="">{t.yearFilter}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as typeof sort);
              setPage(1);
            }}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="popularity">{t.sortPopularity}</option>
            <option value="rating">{t.sortRating}</option>
            <option value="date">{t.sortDate}</option>
          </select>
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-900">
            {t.catalog}
          </button>
        </div>
      </form>

      {loading && <div>{t.loading}</div>}

      {!loading && result && result.items.length === 0 && <div className="text-sm text-slate-400">{t.noMovies}</div>}

      {!loading && result && result.items.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.items.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-full px-3 py-1 text-sm ${p === page ? 'bg-primary text-slate-900' : 'bg-slate-800 text-slate-200'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
