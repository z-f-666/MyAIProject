import { NewsProvider } from '@/context/NewsContext'
import NewsList from '@/components/NewsList'
import CategoryFilter from '@/components/CategoryFilter'
import SearchBar from '@/components/SearchBar'
import CountrySelector from '@/components/CountrySelector'

export default function Home() {
  return (
    <NewsProvider>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">今日新闻</h1>
          <p className="text-gray-600">获取最新的新闻资讯，了解世界各地正在发生的事情</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="w-full sm:w-48">
            <CountrySelector />
          </div>
        </div>
        
        <div className="mb-6">
          <CategoryFilter />
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">最新资讯</h2>
          <button className="text-sm text-blue-600 hover:underline">
            刷新新闻
          </button>
        </div>
        
        <NewsList />
      </div>
    </NewsProvider>
  )
}