var ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const extend = require('extend');

function toObject(paths) {
  var ret = {};

  paths.forEach(function(path) {
    // you can define entry names mapped to [name] here
    ret[path.split('/').slice(-1)[0]] = path;
  });

  return ret;
}

module.exports = {
  entry: extend(
    toObject(glob.sync("./js/entry/*.js")),
    {
      scss: ['./scss/index.scss']
    }
  ),

  output: {
    filename: 'public/dist/[name]'
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
