const path = require("path");
// 引入html-webpack-plugin用于生成html模板
// 下载插件命令：npm  i  html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 添加打包进度条
// 下载插件命令：yarn add webpackbar
const WebpackBar = require('webpackbar');
// 自定义优化打包配置
// 下载插件命令：yarn add terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin');
// 判断是否为线上环境
const isPro = process.env.NODE_ENV === "production";
// api获取地址
const targetPath = {
  target: 'http://183.234.119.194:28444', // 线上
};

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
  // 打包优化配置项webpack自带优化
  optimization: {
    minimizer: [
      new TerserPlugin({
        // sourceMap:false,
        terserOptions: {
          compress: {
            drop_console: isPro // 线上环境清除console.log()
          }
        }
      })
    ]
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      // 使用html模板
      template: path.join(__dirname, "./src/index.html"),
    }),
    new WebpackBar()
  ],
  // 配置loader加载器
  module: {
    rules: [
      // 使用正则找到该插件,且use里面的顺序一定如此，但实际代码执行是从后面开始的;
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // 处理less
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
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
      // 处理ES6语法
      { test: /\.js|tsx|ts$/, use: "babel-loader" },
      // 处理TS语法
      { test: /\.(ts|tsx)$/, use: ["ts-loader"] }
    ]
  },
  // 开发模式下配置本地服务器
  devServer: {
    open: false, // 默认打开浏览器
    hot: true, // 热更新
    port: 8080,
    // 配置跨域
    proxy: {
      "/api": {
        target: `${targetPath.target}`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // 环境模式
  mode: "development",
}