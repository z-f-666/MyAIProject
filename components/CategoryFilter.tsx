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
          className={`category-badge px-4 py-2 rounded-full text-sm font-medium transition-all ${
            category === cat.id
              // 选中时：背景变为动态主题色，文字强制变白确保能看清
              ? 'bg-theme-primary text-white shadow-md'
              // 未选中时：背景变为当前颜色的 10% 透明度，文字 80% 透明度
              : 'opacity-80 hover:opacity-100'
          }`}
          style={category !== cat.id ? { backgroundColor: 'color-mix(in srgb, currentColor 10%, transparent)' } : {}}
          title={cat.description}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
