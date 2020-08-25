// 生产环境构建输出文件的目录
const outputDir = 'dist'
// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
const assetsDir = 'static'
// 应用部署路径
const publicPath = '/' // / 表示服务器根路径
// 开发服务器端口号
const devServerPort = 7080

module.exports = {
  // 应用部署路径
  publicPath,
  // 开发服务器配置项
  devServer: {
    // 开发服务器的端口号
    port: devServerPort,
    // 代理请求地址，如果mock服务没有匹配到的请求，会被转发至该地址上
    proxy: 'http://10.0.10.116:8878',
  },
  // 支持vue使用实时template编译
  runtimeCompiler: true,
  // 是否在保存时进行eslint检查
  lintOnSave: false, // 因为目前lint问题较多，影响开发构建速度，这里默认关闭掉，需要改问题时，手动运行lint构建命令
  // 生产环境构建输出文件的目录
  outputDir,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir,
  transpileDependencies:['qs', 'querystring'],
  chainWebpack: config => {
    config.entry('polyfill').add('@babel/polyfill')
  },
  // 插件配置
  pluginOptions: {
    // 其他构建服务
    service: {
      // 是否开启mock服务
      mock: false,
      // 拷贝服务
      copy: {
        // 拷贝图片（存在通过js设置图片资源路径的问题，比如图表的image://static/img/xxx.png）
        'src/assets/img': `${outputDir}/${assetsDir}/img`,
        'static/': `${outputDir}/${assetsDir}`,
      },
      // html模板文件服务
      html: {
        '.*': {
          // 设置应用图标路径
          favicon: 'src/assets/img/favicon.ico',
        },
      },
      // 自动打压缩包
      compress: {
        name: 'zip/IasWeb.zip',
      },
    },
  },
}
