'use client'; 

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
  const [imgSrc, setImgSrc] = useState(article.urlToImage || 'https://via.placeholder.com/500x300');

  const publishedTime = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: zhCN,
  })

  return (
    <div className="news-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-current border-opacity-10">
      <div className="relative h-48">
        <Image
          src={imgSrc} 
          alt={article.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => {
            setImgSrc('https://via.placeholder.com/500x300');
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm opacity-60 mb-2">
          <span className="font-medium">{article.source.name}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{publishedTime}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-theme-primary transition-colors">
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-sm mb-4 line-clamp-3 opacity-80">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between">
          {article.author && (
            <div className="flex items-center gap-1 text-sm opacity-60">
              <User className="h-3 w-3" />
              <span className="truncate max-w-[120px]">{article.author}</span>
            </div>
          )}
          
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-theme-primary hover:opacity-70 transition-opacity"
          >
            阅读更多
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
