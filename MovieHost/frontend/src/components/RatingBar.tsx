interface Props {
  rating: number;
  score: number;
}

export function RatingBar({ rating, score }: Props) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-400">
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">★</span>
        <span className="font-semibold text-slate-100">{rating.toFixed(1)}</span>
      </div>
      <div className="text-xs uppercase tracking-wide">Score: {score}</div>
    </div>
  );
}
