import axios from 'axios';
import { Genre, MovieDetail, MovieSummary, PagedResult } from '../types';

export interface HighlightsResponse {
  hits: MovieSummary[];
  newest: MovieSummary[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api'
});

export interface MovieQueryParams {
  q?: string;
  genre?: number;
  year?: number;
  sort?: 'popularity' | 'rating' | 'date';
  page?: number;
  pageSize?: number;
}

export const moviesApi = {
  async list(params: MovieQueryParams) {
    const { data } = await api.get<PagedResult<MovieSummary>>('/movies', { params });
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<MovieDetail>(`/movies/${id}`);
    return data;
  },
  async view(id: string) {
    await api.post(`/movies/${id}/view`);
  },
  async vote(id: string, value: 1 | -1, fingerprint: string) {
    const { data } = await api.post<{ score: number; avgRating: number }>(`/movies/${id}/vote`, {
      value,
      fingerprint
    });
    return data;
  },
  async highlights() {
    const { data } = await api.get<HighlightsResponse>('/highlights');
    return data;
  }
};

export const genresApi = {
  async list() {
    const { data } = await api.get<Genre[]>('/genres');
    return data;
  }
};

export interface AdminMoviePayload {
  title: string;
  year: number;
  description?: string;
  posterUrl?: string;
  country?: string;
  durationMinutes?: number;
  genres: number[];
}

export interface AdminSourcePayload {
  kind: 'Hls' | 'Mp4' | 'Embed';
  label: string;
  url: string;
  sortOrder: number;
}

const adminHeaders = (token: string) => ({
  headers: {
    'X-Admin-Token': token
  }
});

export const adminApi = {
  async createMovie(payload: AdminMoviePayload, token: string) {
    const { data } = await api.post<{ id: string }>(
      '/admin/movies',
      payload,
      adminHeaders(token)
    );
    return data;
  },
  async updateMovie(id: string, payload: AdminMoviePayload, token: string) {
    await api.put(`/admin/movies/${id}`, payload, adminHeaders(token));
  },
  async deleteMovie(id: string, token: string) {
    await api.delete(`/admin/movies/${id}`, adminHeaders(token));
  },
  async addSource(id: string, payload: AdminSourcePayload, token: string) {
    await api.post(`/admin/movies/${id}/sources`, payload, adminHeaders(token));
  },
  async updateSource(id: string, payload: AdminSourcePayload, token: string) {
    await api.put(`/admin/sources/${id}`, payload, adminHeaders(token));
  },
  async deleteSource(id: string, token: string) {
    await api.delete(`/admin/sources/${id}`, adminHeaders(token));
  },
  async createGenre(name: string, token: string) {
    await api.post('/admin/genres', { name }, adminHeaders(token));
  },
  async deleteGenre(id: number, token: string) {
    await api.delete(`/admin/genres/${id}`, adminHeaders(token));
  },
  async seed(token: string) {
    await api.post('/admin/seed', {}, adminHeaders(token));
  }
};
