module.exports = {
  publicPath: './', // 公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: process.env.NODE_ENV !== 'production',
  //   filenameHashing: true,
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: 'localhost',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      '/test': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
