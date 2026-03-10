'use client'

import { useNews } from '@/context/NewsContext'
import NewsCard from './NewsCard'

export default function NewsList() {
  const { articles, loading, error, hasMore, loadMore } = useNews()

  // 只有在第一页并且还在加载时，才显示全屏的加载提示
  if (loading && articles.length === 0) {
    return <div className="text-center py-20 text-gray-500">正在努力获取最新资讯...</div>
  }

  if (error && articles.length === 0) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  if (articles.length === 0) {
    return <div className="text-center py-20 text-gray-500">暂无新闻数据</div>
  }

  return (
    <div className="flex flex-col items-center pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {articles.map((article, index) => (
          // 使用 url + index 作为唯一的 key，防止 React 报错
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>

      {/* 🌍 这里的按钮就是我们的加载更多魔法！ */}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 hover:shadow-lg disabled:bg-blue-300 transition-all duration-300"
        >
          {loading ? '努力搬运中...' : '加载更多新闻'}
        </button>
      )}

      {!hasMore && articles.length > 0 && (
        <p className="mt-10 text-gray-400 text-sm">主人，已经到底啦，没有更多新闻了哦~</p>
      )}
    </div>
  )
}