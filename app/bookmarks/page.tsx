'use client'

import { useEffect, useState } from 'react'
import NewsCard from '@/components/NewsCard'
import { NewsArticle } from '@/types/news'
import Link from 'next/link'

export default function BookmarksPage() {
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-bookmarks') || '[]')
    setSavedArticles(saved) 
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部导航 */}
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
          ← 返回首页
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">⭐ 我的收藏夹</h1>
      </div>

      {/* 如果没有收藏 */}
      {savedArticles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-10">
          <p className="text-gray-500 text-lg mb-6">主人，你的收藏夹还是空空如也哦，快去点亮一些小星星吧~</p>
          <Link 
            href="/" 
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:opacity-80 transition-opacity shadow-md"
          >
            去发现好新闻
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}