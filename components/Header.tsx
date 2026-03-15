'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Newspaper, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNews } from '@/context/NewsContext'
import { NewsCategory, NewsCategoryInfo } from '@/types/news'

// 为了方便，直接把分类数据放在这里。
// （以后如果有需要，也可以把它抽离到一个单独的 constants.ts 文件里供多处使用）
const categories: NewsCategoryInfo[] = [
  { id: 'general', name: '综合', description: '一般新闻和时事' },
  { id: 'business', name: '商业', description: '商业、金融和经济新闻' },
  { id: 'entertainment', name: '娱乐', description: '娱乐新闻和名人八卦' },
  { id: 'health', name: '健康', description: '健康和医疗新闻' },
  { id: 'science', name: '科学', description: '科学和技术新闻' },
  { id: 'sports', name: '体育', description: '体育新闻和赛事' },
  { id: 'technology', name: '科技', description: '科技新闻和产品' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false) // 控制分类下拉菜单
  
  const router = useRouter()
  const { setCategory } = useNews() // 引入你写好的 Context

  // 点击分类时的处理逻辑
  const handleCategoryClick = (categoryId: NewsCategory) => {
    setCategory(categoryId) // 更新全局分类状态
    setIsCategoryOpen(false) // 收起下拉菜单
    setIsMenuOpen(false)     // 收起移动端菜单（如果在手机上）
    router.push('/')         // 确保跳转回首页看新闻
  }

  return (
    <header className="border-b border-current border-opacity-10 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-theme-primary" />
            <span className="text-xl font-bold">今日新闻</span>
          </Link>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors">
              首页
            </Link>
            
            {/* 分类下拉菜单容器 */}
            <div className="relative">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-1 opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors focus:outline-none"
              >
                <span>分类</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 桌面端下拉浮层 */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-4 w-40 bg-white dark:bg-gray-800 border border-current border-opacity-10 rounded-lg shadow-lg py-2 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="block w-full text-left px-4 py-2 text-sm opacity-80 hover:opacity-100 hover:bg-theme-primary hover:text-white transition-colors"
                      title={cat.description}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors">
              关于
            </Link>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden opacity-80 hover:opacity-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* 移动端下拉面板 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-current border-opacity-10 pt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors py-2">
                首页
              </Link>
              
              {/* 移动端分类展开 */}
              <div className="py-2">
                <button 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors focus:outline-none"
                >
                  <span>分类</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryOpen && (
                  <div className="mt-2 pl-4 flex flex-col space-y-2 border-l-2 border-current border-opacity-10">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="text-left text-sm opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors py-1"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors py-2">
                关于
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
