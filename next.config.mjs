import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 主人原来的图片域名配置，完美保留下来啦！✨
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

export default withSerwist(nextConfig);
