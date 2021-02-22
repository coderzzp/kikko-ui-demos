## Demo04：发布到 npm 
ok，组件代码写好了之后我们需要发到npm 让大家使用，我们先在package.json中给组件包起一个名字，本项目使用了kikko-ui这个名称
> npm adduser 

我们将package.json 的脚本改动一下
``` json
// package.json
"build:types": "tsc --emitDeclarationOnly",
"build:js": "rollup -c",
"build": "rm -rf dist && yarn build:types && yarn build:js",
"prepublishOnly": "yarn build" // 发布前自动编译打包
```
> npm publish

prepublishOnly这个hook会帮我们自动做打包以及编译类型处理
![20210222115526.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210222115526.png)
上图表示发布成功，我们可以使用 create-react-app测试一下我们的组件库，[demo](https://github.com/coderzzp/kikko-test)
> npx create-react-app kikko-test --template typescript 
kikko-test
> cd kikko-test && yarn start

引入组件并使用
```js
import Button from 'kikko-ui';
import'kikko-ui/dist/style.css';
```
![20210222122933.png](https://raw.githubusercontent.com/coderzzp/cloud-image/main/vs-picgo20210222122933.png)



