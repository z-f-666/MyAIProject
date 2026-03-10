// 优先获取环境变量，如果没有获取到，就使用备用的 API KEY 进行双保险
const API_KEY = process.env.NEWS_API_KEY || '1bccc6d4fd0e4e36ad42ff1e6d238799';
const USE_REAL_API = process.env.NEXT_PUBLIC_USE_REAL_API === 'true';

// 模拟新闻数据，用于演示（当真实数据请求失败、未开启真实 API 或数据为空时使用）
const mockNewsData = {
  status: 'ok',
  totalResults: 10,
  articles: [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: '张三',
      title: '人工智能技术最新突破：新型算法大幅提升效率',
      description: '研究人员开发出一种新的人工智能算法，可以在保持准确性的同时大幅提高处理速度，这一突破有望在医疗、金融等领域产生重大影响。',
      url: 'https://example.com/news1',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
      publishedAt: new Date().toISOString(),
      content: '人工智能领域再次迎来重大突破。研究团队今日宣布，他们成功开发出一种新型深度学习算法，能够在保持高精度的同时将计算效率提升40%...'
    },
    {
      source: { id: 'reuters', name: 'Reuters' },
      author: '李四',
      title: '全球气候峰会达成历史性协议：2030年碳排放减半',
      description: '在为期两周的激烈谈判后，参与全球气候峰会的各国代表终于达成共识，承诺到2030年将全球碳排放量减少50%。',
      url: 'https://example.com/news2',
      urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4ad22b23b5?w=500',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      content: '全球气候峰会今日落下帷幕，与会各国代表经过两周的紧张谈判，最终达成了一项历史性协议...'
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: '王五',
      title: '新型电动汽车电池技术：充电5分钟行驶800公里',
      description: '一家初创公司宣布研发出革命性的电动汽车电池技术，只需5分钟充电即可支持800公里续航，有望彻底解决电动汽车的里程焦虑问题。',
      url: 'https://example.com/news3',
      urlToImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      content: '电动汽车行业迎来重大突破。一家名为PowerCell的初创公司今日宣布，他们成功研发出一种新型电池技术...'
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: '赵六',
      title: '量子计算机实现重大突破：解决传统计算机无法处理的问题',
      description: '科学家们利用新型量子计算机成功解决了一个传统计算机需要数千年才能完成的复杂问题，标志着量子计算技术进入实用阶段。',
      url: 'https://example.com/news4',
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      content: '量子计算领域迎来里程碑式的突破。研究团队今日宣布，他们利用最新研发的量子计算机成功解决了一个复杂的数学问题...'
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: '孙七',
      title: '太空旅游新纪元：商业太空站正式开放预订',
      description: '全球首个商业太空站今日宣布正式开放预订，普通民众将有机会体验太空生活，虽然价格不菲，但已收到数百份预订申请。',
      url: 'https://example.com/news5',
      urlToImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500',
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      content: '太空旅游正式进入商业化时代。全球首个商业太空站"星辰号"今日宣布，开始接受普通民众的太空旅行预订...'
    }
  ]
};

// 获取新闻列表 (加强版双重请求机制)
export async function getNews(category = 'general', country = 'us', page = 1) {
  if (USE_REAL_API && API_KEY) {
    try {
      // 第一计：正常去请求该国家的头版头条
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      
      if (!response.ok) throw new Error('头条请求失败');
      let data = await response.json();
      console.log(`👉 尝试获取 ${country} 头条，收到:`, data.totalResults || 0, '条'); 
      
      // 第二计：如果头条是空的（被接口限制了），立刻启动全网搜索作为第一层兜底！
      if (!data.articles || data.articles.length === 0) {
        console.log(`⚠️ ${country} 头条没数据，立刻去全网强搜该国家新闻！`);
        
        // 把国家代码翻译成搜索关键词
        const countryNames: Record<string, string> = {
          us: 'United States', gb: 'UK', jp: 'Japan', fr: 'France', ru: 'Russia'
        };
        const searchTerm = countryNames[country] || 'World';

        // 强制去 everything 接口搜索这个国家，并且按最新时间排序 (sortBy=publishedAt)
        const fallbackResponse = await fetch(
          `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&page=${page}&apiKey=${API_KEY}`,
          { next: { revalidate: 3600 } }
        );
        
        const fallbackData = await fallbackResponse.json();
        
        // 如果搜到了，就把搜索结果当成头条展示出去
        if (fallbackData.articles && fallbackData.articles.length > 0) {
          console.log(`🎉 强搜成功！搜到了 ${fallbackData.totalResults} 条关于 ${searchTerm} 的新闻`);
          data = fallbackData;
        }
      }
      
      // 第三计：如果连强搜都搜不到（或者网络彻底断了），才使用本地的假数据保护页面
      if (!data.articles || data.articles.length === 0) {
        console.log('⚠️ 连全网搜索都没数据，只能切回模拟数据啦！');
        return mockNewsData;
      }
      
      return data;
    } catch (error) {
      console.error('真实请求出错了，自动切换回假数据:', error);
    }
  }

  return new Promise(resolve => {
    setTimeout(() => { resolve(mockNewsData) }, 1000);
  });
}

// 搜索新闻
export async function searchNews(query: string, page = 1) {
  if (USE_REAL_API && API_KEY) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      
      if (!response.ok) {
        throw new Error('搜索真实新闻失败啦');
      }
      
      return await response.json();
    } catch (error) {
      console.error('搜索真实新闻出错了:', error);
    }
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockNewsData)
    }, 1000);
  });
}