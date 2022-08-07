import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import DefineOptions from 'unplugin-vue-define-options/vite';

const baseUrl = {
  development: './',
  deta: './',
  release: './',
};

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: baseUrl[mode],
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      WindiCSS(),
      DefineOptions(),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase', // 设为支持横杠写法与驼峰写法
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        less: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 12345,
      open: false,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://192.168.8.1:12345/api/admin/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
