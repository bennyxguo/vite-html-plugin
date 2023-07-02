import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html-transformer';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: '/src/main.ts',
          filename: '../layout/index.html',
          template: 'templates/index.html',
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag1'
                }
              }
            ]
          }
        },
        {
          entry: '/src/other-main.ts',
          filename: '../layout/other.html',
          template: 'templates/other.html',
          injectOptions: {
            data: {
              title: 'other page',
              injectScript: `<script src="./inject.js"></script>`
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag2'
                }
              }
            ]
          }
        }
      ]
    })
  ]
});
