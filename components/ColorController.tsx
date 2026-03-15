'use client'

import { useState, useEffect } from 'react'

export default function ColorController() {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  
  // 加一个“是否已经读过日记”的标记，防止一加载就把白颜色存进去覆盖了之前的记录
  const [isLoaded, setIsLoaded] = useState(false); 

  // 1. 网页刚一加载，赶紧去日记本（localStorage）里找上次存的颜色！
  useEffect(() => {
    const savedBg = localStorage.getItem('my-theme-bg');
    const savedPrimary = localStorage.getItem('my-theme-primary');
    
    // 如果日记本里有记录，就提取出来并应用
    if (savedBg) {
      setBgColor(savedBg);
      document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    }
    if (savedPrimary) {
      setPrimaryColor(savedPrimary);
      document.documentElement.style.setProperty('--dynamic-primary', savedPrimary);
    }
    
    setIsLoaded(true); // 标记：日记本已经读完啦！
  }, []);

  // 2. 监听背景色：如果你选了新颜色，立马应用并写进日记本
  useEffect(() => {
    if (!isLoaded) return; // 如果还没读完日记，先别执行，防止误覆盖
    document.documentElement.style.setProperty('--dynamic-bg', bgColor);
    localStorage.setItem('my-theme-bg', bgColor);
  }, [bgColor, isLoaded]);

  // 3. 监听主题色：如果你选了新颜色，立马应用并写进日记本
  useEffect(() => {
    if (!isLoaded) return; 
    document.documentElement.style.setProperty('--dynamic-primary', primaryColor);
    localStorage.setItem('my-theme-primary', primaryColor);
  }, [primaryColor, isLoaded]);

  return (
    <div className="p-4 m-4 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-lg inline-block">
      <h3 className="text-lg font-bold mb-4 text-gray-800">🎨 网页实时调色盘</h3>
      
      <div className="flex flex-col gap-4">
        {/* 背景色吸管 */}
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span>网页大背景：</span>
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => setBgColor(e.target.value)} 
            className="w-10 h-10 cursor-pointer border-0 p-0 rounded-md"
          />
          <span className="text-sm text-gray-500 uppercase">{bgColor}</span>
        </label>

        {/* 主题色吸管 */}
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span>按钮主题色：</span>
          <input 
            type="color" 
            value={primaryColor} 
            onChange={(e) => setPrimaryColor(e.target.value)} 
            className="w-10 h-10 cursor-pointer border-0 p-0 rounded-md"
          />
          <span className="text-sm text-gray-500 uppercase">{primaryColor}</span>
        </label>
      </div>
    </div>
  )
}
