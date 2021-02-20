## Demo02：使用 rollup 打包组件
安装rollup
> yarn add rollup -D

根据rollup的打包规则，创建 rollup.config.js 文件
```js
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pkg from './package.json';

export default {
  // 入口文件
  input: 'src/index.jsx',
  // 读取 package.json 的 module 字段，将包打成 esm 格式
  output: [
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    // postcss处理less文件，并用 autoprefixer 处理兼容,cssnano 压缩
    postcss({
      plugins: [autoprefixer,cssnano],
      extensions: ['.less', '.css'],
      use: ['less'],
      extract: 'style.css', // 输出路径
    }),
    // 告知 rollup 使用 babel 编译代码
    babel({
      // 使用 babel transform runtime 编译代码
      babelHelpers: 'runtime',
      extensions: ['.js', '.ts', '.jsx','tsx'],
    }),
  ],
};

```
rollup使用babel，那么显而易见需要 babel 配置
``` js

module.exports = {
  presets: [
    [
      '@babel/preset-env' // 编译 ES 代码
    ],
    '@babel/preset-react', // 编译 jsx 代码
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",  
      {
        "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ]
};

```
package.json 中新增 module 字段
```
"module": "dist/index.esm.js",
```
以及新的打包脚本
```
"build": "rm -rf dist && rollup -c"
```
执行打包脚本
> yarn build

我们发现文件夹下多了dist目录，表示打包成功
![20210220105022.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220105022.png)

