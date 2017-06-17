var ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');

module.exports = {
  entry: ['./js/index.js', './scss/index.scss'],
  output: {
    filename: 'public/dist/bundle.js'
  },
  module: {

    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        })
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract([
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                      includePaths: ['node_modules'] 
                    }
                }
                ]),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'public/dist/[name].bundle.css',
      allChunks: true,
    }),
  ],
};
