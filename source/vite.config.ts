// https://vitejs.dev/config/

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { splitVendorChunkPlugin, UserConfigExport } from 'vite'

const commonConfig: UserConfigExport = {
  server: {
    host: '0.0.0.0',//用于内网查看
  },

  preview: {
    port: 8080
  },

  root: resolve(__dirname, './root'),
  base: '/',
  publicDir: resolve(__dirname, './public'),

  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
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
        'metaverse': resolve(__dirname, 'root/metaverse/index.html'),
        'magics': resolve(__dirname, 'root/magics/index.html'),
        //
        'test': resolve(__dirname, 'root/test/index.html'),
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

  return commonConfig
})
