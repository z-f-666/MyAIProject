'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react' // 👉 新引入了月亮和太阳图标

export default function ColorController() {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  
  // ✨ 魔法 1：新增深色模式的记忆状态
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    const savedBg = localStorage.getItem('my-theme-bg');
    const savedPrimary = localStorage.getItem('my-theme-primary');
    // 去日记本里看看上次是不是开了黑夜模式
    const savedDark = localStorage.getItem('my-theme-dark') === 'true';
    
    if (savedBg) {
      setBgColor(savedBg);
      document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    }
    if (savedPrimary) {
      setPrimaryColor(savedPrimary);
      document.documentElement.style.setProperty('--dynamic-primary', savedPrimary);
    }
    
    // 如果上次是黑夜，网页一加载就立刻拉下夜幕
    if (savedDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    setIsLoaded(true); 
  }, []);

  useEffect(() => {
    if (!isLoaded) return; 
    document.documentElement.style.setProperty('--dynamic-bg', bgColor);
    localStorage.setItem('my-theme-bg', bgColor);
  }, [bgColor, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return; 
    document.documentElement.style.setProperty('--dynamic-primary', primaryColor);
    localStorage.setItem('my-theme-primary', primaryColor);
  }, [primaryColor, isLoaded]);

  // ✨ 魔法 2：切换日月的核心功能
  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('my-theme-dark', String(newDark)); // 记入日记本
    
    // 给网页的最外层套上/脱下 'dark' 的隐身衣
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 防止没读完日记时图标闪烁
  if (!isLoaded) return null;

  return (
    <div className="p-4 m-4 border border-gray-200 rounded-xl bg-white shadow-lg inline-block transition-colors duration-300">
      <div className="flex justify-between items-center mb-4 gap-8">
        <h3 className="text-lg font-bold text-gray-800">🎨 网页调色盘</h3>
        
        {/* ✨ 魔法 3：极简的日/月切换按钮 */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isDark ? "切换到白天模式" : "切换到黑夜模式"}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span>网页大背景：</span>
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => setBgColor(e.target.value)} 
            className="w-10 h-10 cursor-pointer border-0 p-0 rounded-md"
          />
        </label>

        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span>按钮主题色：</span>
          <input 
            type="color" 
            value={primaryColor} 
            onChange={(e) => setPrimaryColor(e.target.value)} 
            className="w-10 h-10 cursor-pointer border-0 p-0 rounded-md"
          />
        </label>
      </div>
    </div>
  )
}
