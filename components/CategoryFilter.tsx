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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            category === cat.id
              // 👉 选中时：动态主题色背景，文字纯白
              ? 'bg-theme-primary text-white shadow-md'
              // 👉 未选中时：白天是浅灰背景配深灰字，黑夜是深灰背景配浅白字！
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
          }`}
          title={cat.description}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
