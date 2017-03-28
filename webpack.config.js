var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!sass', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ]
      }
    ],
  },
  postcss: () => {
    return [
      /* eslint-disable global-require */
      require('postcss-cssnext'),
      /* eslint-enable global-require */
    ];
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
