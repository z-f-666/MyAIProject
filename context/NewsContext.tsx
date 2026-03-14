'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { NewsArticle, NewsCategory } from '@/types/news'
import { getNews, searchNews } from '@/lib/newsApi'

interface NewsContextType {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  category: NewsCategory;
  searchQuery: string;
  country: string;
  hasMore: boolean;
  setCategory: (category: NewsCategory) => void;
  setSearchQuery: (query: string) => void;
  setCountry: (country: string) => void;
  refreshNews: () => void;
  searchForNews: (query: string) => void;
  loadMore: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<NewsCategory>('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [country, setCountry] = useState('us')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchNews = async (newsCategory: NewsCategory = category, newsCountry: string = country, pageNum: number = 1) => {
    setLoading(true)
    if (pageNum === 1) setError(null)
    
    try {
      const response = await getNews(newsCategory, newsCountry, pageNum)
      if (response && response.articles) {
        if (pageNum === 1) {
          setArticles(response.articles)
        } else {
          // 👉 增加去重逻辑：过滤掉 URL 已经存在的新闻
          setArticles(prev => {
            const existingUrls = new Set(prev.map(article => article.url));
            const uniqueNewArticles = response.articles.filter(
              (article: NewsArticle) => !existingUrls.has(article.url)
            );
            return [...prev, ...uniqueNewArticles];
          });
        }
        setPage(pageNum)
        // GNews 免费版一次给 10 条，如果拿到了 10 条说明可能还有
        setHasMore(response.articles.length >= 10) 
      } else {
        if (pageNum === 1) setArticles([])
        setHasMore(false)
      }
    } catch (err) {
      setError('获取新闻失败')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const searchForNews = async (query: string, pageNum: number = 1) => {
    if (!query.trim()) {
      fetchNews(category, country, 1)
      return
    }
    
    setLoading(true)
    if (pageNum === 1) setError(null)
    
    try {
      const response = await searchNews(query, pageNum)
      if (response && response.articles) {
         if (pageNum === 1) {
           setArticles(response.articles)
         } else {
           // 👉 增加去重逻辑：过滤掉 URL 已经存在的新闻
           setArticles(prev => {
             const existingUrls = new Set(prev.map(article => article.url));
             const uniqueNewArticles = response.articles.filter(
               (article: NewsArticle) => !existingUrls.has(article.url)
             );
             return [...prev, ...uniqueNewArticles];
           });
         }
         setPage(pageNum)
         setHasMore(response.articles.length >= 10)
      } else {
         if (pageNum === 1) setArticles([])
         setHasMore(false)
      }
    } catch (err) {
      setError('搜索失败')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    const nextPage = page + 1
    if (searchQuery) {
      searchForNews(searchQuery, nextPage)
    } else {
      fetchNews(category, country, nextPage)
    }
  }

  const refreshNews = () => {
    setPage(1)
    setHasMore(true)
    if (searchQuery) {
      searchForNews(searchQuery, 1)
    } else {
      fetchNews(category, country, 1)
    }
  }

  useEffect(() => {
    if (!searchQuery) {
      fetchNews(category, country, 1)
    }
  }, [category, country])

  return (
    <NewsContext.Provider
      value={{
        articles, loading, error, category, searchQuery, country, hasMore,
        setCategory, setSearchQuery, setCountry, refreshNews, searchForNews, loadMore
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}
