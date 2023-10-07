import { defineConfig } from 'vitepress';
import apidocConfig from '../apidocConfig.json';
export default defineConfig({
  title: 'vue3-use-cesium',
  base: '/',
  themeConfig: {
    nav: [
      { text: '使用指南', link: '/guide/README' },
      { text: '工具方法', link: '/dist/README' }
    ],
    sidebar: {
      '/dist/': apidocConfig,
    }
  }
})
