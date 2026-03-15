'use client'

import Link from 'next/link'
import { Newspaper, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // 👉 关键修复：加了 dark:text-white
    <header className="border-b border-current border-opacity-10 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-theme-primary" />
            <span className="text-xl font-bold">今日新闻</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors">
              首页
            </Link>
            <Link href="/categories" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors">
              分类
            </Link>
            <Link href="/about" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors">
              关于
            </Link>
          </nav>
          
          <button 
            className="md:hidden opacity-80 hover:opacity-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-current border-opacity-10 pt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors py-2">
                首页
              </Link>
              <Link href="/categories" className="opacity-80 hover:opacity-100 hover:text-theme-primary transition-colors py-2">
                分类
              </Link>
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
