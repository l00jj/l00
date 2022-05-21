// https://vitejs.dev/config/

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { splitVendorChunkPlugin, UserConfigExport } from 'vite'

const commonConfig: UserConfigExport = {
  server: {
    host: '0.0.0.0',//用于内网查看
  },

  base: '/',
  root: resolve(__dirname, './root'),

  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@stores': resolve(__dirname, './src/stores'),
    },
  },

  build: {
    manifest: false,
    outDir: resolve(__dirname, './dist'),
    rollupOptions: {

      input: {
        'index': resolve(__dirname, 'root/index.html'),
        'about': resolve(__dirname, 'root/about/index.html'),
        'effects': resolve(__dirname, 'root/effects/index.html'),
        'blobs': resolve(__dirname, 'root/blobs/index.html'),
        'secret': resolve(__dirname, 'root/secret/index.html'),
      },

      output: {//输出资源整合到对应文件夹
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [vue(), splitVendorChunkPlugin()]
}


export default defineConfig(({ command, mode }) => {

  //导出的是github的page页面用
  if (command === 'build' && mode === 'l00') {
    commonConfig.build.outDir = resolve(__dirname, '../docs')
    commonConfig.build.manifest = false
    commonConfig.base = '/l00/'
    commonConfig.build.emptyOutDir = true
  }

  //导出的用于本地预览
  if (command === 'build' && mode === 'l00_dist') {
    commonConfig.build.manifest = false
    commonConfig.base = '/l00/'
  }

  //导出的是github的page页面用
  if (command === 'build' && mode === 'UiExample') {
    commonConfig.build.outDir = resolve(__dirname, '../docs')
    commonConfig.build.manifest = false
    commonConfig.base = '/UiExample/'
    commonConfig.build.emptyOutDir = true
  }

  return commonConfig
})
