'use client'; // 重点：加上这行，告诉 Next.js 这是一个客户端组件

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { ExternalLink, Clock, User } from 'lucide-react'
import { NewsArticle } from '@/types/news'

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  // 设置一个状态来记录当前图片的 src
  const [imgSrc, setImgSrc] = useState(article.urlToImage || 'https://via.placeholder.com/500x300');

  const publishedTime = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: zhCN,
  })

  return (
    <div className="news-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={imgSrc} // 使用状态里的图片地址
          alt={article.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // 如果图片加载失败，自动替换成占位图！
          onError={() => {
            setImgSrc('https://via.placeholder.com/500x300');
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="font-medium">{article.source.name}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{publishedTime}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between">
          {article.author && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User className="h-3 w-3" />
              <span className="truncate max-w-[120px]">{article.author}</span>
            </div>
          )}
          
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            阅读更多
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}