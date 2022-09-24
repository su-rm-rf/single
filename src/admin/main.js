import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'

import router from './router'
import App from './App'

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    el: '#app',
    render: props => h(App, { props }),
  },
  handleInstance: app => {
    app.use(router)
  }
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount