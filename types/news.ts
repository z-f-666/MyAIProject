export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export type NewsCategory = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

export interface NewsCategoryInfo {
  id: NewsCategory;
  name: string;
  description: string;
}