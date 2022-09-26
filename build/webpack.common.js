const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
  return {
    entry: './src/root/root-config.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env', {
                        browsers: [
                          'defaults',
                          'not ie < 9',
                          'last 7 versions',
                          '> 1%',
                          'iOS >= 8',
                          'last 3 iOS versions',
                          'android >= 5.0'
                        ]
                      }
                    ]
                  ]
                }
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.vue', '.jsx', '.js', '.json']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'single-flight'
      })
    ],
  }
}