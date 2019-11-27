const path = require('path');
const {Externals} = require('share-loader');
const LastCallWebpackPlugin = require('last-call-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[chunkhash:20].js',
    path: path.resolve('./dist'),
    chunkFilename: '[name].js',
    library: 'login-lib',
    libraryTarget: 'umd'
  },
  externals: [
    Externals({
      namespace: 'wrd-web-app',
      modules: [/@angular/,/@clr\/ui/,/@clr\/angular/,/rxjs/,/@wrd-web\/shared/],
      exclude: [/router.ngfactory/,/clr-angular.ngfactory/]
    })
  ],
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new LastCallWebpackPlugin({
      assetProcessors: [
        {
          regExp: /main.[a-f0-9]{20}.js$/,
          phase: 'compilation.optimize-chunk-assets',
          processor: (assetName, asset) => {

            return Promise.resolve(asset.source().replace('var AppModuleNgFactory', `window.statistics = {};\nvar AppModuleNgFactory = window.statistics.AppModule`))
          }
        }
      ],
      canPrint: true
    })
]
};
