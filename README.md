# 脚手架创建
1.新创建文件如wen-cli,并在该文件下输入命令:
# npm init -y
注解：此命令用于生成packge.json文件。

# webpack包管理引入（安装）命令: npm i webpack webpack-cli -D
2.引入基于webpack创建脚手架所需的webpack包管理工具。
注解：
- 前面的“webpack"指得是安装，后后面的"webpack-cli"指的是安装了webpack-cli后，就可以把webpack这个词当作命令来用了;
- (-D(--save-dev)：表示项目开发期间的依赖，也就是：线上代码中用不到这些包了;
- -S(--save)：表示线上需要用到的依赖包);

# 入口文件创建
3.通常入口文件取名为main.js;

# 打包命令创建
```json
"scripts" : {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
};
```
4."build"后面仅填写webpack，因为这种写法webpack会去找webpack.config.js配置文件。

# webpack.config.js文件创建
5.创建webpack.config.js文件为"build": "webpack"命令添加执行动作。
```javascript
// 引入此模块这配置输入输出地址
const path = require("path");
// 引入html-webpack-plugin用于生成html模板
// 下载插件命令：npm  i  html-webpack-plugin
const htmlWebpackPlugin = require("html-webpack-plugin");

// 路径需绝对路径
module.exports = {
  // 入口文件
  entry: path.join(__dirname, "./src/main.js"),
  // 出口
  output: {
    // 出口目录
    path: path.join(__dirname, "./dist"),
    // 出口文件
    filename: "app.js",
  },
  // 配置插件
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    })
  ],
  // 开发模式下配置本地服务器
  devServer: {
    open: false, // 默认打开浏览器
    hot: true, // 热更新
    port: 8080,
  },
  // 环境模式
  mode: "development",
}
```

# 创建开发模式命令
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "cross-env NODE_ENV=production webpack",
  "dev": "cross-env NODE_ENV=development webpack-dev-server"
},
```
"dev": "webpack-dev-server"此命令用产生一个本地服务，便于开发调试；
- 此命令依赖于webpack-dev-server插件
- cross-env用于设置环境变量切换生产和线上

# 安装命令：npm i webpack-dev-server -D
在webpack.config.js详细配置为
```javascript
module.exports = {
  devServer: {
    open: true,// 是否自动打开浏览器
    hot: true,// 是否热更新
    port: 8080,// 默认端口号
  },
};
```

# 处理css文件
- 处理css文件需要引入style-loader和css-loader;
- 处理less文件需要引入less和less-loader;

## 安装css文件处理命令：npm  i  -D  style-loader  css-loader

## 安装less文件处理命令：npm  i  less-loader  less  -D
生效配置方式：
```javascript
module.exports = {
  // 配置loader加载器
  module: {
    rules: [
      // 使用正则找到该插件,且use里面的顺序一定如此，但实际代码执行是从后面开始的;
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }
    ]
  }
}
```

# 处理file文件和图片及特殊字体
- 处理file文件需要引入file-loader;在加载图片时，会对文件进行重命名，即加载路径会被加密修改掉；
- 处理图片文件需要引入url-loader;默认会将图片转化为base64编码格式，是转化的图片本身；目的：提高性能；

## 安装命令：npm  i  url-loader  file-loader  -D
生效配置：
```javascript
module.exports = {
  module: {
    rules: [
      // 处理图片（这里声名的时候只需要声名一个url-loader 就可以了，因为它里面已经包含的file-loader 里面的方法了。所以不用声名；但是会依赖file-loader ,所以依然需要安装）
      { 
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 小于1000转为base64；大于1000不会转为base64，而是内部调用file-loader加载图片，并用md5方式加密图片路径;
            limit: 1000 
          }
        } 
      },
      // 特殊字体处理如阿里矢量图标等
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ["url-loader"] },
    ]
  }
}
```
注释： 这里声名的时候只需要声名一个url-loader 就可以了，因为它里面已经包含的file-loader 里面的方法了。所以不用声名；但是会依赖file-loader ,所以依然需要安装。

# 处理ES6的新增语法
- 主要是兼容浏览器的，并不是所有的浏览器都兼容ES6语法。
- 采用的插件为Babel

# 安装插件命令：npm  i  -D  babel-preset-stage-2
# 安装插件命令：npm  i @babel/core @babel/preset-env @babel/preset-react babel-loader -D 注意版本一定要兼容可采用packge.json文件版本
- babel-preset-env：表示能够解析es2015, es2016, es2017, es2018等这些标准的语法;
- babel-preset-stage-2：解析非标准语法，即用来解析已经被使用到的，但是还没有被采纳为标准的语法;

生效配置

## 还需要在根目录下创建.babelrc配置文件
```javascript
module.exports = {
  module: {
    rules: [
      // 处理ES6语法
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
    ]
  }
}
```

## 创建.babelrc文件配置解析ES语法

## 生成基础文件夹

- assets 静态图片文件夹
- public 公共文件
- src 下创建节点main.js挂载DOM如下代码,并引入react渲染套餐依赖

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

# 创建.gitignore代码提价忽略文件

# 创建tsconfig.json文件






