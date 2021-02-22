### KIKKO-UI-DEMOS
手把手教你搭建一个 React 组件库

## Demo01：使用 parcel，把组件跑起来 [source](https://github.com/coderzzp/kikko-ui-demos/tree/main/demo01)
项目初始化
> npm init  

创建源代码文件
> mkdir src

创建 index.jsx 我们的 ui 组件
```javascript
// src/index.jsx
import React from 'react'
import './index.less'

const Button = ()=>{
    return <div className="kikko-button">im a button</div>
}
export default Button

```
创建组件样式
```less
.kikko-button{
    color: green;
}
```
此时我们的组件已经写好了，引入 parcel 将我们的组件应用起来，关于 [parcel](https://parceljs.org/)
> yarn add parcel -D

在 package.json 中将 parcel 作成 npm 脚本
```json
 "demo": "parcel ./demo/index.html --out-dir ./parcel_dist"
```
使用 parcel
> yarn demo

![20210219161840.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210219161840.png)

打开 http://localhost:1234 ，页面中出现我们的button 组件
![20210219161957.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210219161957.png)

我们已经可以看到我们组件的使用效果了，下一章我们将讲述将组件打包并发布到npm 上

---------------
## Demo02：使用 rollup 打包组件[source](https://github.com/coderzzp/kikko-ui-demos/tree/main/demo02)
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

### Reference
[@babel/plugin-transform-runtime 是什么？](https://zhuanlan.zhihu.com/p/147083132)

--------------

## Demo03：支持Typescript[source](https://github.com/coderzzp/kikko-ui-demos/tree/main/demo03)
首先我们先把组件代码改成 tsx 的格式
```js
// src/index.tsx
import React from 'react'
import './index.less'

interface ButtonProps {
    buttonWord:string
}

const Button = ({buttonWord='defaultWord'}:ButtonProps)=>{
    return <div className="kikko-button">{buttonWord}</div>
}
export default Button
```
执行 `yarn demo`，发现报错了，因为parcel 需要配置ts config，于是新增 `tsconfig.json `
再执行`yarn demo`，demo 执行成功
![20210220113828.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220113828.png)

打包配置也需要增加 @babel/preset-typescript
> yarn add @babel/preset-typescript -D
```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env' // 编译 ES 代码
    ],
    '@babel/preset-typescript', // 编译 ts 代码
    '@babel/preset-react', // 编译 jsx 代码
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",  // 使用
      {
        "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ]
};

```
执行 `yarn build` ，打包成功，但是我们现在打出来的文件是没有types 类型定义的，我们现在来做这件事，使用类型编译需要用到 typescript 包
> yarn add typescript @types/react -D


定义组件包的 types 文件
```json
  // package.json
  "types":"dist/types/index.d.ts",
```

然后在package.json 文件中新增脚本编译类型
执行 `yarn build:types` 发现 dist 文件下新增了 types 文件，这个就是当前组件的类型定义

我们将demo改成 ts 的用法，将demo/index.jsx -> demo/index.tsx，传入一个错误的props
![20210220120430.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120430.png)

将写法改为如下，ts类型报错消失
![20210220120540.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120540.png)
页面生效：
![20210220120606.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120606.png)

---------------
## Demo04：发布到 npm [source](https://github.com/coderzzp/kikko-ui-demos/tree/main/demo04)
ok，组件代码写好了之后我们需要发到npm 让大家使用，我们先在package.json中给组件包起一个名字，本项目使用了kikko-ui这个名称
> npm adduser 

我们将package.json 的脚本改动一下
```
"build:types": "tsc --emitDeclarationOnly",
"build:js": "rollup -c",
"build": "rm -rf dist && yarn build:types && yarn build:js",
"prepublishOnly": "yarn build" // 发布前自动编译打包
```
> npm publish

prepublishOnly这个hook会帮我们自动做打包以及编译类型处理
![20210222115526.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210222115526.png)
上图表示发布成功，我们可以使用 create-react-app测试一下我们的组件库
> npx create-react-app kikko-test --template typescript 
kikko-test
> cd kikko-test && yarn start

引入组件并使用
```js
import Button from 'kikko-ui';
import'kikko-ui/dist/style.css';
```
![20210222122933.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210222122933.png)

🚀🚀🚀 大功告成


