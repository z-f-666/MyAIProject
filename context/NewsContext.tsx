'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { NewsArticle, NewsCategory, NewsResponse } from '@/types/news'
import { getNews, searchNews } from '@/lib/newsApi'

interface NewsContextType {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  category: NewsCategory;
  searchQuery: string;
  country: string;
  hasMore: boolean; // 🌍 新增：判断是否还有下一页
  setCategory: (category: NewsCategory) => void;
  setSearchQuery: (query: string) => void;
  setCountry: (country: string) => void;
  refreshNews: () => void;
  searchForNews: (query: string) => void;
  loadMore: () => void; // 🌍 新增：加载下一页的方法
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<NewsCategory>('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [country, setCountry] = useState('us')
  const [page, setPage] = useState(1) // 🌍 新增：记录当前页码
  const [hasMore, setHasMore] = useState(true)

  // 🌍 接收 pageNum 参数，默认为第一页
  const fetchNews = async (newsCategory: NewsCategory = category, newsCountry: string = country, pageNum: number = 1) => {
    setLoading(true)
    if (pageNum === 1) setError(null) // 只有第一页才清空报错
    
    try {
      const response = await getNews(newsCategory, newsCountry, pageNum) as NewsResponse
      if (response && response.articles && response.articles.length > 0) {
        // 如果是第一页，直接替换；如果是后面的页，就拼接到旧数据后面
        if (pageNum === 1) {
          setArticles(response.articles)
        } else {
          setArticles(prev => [...prev, ...response.articles])
        }
        setPage(pageNum)
        // 假设每次返回少于 10 条说明到底了（因为我们的 mock 是 5 条，API 默认 20 条）
        setHasMore(response.articles.length >= 5) 
      } else {
        if (pageNum === 1) setArticles([])
        setHasMore(false) // 没拿到数据，说明到底啦
      }
    } catch (err) {
      setError('获取新闻失败，请稍后再试')
      console.error('获取新闻失败:', err)
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
      const response = await searchNews(query, pageNum) as NewsResponse
      if (response && response.articles && response.articles.length > 0) {
         if (pageNum === 1) {
           setArticles(response.articles)
         } else {
           setArticles(prev => [...prev, ...response.articles])
         }
         setPage(pageNum)
         setHasMore(response.articles.length >= 5)
      } else {
         if (pageNum === 1) setArticles([])
         setHasMore(false)
      }
    } catch (err) {
      setError('搜索失败，请稍后再试')
      console.error('搜索失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 🌍 新增：点击“加载更多”时触发这个函数
  const loadMore = () => {
    const nextPage = page + 1
    if (searchQuery) {
      searchForNews(searchQuery, nextPage)
    } else {
      fetchNews(category, country, nextPage)
    }
  }

  const refreshNews = () => {
    setPage(1) // 刷新时重置到第一页
    setHasMore(true)
    if (searchQuery) {
      searchForNews(searchQuery, 1)
    } else {
      fetchNews(category, country, 1)
    }
  }

  useEffect(() => {
    if (!searchQuery) {
      setPage(1)
      setHasMore(true)
      fetchNews(category, country, 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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