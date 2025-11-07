export interface MovieSummary {
  id: string;
  title: string;
  year: number;
  posterUrl?: string | null;
  score: number;
  avgRating: number;
}

export interface MovieSource {
  id: string;
  kind: 'Hls' | 'Mp4' | 'Embed';
  label: string;
  url: string;
  sortOrder: number;
}

export interface MovieDetail extends MovieSummary {
  description?: string | null;
  country?: string | null;
  durationMinutes?: number | null;
  views: number;
  genres: string[];
  sources: MovieSource[];
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Genre {
  id: number;
  name: string;
}
