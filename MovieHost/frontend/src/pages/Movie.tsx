import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { moviesApi } from '../api/client';
import { Player } from '../components/Player';
import { RatingBar } from '../components/RatingBar';
import { SourceSelector } from '../components/SourceSelector';
import { MovieDetail, MovieSource } from '../types';
import { strings, defaultLocale } from '../i18n/strings';

const t = strings[defaultLocale];

function getFingerprint() {
  const key = 'moviehost:fingerprint';
  let fp = localStorage.getItem(key);
  if (!fp) {
    const generator = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    fp = generator.replace(/[^A-Za-z0-9_-]/g, '').padEnd(12, '0').slice(0, 32);
    localStorage.setItem(key, fp);
  }
  return fp;
}

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [activeSource, setActiveSource] = useState<MovieSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    moviesApi
      .get(id)
      .then((data) => {
        setMovie(data);
        setActiveSource(data.sources[0] ?? null);
        setError(null);
        moviesApi
          .view(id)
          .then(() =>
            setMovie((prev) => (prev ? { ...prev, views: prev.views + 1 } : prev))
          )
          .catch(() => {});
      })
      .catch(() => setError('Не удалось загрузить фильм'))
      .finally(() => setLoading(false));
  }, [id]);

  const genresText = useMemo(() => movie?.genres.join(', '), [movie]);

  const vote = (value: 1 | -1) => {
    if (!id) return;
    const fingerprint = getFingerprint();
    moviesApi
      .vote(id, value, fingerprint)
      .then(({ score, avgRating }) => {
        setError(null);
        setMovie((prev) => (prev ? { ...prev, score, avgRating } : prev));
      })
      .catch(() => {
        setError('Не удалось отправить голос');
      });
  };

  if (loading) {
    return <div>{t.loading}</div>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-red-400">{error}</div>
        <button onClick={() => navigate(-1)} className="rounded-lg bg-slate-800 px-4 py-2 text-sm">
          {t.back}
        </button>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-sm text-slate-400">{t.noMovies}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          {activeSource && <Player source={activeSource} />}
          {movie.sources.length > 1 && (
            <SourceSelector
              sources={movie.sources}
              currentId={activeSource?.id ?? ''}
              onSelect={(s) => setActiveSource(s)}
            />
          )}
        </div>
        <aside className="w-full max-w-sm space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h1 className="text-3xl font-semibold text-white">{movie.title}</h1>
          <RatingBar rating={movie.avgRating} score={movie.score} />
          <div className="text-sm text-slate-300">{movie.year}</div>
          {movie.durationMinutes && (
            <div className="text-sm text-slate-300">
              {t.duration}: {movie.durationMinutes} мин
            </div>
          )}
          {movie.country && (
            <div className="text-sm text-slate-300">
              {t.country}: {movie.country}
            </div>
          )}
          {genresText && (
            <div className="text-sm text-slate-300">
              {t.genres}: {genresText}
            </div>
          )}
          <div className="flex items-center gap-3">
            <button onClick={() => vote(1)} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900">
              {t.likes}
            </button>
            <button onClick={() => vote(-1)} className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-900">
              {t.dislikes}
            </button>
          </div>
          <div className="text-xs uppercase text-slate-500">
            {t.views}: {movie.views}
          </div>
        </aside>
      </div>
      {movie.description && (
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-3 text-xl font-semibold text-white">{t.description}</h2>
          <p className="text-slate-300">{movie.description}</p>
        </section>
      )}
    </div>
  );
}
