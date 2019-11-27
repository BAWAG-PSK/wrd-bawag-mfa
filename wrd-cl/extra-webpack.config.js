module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        use:
          [{
            loader: 'share-loader',
            options: {
                modules: [/@angular/,/@clr\/angular/,/@clr\/ui/,/rxjs/,/@ngxs\/store/,/@ngxs-labs\/emitter/,/@wrd-web\/shared/],
                exclude: [/@angular-devkit/],
                namespace: 'wrd-web-app'
            }
          }]
      }]
  }
};
