'use client';

import { useState, useEffect, MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
// ✨ 引入了 Star (星星) 图标
import { ArrowRight, Clock, User, Star } from 'lucide-react' 
import { NewsArticle } from '@/types/news'

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [imgSrc, setImgSrc] = useState(article.urlToImage || 'https://via.placeholder.com/500x300');
  
  // ✨ 收藏功能：记忆开关
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 网页加载时，翻日记本看看这篇新闻有没有被收藏过
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-bookmarks') || '[]');
    if (saved.some((a: NewsArticle) => a.id === article.id)) {
      setIsBookmarked(true);
    }
  }, [article.id]);

  // 点击星星时的动作：存入或移除收藏
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // 极其重要：防止点星星时触发了页面跳转！
    const saved = JSON.parse(localStorage.getItem('my-bookmarks') || '[]');

    if (isBookmarked) {
      const next = saved.filter((a: NewsArticle) => a.id !== article.id);
      localStorage.setItem('my-bookmarks', JSON.stringify(next));
      setIsBookmarked(false);
    } else {
      saved.push(article);
      localStorage.setItem('my-bookmarks', JSON.stringify(saved));
      setIsBookmarked(true);
    }
  };

  // ✨ 3D 悬浮物理动效的核心计算
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // 上下最大倾斜 8 度
    const rotateY = ((x - centerX) / centerX) * 8;  // 左右最大倾斜 8 度

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const publishedTime = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: zhCN,
  });

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative news-card bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 ease-out border border-gray-100 hover:shadow-2xl hover:z-10 flex flex-col"
      style={{ transformStyle: 'preserve-3d' }} // 开启 3D 渲染空间
    >
      {/* ✨ 收藏星星按钮：绝对定位在右上方 */}
      <button
        onClick={toggleBookmark}
        title={isBookmarked ? "取消收藏" : "加入收藏"}
        className="absolute top-3 right-3 z-20 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full transition-all duration-300"
      >
        <Star
          className={`h-4 w-4 transition-all duration-300 ${
            isBookmarked ? 'fill-yellow-400 text-yellow-400 scale-110 drop-shadow-md' : 'text-white'
          }`}
        />
      </button>

      <div className="relative h-48 pointer-events-none">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc('https://via.placeholder.com/500x300')}
        />
      </div>

      <div className="p-5 flex-grow pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {article.source.name}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{publishedTime}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-snug">
          {article.title}
        </h3>

        <p className="text-sm line-clamp-3 text-gray-600 leading-relaxed">
          {article.description}
        </p>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between mt-auto">
        {article.author ? (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <User className="h-3 w-3" />
            <span className="truncate max-w-[120px]">{article.author}</span>
          </div>
        ) : <div />}

        {/* 去阅读更多 */}
        <Link
          href={`/news/${article.id}`}
          className="flex items-center gap-1 text-sm text-theme-primary font-medium hover:opacity-70 transition-opacity"
        >
          阅读更多
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
