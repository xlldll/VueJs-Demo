/**
 * Created by LinChuQiang.
 */

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'dev') {
  console.log(`Running the pretest task!`)
}

if (TARGET === 'build') {
  console.log(`OptimizeCssAssetsPlugin正在压缩分离的CSS文件！`)
  //4.4 压缩分离的css
  // https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
  // Compress extracted CSS. We are using this plugin so that possible duplicated CSS from different components can be deduped.
  var compressCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp    : /\.css$/g,
    //css处理器：https://github.com/ben-eb/cssnano
    cssProcessor       : require('cssnano'),
    cssProcessorOptions: {
      sourcemap      : true,
      safe           : true,
      //http://cssnano.co/optimisations/
      discardComments: {removeAll: true}
    },
    canPrint           : true
  })
  module.exports = compressCss
}

if (TARGET === 'test') {
  console.log(`Running the test task!`)
}