import { NewsProvider } from '@/context/NewsContext'
import NewsList from '@/components/NewsList'
import CategoryFilter from '@/components/CategoryFilter'
import SearchBar from '@/components/SearchBar'
import CountrySelector from '@/components/CountrySelector'
import ColorController from '@/components/ColorController' // 👉 引入调色盘组件

export default function Home() {
  return (
    <NewsProvider>
      <div className="container mx-auto px-4 py-6">
        
        {/* 👉 顶部标题区与调色盘布局 */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {/* 移除了固定的灰黑色，让文字跟随调色盘变化 */}
            <h1 className="text-3xl font-bold mb-2">今日新闻</h1>
            <p className="opacity-80">获取最新的新闻资讯，了解世界各地正在发生的事情</p>
          </div>
          
          {/* 👉 调色盘显示在这里 */}
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
          {/* 👉 绑定了动态主题色 */}
          <button className="text-sm text-theme-primary hover:opacity-80 transition-opacity">
            刷新新闻
          </button>
        </div>
        
        <NewsList />
      </div>
    </NewsProvider>
  )
}
