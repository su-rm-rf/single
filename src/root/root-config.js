import { registerApplication, start } from 'single-spa'

import './main'

registerApplication(
  'flight',
  () => import('../flight/main.js'),
  (location) => location.pathname.startsWith('/flight'),
  { some: '2C' }
)

registerApplication({
  name: 'admin',
  app: () => import('../admin/main.js'),
  activeWhen: '/admin',
  customProps: {
    some: '2B' 
  }
})

registerApplication(
  'manage',
  () => import('../manage/main.js'),
  (location) => location.pathname.startsWith('/manage'),
  { some: 'manage' }
)

start()