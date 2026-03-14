import Link from 'next/link'
import { Newspaper, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-current border-opacity-10 mt-12 opacity-90">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="h-6 w-6 text-theme-primary" />
              <span className="text-lg font-bold">今日新闻</span>
            </div>
            <p className="opacity-70 text-sm">
              为您提供最新、最全面的新闻资讯，让您随时了解世界各地正在发生的事情。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="opacity-70 hover:opacity-100 hover:text-theme-primary text-sm transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-70 hover:opacity-100 hover:text-theme-primary text-sm transition-colors">
                  新闻分类
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-70 hover:opacity-100 hover:text-theme-primary text-sm transition-colors">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="opacity-70 hover:opacity-100 hover:text-theme-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/z-f-666" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-theme-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-current border-opacity-10 mt-8 pt-8 text-center">
          <p className="opacity-50 text-sm">
            © {new Date().getFullYear()} 今日新闻. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}
