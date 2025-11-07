import clsx from 'clsx';
import { MovieSource } from '../types';

interface Props {
  sources: MovieSource[];
  currentId: string;
  onSelect: (source: MovieSource) => void;
}

export function SourceSelector({ sources, currentId, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => (
        <button
          key={source.id}
          onClick={() => onSelect(source)}
          className={clsx(
            'rounded-full border px-3 py-1 text-sm transition',
            currentId === source.id
              ? 'border-primary bg-primary/20 text-primary'
              : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-primary hover:text-primary'
          )}
        >
          {source.label}
        </button>
      ))}
    </div>
  );
}
