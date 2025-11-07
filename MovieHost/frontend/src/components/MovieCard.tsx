import { Link } from 'react-router-dom';
import { MovieSummary } from '../types';
import { RatingBar } from './RatingBar';

interface Props {
  movie: MovieSummary;
}

export function MovieCard({ movie }: Props) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-72 w-full overflow-hidden bg-slate-800">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">No Poster</div>
        )}
        <div className="absolute left-0 top-0 rounded-br bg-primary px-3 py-1 text-sm font-semibold text-slate-900">
          {movie.year}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-4">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <RatingBar rating={movie.avgRating} score={movie.score} />
      </div>
    </Link>
  );
}
