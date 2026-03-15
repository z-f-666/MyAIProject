'use client'

import { useState, useEffect } from 'react'
import { useNews } from '@/context/NewsContext'
// 👉 引入了几个新的精美小图标
import { Search, X, History, Trash2 } from 'lucide-react'

export default function SearchBar() {
  const { searchQuery, setSearchQuery, searchForNews } = useNews()
  const [localQuery, setLocalQuery] = useState(searchQuery)
  
  // ✨ 魔法 1：准备一个空盒子装历史记录，以及一个控制下拉框显示/隐藏的开关
  const [history, setHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // ✨ 魔法 2：网页刚加载时，去日记本里把历史搜索记录拿出来
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-search-history') || '[]')
    setHistory(saved)
  }, [])

  // ✨ 魔法 3：当你按下回车搜索时，不仅要搜新闻，还要把词写进日记本
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localQuery.trim()) return

    // 把新搜的词放在最前面，并且去掉重复的词，最多只保留 5 条记录
    const newHistory = [localQuery, ...history.filter(h => h !== localQuery)].slice(0, 5)
    setHistory(newHistory)
    localStorage.setItem('my-search-history', JSON.stringify(newHistory))

    setSearchQuery(localQuery)
    searchForNews(localQuery)
    setShowHistory(false) // 搜完就隐藏下拉框
  }

  // ✨ 魔法 4：当你点击历史记录里的词时，直接帮你搜索
  const handleHistoryClick = (item: string) => {
    setLocalQuery(item)
    setSearchQuery(item)
    searchForNews(item)
    setShowHistory(false)
    
    // 把点过的词重新顶到最前面
    const newHistory = [item, ...history.filter(h => h !== item)].slice(0, 5)
    setHistory(newHistory)
    localStorage.setItem('my-search-history', JSON.stringify(newHistory))
  }

  // 清空历史记录
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('my-search-history')
  }

  return (
    <div className="relative w-full z-30">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setShowHistory(true)} // 鼠标点进去就显示历史
          placeholder="搜索你想看的新闻 (如: 机器人, AI)..."
          className="w-full pl-10 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all shadow-sm bg-white"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        
        {/* 有字的时候显示一个清空的小叉叉 */}
        {localQuery && (
          <button
            type="button"
            onClick={() => {
              setLocalQuery('')
              setSearchQuery('')
              searchForNews('')
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* ✨ 悬浮的下拉历史记录面板 */}
      {showHistory && history.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
          onMouseLeave={() => setShowHistory(false)} // 鼠标移出面板就自动收起
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 text-sm">
            <span className="text-gray-500 font-medium">最近搜索</span>
            <button 
              onClick={clearHistory} 
              className="text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> 清空
            </button>
          </div>
          <ul className="py-1">
            {history.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleHistoryClick(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
                >
                  <History className="h-4 w-4 text-gray-400" />
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
