import { Newspaper } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh]">
      <div className="flex items-center gap-3 mb-8">
        <Newspaper className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">关于我们</h1>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 leading-relaxed text-gray-700 space-y-6 text-lg">
        <p>
          欢迎来到<strong>今日新闻</strong>！这是一个专注、纯粹的全球资讯聚合平台。
        </p>
        <p>
          作为一名在底层硬件网络与前端页面之间不断折腾的探索者，我深知获取一手、无障碍资讯的重要性。从调试复杂的机器人传感器，到打磨每一个网页组件，寻找真实准确的信息永远是解决问题的第一步。
        </p>
        <p>
          建立这个网站的初衷，正是为了打破信息获取的繁琐步骤。通过实时对接全球顶尖的新闻数据源，我希望为你提供一个干净、无干扰的阅读环境，让你能一站式跨越地域限制，倾听世界的声音。
        </p>
        
        <div className="pt-8 mt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            — 由 <span className="font-semibold text-gray-700">z-f-666</span> 独立开发与维护
          </p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}