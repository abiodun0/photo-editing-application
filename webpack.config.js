module.exports = {
  entry: './image_editor/static/js/app_dashboard.js',
  output: {
    path: 'image_editor/static/js/',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
    {
            test: /\.jsx?$/,
            loader: 'babel',
            query:
            {
                presets:['es2015', 'react']
            }

      }
     
    ]
  }
};