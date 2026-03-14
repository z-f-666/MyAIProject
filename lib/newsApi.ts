'use server'

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const USE_REAL_API = process.env.NEXT_PUBLIC_USE_REAL_API === 'true';

// 备用模拟数据：当 API 挂了或额度用完时，保证网页不白屏
const mockNewsData = {
  status: 'ok',
  articles: [
    {
      source: { name: 'TechCrunch' },
      author: '张三',
      title: '人工智能技术最新突破：新型算法大幅提升效率',
      description: '研究人员开发出一种新的人工智能算法，可以在保持准确性的同时大幅提高处理速度。',
      url: 'https://example.com/news1',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
      publishedAt: new Date().toISOString(),
    },
    {
      source: { name: 'Reuters' },
      author: '李四',
      title: '全球气候峰会达成历史性协议：2030年碳排放减半',
      description: '参与全球气候峰会的各国代表终于达成共识，承诺到2030年将全球碳排放量减少50%。',
      url: 'https://example.com/news2',
      urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4ad22b23b5?w=500',
      publishedAt: new Date().toISOString(),
    }
  ]
};

// 获取头条新闻
export async function getNews(category = 'general', country = 'us', page = 1) {
  if (USE_REAL_API && API_KEY) {
    try {
      // 🌍 已经去掉了 &lang=en，这样就能原汁原味获取各个国家本土语言的新闻啦！
      const url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${country}&max=10&page=${page}&apikey=${API_KEY}`;
      
      const response = await fetch(url, { next: { revalidate: 3600 } });
      const data = await response.json();

      if (response.ok && data.articles) {
        // 翻译官：把 GNews 的 image 变成组件认识的 urlToImage
        const formattedArticles = data.articles.map((article: any, index: number) => ({
          ...article,
          urlToImage: article.image || 'https://via.placeholder.com/500x300?text=No+Image',
          source: article.source,
          id: `gnews-${index}-${Date.now()}`
        }));
        return { articles: formattedArticles };
      }
      throw new Error(data.errors?.[0] || 'GNews 请求失败');
    } catch (error) {
      console.error('真实请求出错了，切换回假数据:', error);
      return mockNewsData;
    }
  }
  return mockNewsData;
}

// 搜索新闻
export async function searchNews(query: string, page = 1) {
  if (USE_REAL_API && API_KEY) {
    try {
      // 🌍 同样去掉了 &lang=en
      const url = `https://gnews.io/api/v4/search?q=${query}&max=10&page=${page}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.articles) {
        const formattedArticles = data.articles.map((article: any, index: number) => ({
          ...article,
          urlToImage: article.image || 'https://via.placeholder.com/500x300?text=No+Image',
          source: article.source,
          id: `search-${index}-${Date.now()}`
        }));
        return { articles: formattedArticles };
      }
      return mockNewsData;
    } catch (error) {
      console.error('搜索请求出错:', error);
      return mockNewsData;
    }
  }
  return mockNewsData;
}
