const withSerwist = require('@serwist/next').default({
  // 告诉引擎我们的“魔法书”放在哪里
  swSrc: 'app/sw.ts',
  // 告诉引擎施法后生成的文件放哪里（供浏览器读取）
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 这里保留了你原本的图片域名配置，一点都没丢哦！
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

// 用 PWA 的魔法外壳包裹你的配置并导出
module.exports = withSerwist(nextConfig);
