'use client'

import { useEffect, useState } from 'react'
import NewsCard from '@/components/NewsCard'
import { NewsArticle } from '@/types/news'
import Link from 'next/link'

export default function BookmarksPage() {
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    // 1. 去日记本里拿新闻
    const saved = JSON.parse(localStorage.getItem('my-bookmarks') || '[]')
    setSavedArticles(saved) 

    // 2. 🌟 关键修复：让收藏夹也去读一下“颜色日记”！
    const savedBg = localStorage.getItem('my-theme-bg');
    const savedPrimary = localStorage.getItem('my-theme-primary');
    if (savedBg) {
      document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    }
    if (savedPrimary) {
      document.documentElement.style.setProperty('--dynamic-primary', savedPrimary);
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部导航 */}
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        {/* 👉 修复：把原本的 hover:text-blue-600 换成了 hover:text-theme-primary */}
        <Link href="/" className="text-gray-500 hover:text-theme-primary transition-colors">
          ← 返回首页
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">⭐ 我的收藏夹</h1>
      </div>

      {/* 如果没有收藏 */}
      {savedArticles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-10">
          <p className="text-gray-500 text-lg mb-6">主人，你的收藏夹还是空空如也哦，快去点亮一些小星星吧~</p>
          {/* 👉 修复：把原本的 bg-blue-600 换成了 bg-theme-primary */}
          <Link 
            href="/" 
            className="px-8 py-3 bg-theme-primary text-white font-medium rounded-full hover:opacity-80 transition-opacity shadow-md"
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
