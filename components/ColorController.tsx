'use client'

import { useState, useEffect } from 'react'

export default function ColorController() {
  // 1. 准备两个“记忆盒子”，记住你选的颜色 (默认给个白色和蓝色)
  const [bgColor, setBgColor] = useState('#ffffff');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');

  // 2. 网页加载完后，实时监听背景颜色的变化，并强行改写网页的 CSS
  useEffect(() => {
    // 这句话的意思是：找到网页的最根部 (html 标签)，把它的背景色强行改成你选的颜色！
    document.documentElement.style.setProperty('--dynamic-bg', bgColor);
  }, [bgColor]);

  // 实时监听主题色的变化
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-primary', primaryColor);
  }, [primaryColor]);

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
            className="w-10 h-10 cursor-pointer border-0 p-0"
          />
          <span className="text-sm text-gray-500">{bgColor}</span>
        </label>

        {/* 主题色吸管 */}
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span>按钮主题色：</span>
          <input 
            type="color" 
            value={primaryColor} 
            onChange={(e) => setPrimaryColor(e.target.value)} 
            className="w-10 h-10 cursor-pointer border-0 p-0"
          />
          <span className="text-sm text-gray-500">{primaryColor}</span>
        </label>
      </div>
    </div>
  )
}
