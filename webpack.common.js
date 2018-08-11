const WebpackShellPlugin = require('webpack-shell-plugin');

const entryPath = ['babel-polyfill', './src/content/index.js'];

const config = {
  entry: {
    'dist/build/content' : entryPath
  },
  output: {
    filename: '[name].js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: [
        'mkdir -p dist/build/src/background',
        'mkdir -p dist/build/icons',
        'npm run make:manifest',
        'cp -r icons dist/build',
        'cp -r src/background/background.html dist/build',
        'cp -r src/background/background.js dist/build'
      ]
    })
  ]
};

module.exports = config;
