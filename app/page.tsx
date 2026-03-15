import NewsList from '@/components/NewsList'
import CategoryFilter from '@/components/CategoryFilter'
import SearchBar from '@/components/SearchBar'
import CountrySelector from '@/components/CountrySelector'
import ColorController from '@/components/ColorController' 

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">今日新闻</h1>
          <p className="opacity-80">获取最新的新闻资讯，了解世界各地正在发生的事情</p>
          
          {/* 👉 这是我们新加的传送门！ */}
          <a href="/bookmarks" className="inline-block mt-4 text-yellow-500 font-bold hover:text-yellow-600 transition-colors">
            ⭐ 查看我的收藏夹 →
          </a>
        </div>
        
        <ColorController />
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
        <h2 className="text-xl font-semibold">最新资讯</h2>
        <button className="text-sm text-blue-600 hover:opacity-80 transition-opacity">
          刷新新闻
        </button>
      </div>
      
      <NewsList />
    </div>
  )
}
