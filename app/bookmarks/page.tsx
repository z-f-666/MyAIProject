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

  // ✨ 新增：导出收藏为 TXT 文件的函数
  const exportBookmarksToTxt = () => {
    if (savedArticles.length === 0) {
      alert('现在还没有收藏任何新闻，没法导出哦！');
      return;
    }

    // 拼装文本内容
    let textContent = '=== 我的专属新闻收藏 ===\n\n';
    
    savedArticles.forEach((article, index) => {
      textContent += `【${index + 1}】 ${article.title || '无标题'}\n`;
      if (article.description) {
        textContent += `摘要: ${article.description}\n`;
      }
      textContent += `链接: ${article.url || '无链接'}\n`;
      textContent += '-------------------------\n\n';
    });

    // 生成并下载文件
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '我的新闻收藏.txt'; 
    document.body.appendChild(link);
    link.click();
    
    // 清理临时链接
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部导航与操作区 */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 border-b border-current border-opacity-10 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-theme-primary transition-colors">
            ← 返回首页
          </Link>
          {/* 增加了暗黑模式的文字颜色适配 */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
            ⭐ 我的收藏夹
          </h1>
        </div>

        {/* ✨ 新增：导出按钮（只有当收藏夹里有新闻时才显示） */}
        {savedArticles.length > 0 && (
          <button
            onClick={exportBookmarksToTxt}
            className="px-5 py-2 bg-theme-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            导出为 TXT
          </button>
        )}
      </div>

      {/* 如果没有收藏 */}
      {savedArticles.length === 0 ? (
        // 增加了暗黑模式的背景和边框适配
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 mt-10 transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">你的收藏夹还是空空如也哦，快去点亮一些小星星吧~</p>
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
