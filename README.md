# vite-plugin-html-transformer

**English** | [中文](./README.zh_CN.md)

## Disclaimer

This package is base on the [vbenjs/vite-plugin-html](https://github.com/vbenjs/vite-plugin-html). Since the author of that package is no longer supporting and updating the package. A lot of bugs and issue had being left unresolved. I really needed a couple of the features and fixes to use this plugin in my projects. So I had decided to maintain a new one for myself and for anyone that are looking for a updated version of it.

A few issues are fixed in this version:

- [Not working when using other directory for html's](https://github.com/vbenjs/vite-plugin-html/issues/118)
- [Upgraded to use Vite 4+](https://github.com/vbenjs/vite-plugin-html/issues/107)
- [Unable generate files depends on filename and template](https://github.com/vbenjs/vite-plugin-html/issues/105)

## Features

- HTML compression capability
- EJS template capability
- Multi-page application support
- Support custom `entry`
- Support custom `template`
- Support custom `filename` for both single and multi-page application

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-html-transformer -D
```

或

```bash
npm i vite-plugin-html-transformer -D
```

## Usage

- Add EJS tags to `index.html`, e.g.

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <%- injectScript %>
</head>
```

- Configure in `vite.config.ts`, this method can introduce the required functions as needed

```ts
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import { createHtmlPlugin } from 'vite-plugin-html-transformer';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default /src/main.ts
       */
      entry: '/src/main.ts',

      /**
       * Output filename of your template, can include file dir for custom output locations e.g "../layout/index.html"
       * By default the output of your template will be in the `outDir` set by ViteConfigs
       * @default index.html
       */
      filename: 'index.html'

      /**
       * If you want to store the template `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'public/index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag'
            }
          }
        ]
      }
    })
  ]
});
```

Multi-page application configuration

```ts
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html-transformer';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: '/src/main.ts',
          filename: 'index.html',
          template: 'public/index.html',
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
          filename: 'other.html',
          template: 'public/other.html',
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
```

## Parameter Description

`createHtmlPlugin(options: UserOptions)`

### UserOptions

| Parameter | Types                    | Default       | Description                   |
| --------- | ------------------------ | ------------- | ----------------------------- |
| entry     | `string`                 | `src/main.ts` | entry file path               |
| template  | `string`                 | `index.html`  | relative path to the template |
| inject    | `InjectOptions`          | -             | Data injected into HTML       |
| minify    | `boolean｜MinifyOptions` | -             | whether to compress html      |
| pages     | `PageOption`             | -             | Multi-page configuration      |

### InjectOptions

| Parameter  | Types                 | Default | Description                                                               |
| ---------- | --------------------- | ------- | ------------------------------------------------------------------------- |
| data       | `Record<string, any>` | -       | injected data                                                             |
| ejsOptions | `EJSOptions`          | -       | ejs configuration Options[EJSOptions](https://github.com/mde/ejs#options) |
| tags       | `HtmlTagDescriptor`   | -       | List of tags to inject                                                    |

`data` can be accessed in `html` using the `ejs` template syntax

#### Env inject

By default, the contents of the `.env` file will be injected into index.html, similar to vite's `loadEnv` function

### PageOption

| Parameter     | Types           | Default       | Description                   |
| ------------- | --------------- | ------------- | ----------------------------- |
| filename      | `string`        | -             | html file name                |
| template      | `string`        | `index.html`  | relative path to the template |
| entry         | `string`        | `src/main.ts` | entry file path               |
| injectOptions | `InjectOptions` | -             | Data injected into HTML       |

### MinifyOptions

Default compression configuration

```ts
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
```

### Run the playground

```bash
pnpm install

# spa
cd ./packages/playground/basic

pnpm run dev

# map
cd ./packages/playground/mpa

pnpm run dev

```

## License

MIT

[npm-img]: https://img.shields.io/npm/v/vite-plugin-html-transformer.svg
[npm-url]: https://npmjs.com/package/vite-plugin-html-transformer
[node-img]: https://img.shields.io/node/v/vite-plugin-html-transformer.svg
[node-url]: https://nodejs.org/en/about/releases/
