## Demo01：使用 parcel，把组件跑起来
项目初始化
> npm init  

创建源代码文件
> mkdir src

创建 ui 组件
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
