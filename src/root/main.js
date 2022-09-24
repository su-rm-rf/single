import { createApp } from 'vue'
import router from './router'

import './css/index.scss'
import RootApp from './App'

const goto = url => {
  singleSpaNavigate(url)
}

createApp(RootApp, {goto})
.use(router)
.mount('#root')