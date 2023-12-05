import { defineConfig } from 'vitepress';
import apidocConfig from '../apidocConfig.json';
export default defineConfig({
  title: '@zhdgps/vue3-use-cesium',
  base: '/',
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/README' },
      { text: '组件和接口', link: '/dist/README' }
    ],
    sidebar: {
      '/dist/': apidocConfig,
    }
  }
})
