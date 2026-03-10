import Link from 'next/link'
import { Newspaper, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">今日新闻</span>
            </div>
            <p className="text-gray-600 text-sm">
              为您提供最新、最全面的新闻资讯，让您随时了解世界各地正在发生的事情。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  首页
                </Link>
              </li>
              <li>
                {/* 新闻分类留空，点击不跳转 */}
                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  新闻分类
                </Link>
              </li>
              <li>
                {/* 准确跳转到关于我们页面 */}
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              {/* 专属 GitHub 链接，新标签页打开 */}
              <a href="https://github.com/z-f-666" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 今日新闻. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}