import { createApp } from 'vue'
import router from './router'

import './css/index.scss'
import RootApp from './App'

window.spagoto = url => {
  singleSpaNavigate(url)
}

createApp(RootApp, {spagoto})
.use(router)
.mount('#root')