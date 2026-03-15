import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '今日新闻 - 专属离线版',
    short_name: '今日新闻',
    description: '你的专属离线新闻阅读神器',
    start_url: '/',
    display: 'standalone', // 这个属性让 App 全屏运行，隐藏浏览器地址栏
    background_color: '#ffffff',
    theme_color: '#3b82f6', 
    icons: [
      {
        src: '/icon-192x192.png', 
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}