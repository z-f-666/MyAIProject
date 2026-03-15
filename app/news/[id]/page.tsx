'use client'

import { useNews } from '@/context/NewsContext'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NewsArticle } from '@/types/news'

export default function NewsDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { articles } = useNews()
  const [article, setArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    // 根据 URL 里的 id，安全查找新闻
    if (id && articles.length > 0) {
      const foundArticle = articles.find((a) => a.id === id)
      if (foundArticle) {
        setArticle(foundArticle)
      }
    }
  }, [id, articles])

  // 回退 UI：没找到数据时
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-6 text-lg">主人，这篇新闻的记忆被风吹走啦（或者页面被刷新了）~</p>
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
        >
          返回首页继续探索
        </button>
      </div>
    )
  }

  // 👉 安全的时间格式化逻辑，用 try-catch 包裹防止抛出异常崩溃
  let publishDate = '未知时间'
  try {
    if (article.publishedAt) {
      publishDate = new Date(article.publishedAt).toLocaleString('zh-CN', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    }
  } catch (error) {
    console.error('时间解析失败:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* 顶部导航 */}
      <button 
        onClick={() => router.back()}
        className="mb-8 text-gray-500 hover:text-gray-800 flex items-center gap-2 transition-colors"
      >
        <span>←</span> 返回新闻列表
      </button>

      {/* 极简排版的正文区域 */}
      <article className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {/* 👉 安全读取标题 */}
          {article?.title || '无标题'}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-6">
          <span className="font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {/* 👉 安全读取来源名字，防止 article.source 为 null */}
            {article?.source?.name || '未知来源'}
          </span>
          <span>{publishDate}</span>
        </div>

        {/* 👉 安全读取图片 */}
        {article?.urlToImage && article.urlToImage !== 'https://via.placeholder.com/500x300?text=No+Image' && (
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-xl overflow-hidden">
            <img 
              src={article.urlToImage} 
              alt={article?.title || '新闻图片'}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {/* 👉 安全读取概要和内容 */}
          <p className="text-xl font-medium mb-6 text-gray-800">
            {article?.description || '暂无概要'}
          </p>
          <p>
            {article?.content || '暂无详细内容...'}
          </p>
        </div>

        {/* 底部保留跳出原网页的通道 */}
        {article?.url && (
          <div className="mt-12 pt-8 border-t flex justify-center">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium"
            >
              去原网站阅读全文 ↗
            </a>
          </div>
        )}
      </article>
    </div>
  )
}
