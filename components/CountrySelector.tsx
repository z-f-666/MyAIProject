'use client'

import { Globe } from 'lucide-react'
import { useNews } from '@/context/NewsContext'

export default function CountrySelector() {
  const { country, setCountry } = useNews()

  const countries = [
    { code: 'us', name: '🇺🇸 美国' },
    { code: 'gb', name: '🇬🇧 英国' },
    { code: 'jp', name: '🇯🇵 日本' },
    { code: 'fr', name: '🇫🇷 法国' },
    { code: 'ru', name: '🇷🇺 俄罗斯' },
  ]

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-full"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  )
}