## Demo03：支持Typescript
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
> yarn add typescript -D

然后在package.json 文件中新增脚本编译类型
执行 `yarn build:types` 发现 dist 文件下新增了 types 文件，这个就是当前组件的类型定义

我们将demo改成 ts 的用法，将demo/index.jsx -> demo/index.tsx，传入一个错误的props
![20210220120430.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120430.png)

将写法改为如下，ts类型报错消失
![20210220120540.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120540.png)
页面生效：
![20210220120606.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210220120606.png)