const path = require('path');

let entry = './src/index.js';
let output = {
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist/',
};

if (process.env.NODE_ENV === 'dev') {
  entry = './example/index.js';
  output = {
    path: path.join(__dirname, 'example'),
    publicPath: '/example/',
  };
}

module.exports = {
  entry,
  output: Object.assign(output, {
    filename: 'bundle.js',
    library: 'react-sequence',
    libraryTarget: 'umd', // universal module definition
  }),
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        query: {
          presets: ["es2015", "stage-0", "react"],
        },
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
};
