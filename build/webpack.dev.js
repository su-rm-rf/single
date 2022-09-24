const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = env => {
  const dev_config = {
    mode: 'development',
    devServer: {
      port: 6661,
      historyApiFallback: true,
      proxy: {
        '/server': {
          target: 'http://localhost:6851'
        }
      }
    }
  }

  return merge(common(env), dev_config)
}