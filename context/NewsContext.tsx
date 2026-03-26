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
        
        // 👉 终极滤网 1：先对刚拿到的这批数据进行“内部按标题去重”（消灭同一批里的双胞胎）
        const incomingUnique = response.articles.filter((article: NewsArticle, index: number, self: NewsArticle[]) =>
          index === self.findIndex((a) => a.title === article.title)
        );

        if (pageNum === 1) {
          setArticles(incomingUnique)
        } else {
          // 👉 终极滤网 2：翻页时，按标题和已有的新闻做对比，绝不放过任何重复（将 url 去重升级为 title 去重）
          setArticles(prev => {
            const existingTitles = new Set(prev.map(article => article.title));
            const uniqueNewArticles = incomingUnique.filter(
              (article: NewsArticle) => !existingTitles.has(article.title)
            );
            return [...prev, ...uniqueNewArticles];
          });
        }
        setPage(pageNum)
        setHasMore(response.articles.length >= 12) 
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
         
         // 👉 搜索结果同样加上终极标题滤网
         const incomingUnique = response.articles.filter((article: NewsArticle, index: number, self: NewsArticle[]) =>
           index === self.findIndex((a) => a.title === article.title)
         );

         if (pageNum === 1) {
           setArticles(incomingUnique)
         } else {
           setArticles(prev => {
             const existingTitles = new Set(prev.map(article => article.title));
             const uniqueNewArticles = incomingUnique.filter(
               (article: NewsArticle) => !existingTitles.has(article.title)
             );
             return [...prev, ...uniqueNewArticles];
           });
         }
         setPage(pageNum)
         setHasMore(response.articles.length >= 12)
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
