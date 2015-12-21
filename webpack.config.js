module.exports = {
  entry: './image_editor/static/js/app_dashboard.js',
  output: {
    path: 'image_editor/static/js/',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      //   {
      //   test: /app\/js\/.+.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // },
     {test: /\.js$/, loader: "jsx-loader?es6module" },
     
    ]
  }
};