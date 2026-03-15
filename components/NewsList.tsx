'use client';

import { useNews } from '@/context/NewsContext';
import NewsCard from './NewsCard';

export default function NewsList() {
  const { articles, loading, error, hasMore, loadMore } = useNews();

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  // ✨ 神级优化：骨架屏组件 (带有 animate-pulse 呼吸灯动效)
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-full mb-2"></div>
        <div className="h-6 bg-gray-200 rounded-md w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
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
              className="px-8 py-3 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? '努力拉取新闻中...' : '加载更多新闻 ↓'}
            </button>
          ) : (
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span>—</span> 主人，到底啦，没有更多新闻了 <span>—</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
