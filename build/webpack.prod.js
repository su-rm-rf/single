const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = env => {
  const prod_config = {
    mode: 'production',
  }

  return merge(common(env), prod_config)
}