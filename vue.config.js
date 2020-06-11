const VueRouteWebpackPlugin = require("@xiyun/vue-route-webpack-plugin");

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  productionSourceMap: false,
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
        css: {}, // 这里的选项会传递给 css-loader
        postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  pwa:{}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  devServer:{
    host: 'localhost',
    port: 8080,
    https: true,
    proxy:{  // 代理
      '/api': {
        target: "http://app.rmsdmedia.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
  },
  configureWebpack: {
    plugins: [
      new VueRouteWebpackPlugin({
        // 配置 import 路径前缀，默认是："../"，因为路由文件会默认放在 src/router/ 目录下
        prefix: "../",
        // 插件扫描的项目目录，默认会扫描 "src/views" 目录
        directory: "src/views",
        // 生成的路由文件存放地址，默认存放到 "src/router/children.js"
        routeFilePath: "src/router/children.js",
        // 生成的文件中的 import 路径是否使用双引号规范，默认使用
        // 注意：生成的路由文件中的 path 的引号是原封不动使用用户的
        doubleQoute: true,
      })
    ],
  }
};