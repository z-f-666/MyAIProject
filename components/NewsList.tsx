'use client';

import { useNews } from '@/context/NewsContext';
import NewsCard from './NewsCard';

export default function NewsList() {
  const { articles, loading, error, hasMore, loadMore } = useNews();

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  // ✨ 增加了暗色模式适配的骨架屏
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 dark:border-gray-700">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 如果正在加载，且列表是空的，就展示 6 个骨架屏 */}
        {loading && articles.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))
        )}
      </div>

      {/* 底部加载更多按钮 */}
      {articles.length > 0 && (
        <div className="mt-12 flex justify-center">
          {hasMore ? (
            <button
              onClick={loadMore}
              disabled={loading}
              // 修改为使用网站主题色
              className="px-8 py-3 bg-theme-primary text-white font-medium rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
            >
              {loading ? '努力拉取新闻中...' : '加载更多新闻 ↓'}
            </button>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-sm flex items-center gap-2">
              <span>—</span> 到底啦，没有更多新闻了 <span>—</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
