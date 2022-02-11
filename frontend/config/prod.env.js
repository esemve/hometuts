'use strict'

module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_BACKEND_HOST: `"${process.env.BACKEND_HOST}"`,
  VUE_APP_BACKEND_PORT: `"${process.env.BACKEND_PORT}"`,
  VUE_APP_BACKEND_SCHEME: `"${process.env.BACKEND_SCHEME}"`,
}
