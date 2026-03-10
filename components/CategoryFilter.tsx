'use client'

import { useNews } from '@/context/NewsContext'
import { NewsCategory, NewsCategoryInfo } from '@/types/news'

const categories: NewsCategoryInfo[] = [
  { id: 'general', name: '综合', description: '一般新闻和时事' },
  { id: 'business', name: '商业', description: '商业、金融和经济新闻' },
  { id: 'entertainment', name: '娱乐', description: '娱乐新闻和名人八卦' },
  { id: 'health', name: '健康', description: '健康和医疗新闻' },
  { id: 'science', name: '科学', description: '科学和技术新闻' },
  { id: 'sports', name: '体育', description: '体育新闻和赛事' },
  { id: 'technology', name: '科技', description: '科技新闻和产品' },
]

export default function CategoryFilter() {
  const { category, setCategory } = useNews()

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`category-badge px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === cat.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={cat.description}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}