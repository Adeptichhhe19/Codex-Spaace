import { FormEvent, useEffect, useState } from 'react';
import { adminApi, AdminSourcePayload, genresApi } from '../api/client';
import { Genre } from '../types';
import { strings, defaultLocale } from '../i18n/strings';

const t = strings[defaultLocale];

interface SourceForm extends AdminSourcePayload {
  id: string;
}

export function AdminPage() {
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState<number | undefined>();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sources, setSources] = useState<SourceForm[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    genresApi.list().then(setGenres);
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const addSourceField = () => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    setSources((prev) => [
      ...prev,
      {
        id,
        kind: 'Hls',
        label: '',
        url: '',
        sortOrder: prev.length + 1
      }
    ]);
  };

  const updateSource = (id: string, field: keyof AdminSourcePayload, value: string | number) => {
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const removeSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const movie = await adminApi.createMovie(
        {
          title,
          year,
          description,
          posterUrl,
          country,
          durationMinutes: duration,
          genres: selectedGenres
        },
        token
      );

      for (const source of sources) {
        await adminApi.addSource(
          movie.id,
          {
            kind: source.kind,
            label: source.label,
            url: source.url,
            sortOrder: source.sortOrder
          },
          token
        );
      }

      setMessage('Фильм создан');
      setTitle('');
      setDescription('');
      setPosterUrl('');
      setCountry('');
      setDuration(undefined);
      setSelectedGenres([]);
      setSources([]);
    } catch (error) {
      setMessage('Ошибка создания фильма');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold text-white">{t.adminTitle}</h1>
      <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-400">{t.adminTokenPlaceholder}</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-400">Название</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">Год</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
              min={1900}
              max={2100}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">{t.duration}</label>
            <input
              type="number"
              value={duration ?? ''}
              onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
              min={1}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">Постер URL</label>
            <input value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">{t.country}</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-400">{t.description}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-32 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Жанры</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => toggleGenre(g.id)}
                className={`rounded-full border px-3 py-1 text-sm ${selectedGenres.includes(g.id) ? 'border-primary bg-primary/20 text-primary' : 'border-slate-700 bg-slate-800 text-slate-200'}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{t.sources}</h2>
            <button type="button" onClick={addSourceField} className="rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-slate-900">
              {t.addSource}
            </button>
          </div>
          {sources.length === 0 && <div className="text-sm text-slate-500">Источники пока не добавлены.</div>}
          {sources.map((source) => (
            <div key={source.id} className="grid gap-2 rounded-lg border border-slate-800 p-3 md:grid-cols-5">
              <select
                value={source.kind}
                onChange={(e) => updateSource(source.id, 'kind', e.target.value as AdminSourcePayload['kind'])}
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm"
              >
                <option value="Hls">HLS</option>
                <option value="Mp4">MP4</option>
                <option value="Embed">Embed</option>
              </select>
              <input
                value={source.label}
                onChange={(e) => updateSource(source.id, 'label', e.target.value)}
                placeholder="Label"
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm md:col-span-2"
              />
              <input
                value={source.url}
                onChange={(e) => updateSource(source.id, 'url', e.target.value)}
                placeholder="URL"
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm md:col-span-2"
              />
              <div className="flex items-center gap-2 md:col-span-5">
                <input
                  type="number"
                  value={source.sortOrder}
                  onChange={(e) => updateSource(source.id, 'sortOrder', Number(e.target.value))}
                  className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm"
                />
                <button type="button" onClick={() => removeSource(source.id)} className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-semibold text-slate-900">
                  {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
          disabled={loading}
        >
          {t.adminCreateMovie}
        </button>
        {message && <div className="text-sm text-slate-300">{message}</div>}
      </form>
    </div>
  );
}
